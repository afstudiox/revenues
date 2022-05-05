import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import { requestByAll, requestRecipeDetail } from '../../services/API';
import IngredientsList from '../IngredientsList';
import './drinksRecipes.css';

function DrinksRecipes() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const { location: { pathname } } = useHistory();
  const { recipeDetail,
    setRecipeDetail,
    setRecommended } = useContext(RecipesContext);
  const detailsRecipeArray = Object.values(recipeDetail);

  async function requestDetails() {
    const id = pathname.split('/');
    const details = await requestRecipeDetail('cocktail', id[2]);
    const recommend = await requestByAll('cocktail');
    setRecipeDetail(details);
    // Requisito 36
    setRecommended(recommend);
  }

  useEffect(() => {
    requestDetails();
  }, []);

  useEffect(() => {
    if (detailsRecipeArray.length !== 0) {
      // Requisito 35
      setIngredientsList(Object.keys(recipeDetail.drinks[0]).reduce((acc, element) => {
        if (element.includes('strIngredient')
        && recipeDetail.drinks[0][element] !== null
        && recipeDetail.drinks[0][element] !== '') {
          const ingredient = recipeDetail.drinks[0][element];
          acc = [...acc, ingredient];
          return acc;
        }
        return acc;
      }, []));

      setMeasureList(Object.keys(recipeDetail.drinks[0]).reduce((acc, element) => {
        if (element.includes('strMeasure')
        && recipeDetail.drinks[0][element] !== null
        && recipeDetail.drinks[0][element] !== '') {
          const ingredient = recipeDetail.drinks[0][element];
          acc = [...acc, ingredient];
          return acc;
        }
        return acc;
      }, []));
    }
  }, [recipeDetail]);

  function recipeInProgress() {
    const storageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageObj !== null) {
      const storageKeys = Object.keys(storageObj.cocktails).find((element) => {
        if (element === recipeDetail.drinks[0].idDrink) {
          return element;
        }
        return null;
      });
      return storageKeys !== undefined ? 'Continue Recipe' : 'Start Recipe';
    }
    return 'Start Recipe';
  }

  return (
    <div>
      {
        detailsRecipeArray.length === 1
        && (
          <div className="container">
            <img
              src={ detailsRecipeArray[0][0].strDrinkThumb }
              alt={ detailsRecipeArray[0][0].strDrink }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strDrink}</h2>
            <button type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="share button" />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeart } alt="favorite heart" />
            </button>
            <h5 data-testid="recipe-category">{detailsRecipeArray[0][0].strAlcoholic}</h5>
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
            {/* Card de receitas de comidas recomendadas */}
            <section>
              <p data-testid="0-recomendation-card" />
            </section>
            <Link to={ `${pathname}/in-progress` }>
              <button
                type="button"
                className="start-recipe"
                data-testid="start-recipe-btn"
              >
                {recipeInProgress()}
              </button>
            </Link>
          </div>
        )
      }
    </div>
  );
}

export default DrinksRecipes;
