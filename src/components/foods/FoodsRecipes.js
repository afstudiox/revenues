import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import { requestRecipeDetail } from '../../services/API';
import './foodsRecipes.css';

function FoodsRecipes() {
  const { location: { pathname } } = useHistory();
  const { recipeDetail, setRecipeDetail } = useContext(RecipesContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [youtubeEmbed, setYoutubeEmbed] = useState('');
  const detailsRecipeArray = Object.values(recipeDetail);

  async function requestDetails() {
    const id = pathname.split('/');
    const details = await requestRecipeDetail('meal', id[2]);
    setRecipeDetail(details);
  }

  useEffect(() => {
    console.log(recipeDetail);
    requestDetails();
  }, []);

  useEffect(() => {
    if (detailsRecipeArray.length !== 0) {
      const finalString = detailsRecipeArray[0][0].strYoutube
        .replace('watch?v=', 'embed/');
      setYoutubeEmbed(finalString);

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
  }, [recipeDetail]);

  useEffect(() => {
    console.log(ingredientsList);
    console.log(measureList);
  }, [ingredientsList, measureList]);

  return (
    <div className="container">
      {
        detailsRecipeArray.length === 1
        && (
          <div className="container">
            <img
              src={ detailsRecipeArray[0][0].strMealThumb }
              alt={ detailsRecipeArray[0][0].strMeal }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strMeal}</h2>
            <button type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="share button" />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeart } alt="favorite heart" />
            </button>
            <h5 data-testid="recipe-category">{detailsRecipeArray[0][0].strCategory}</h5>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredientsList.map((element, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { measureList[index] === undefined ? `${element}`
                      : `${element} - ${measureList[index]}`}
                  </li>))
              }
              {/* <li data-testid="0-ingredient-name-and-measure" /> */}
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
            <section>
              <p data-testid="0-recomendation-card" />
            </section>
            <Link to={ `${pathname}/in-progress` }>
              <button
                className="start-recipe"
                type="button"
                data-testid="start-recipe-btn"
              >
                Start recipe
              </button>
            </Link>
          </div>
        )
      }
    </div>
  );
}

export default FoodsRecipes;
