import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { requestByAll, requestRecipeDetail } from '../../services/API';
import CardButtonShareAndFav from '../CardButtonShareAndFav';
import IngredientsList from '../IngredientsList';
import './foodsRecipes.css';

function FoodsRecipes() {
  const { location: { pathname } } = useHistory();
  const { recipeDetail,
    setRecipeDetail,
    setRecommended } = useContext(RecipesContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [youtubeEmbed, setYoutubeEmbed] = useState('');
  const detailsRecipeArray = Object.values(recipeDetail);

  async function requestDetails() {
    const id = pathname.split('/');
    const details = await requestRecipeDetail('meal', id[2]);
    const recommend = await requestByAll('cocktail');
    setRecipeDetail(details);
    // Requisito 36
    setRecommended(recommend);
  }

  useEffect(() => {
    requestDetails();
  }, []);

  function setList() {
    const finalString = detailsRecipeArray[0][0].strYoutube
      .replace('watch?v=', 'embed/');
    setYoutubeEmbed(finalString);
    // Requisito 35
    setIngredientsList(Object.keys(recipeDetail.meals[0]).reduce((acc, element) => {
      if (element.includes('strIngredient')
      && recipeDetail.meals[0][element] !== null
      && recipeDetail.meals[0][element] !== '') {
        const ingredient = recipeDetail.meals[0][element];
        acc = [...acc, ingredient];
        return acc;
      }
      return acc;
    }, []));

    setMeasureList(Object.keys(recipeDetail.meals[0]).reduce((acc, element) => {
      if (element.includes('strMeasure')
      && recipeDetail.meals[0][element] !== null
      && recipeDetail.meals[0][element] !== '') {
        const ingredient = recipeDetail.meals[0][element];
        acc = [...acc, ingredient];
        return acc;
      }
      return acc;
    }, []));
  }

  useEffect(() => {
    if (detailsRecipeArray.length !== 0) {
      setList();
    }
  }, [recipeDetail]);

  function recipeInProgress() {
    const storageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageObj !== null) {
      const storageKeys = Object.keys(storageObj.meals).find((element) => {
        if (element === recipeDetail.meals[0].idMeal) {
          return element;
        }
        return null;
      });
      return storageKeys !== undefined ? 'Continue Recipe' : 'Start Recipe';
    }
    return 'Start Recipe';
  }

  return (
    <div className="container">
      {
        detailsRecipeArray.length === 1
        && (
          <>
            <img
              src={ detailsRecipeArray[0][0].strMealThumb }
              alt={ detailsRecipeArray[0][0].strMeal }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strMeal}</h2>
            <CardButtonShareAndFav />
            <h5 data-testid="recipe-category">{detailsRecipeArray[0][0].strCategory}</h5>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredientsList.map((element, index) => (<IngredientsList
                  element={ element }
                  index={ index }
                  measureList={ measureList }
                  key={ index }
                />))
              }
            </ul>
            <p data-testid="instructions">{detailsRecipeArray[0][0].strInstructions}</p>
            <iframe
              width="300"
              height="220"
              src={ youtubeEmbed }
              title={ detailsRecipeArray[0][0].strMeal }
              data-testid="video"
            />
            {/* Card de drinks recomendadas */}
            <p data-testid="0-recomendation-card" />
            <Link to={ `${pathname}/in-progress` }>
              <button
                className="start-recipe"
                type="button"
                data-testid="start-recipe-btn"
              >
                {
                  recipeInProgress()
                }
                {/* Start Recipe */}
              </button>
            </Link>
          </>
        )
      }
    </div>
  );
}

export default FoodsRecipes;
