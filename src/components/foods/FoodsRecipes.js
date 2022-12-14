import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { requestByAll, requestRecipeDetail } from '../../services/API';
import CardButtonShareAndFav from '../CardButtonShareAndFav';
import IngredientsList from '../IngredientsList';
import Recommendations from '../Recommendations';
import styles from '../../css/Recipes.module.css';

function FoodsRecipes() {
  const { location: { pathname } } = useHistory();
  const { recipeDetail,
    setRecipeDetail,
    setRecommended, setFavoriteRecipe } = useContext(RecipesContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [youtubeEmbed, setYoutubeEmbed] = useState('');
  const detailsRecipeArray = Object.values(recipeDetail);
  const recommendedQtt = 6;
  const id = pathname.split('/');

  async function requestDetails() {
    const details = await requestRecipeDetail('meal', id[2]);
    const recommend = await requestByAll('cocktail');
    setRecipeDetail(details);
    // Requisito 36
    setRecommended(recommend.drinks
      .filter((_element, index) => index < recommendedQtt));
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
      setFavoriteRecipe(
        {
          id: id[2],
          type: 'food',
          nationality: recipeDetail.meals[0].strArea,
          category: recipeDetail.meals[0].strCategory,
          alcoholicOrNot: '',
          name: recipeDetail.meals[0].strMeal,
          image: recipeDetail.meals[0].strMealThumb,
        },
      );
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
    <div>
      {
        detailsRecipeArray.length === 1
        && (
          <div className={ styles.container }>
            <img
              src={ detailsRecipeArray[0][0].strMealThumb }
              alt={ detailsRecipeArray[0][0].strMeal }
              data-testid="recipe-photo"
            />
            <div className={ styles.recipe }>
              <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strMeal}</h2>
              <h5
                data-testid="recipe-category"
              >
                {detailsRecipeArray[0][0].strCategory}

              </h5
              >
            </div>
            <div className={ styles.buttons }>
              <CardButtonShareAndFav />
            </div>
            <div className={ styles.ingredients }>
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
            </div>
            <div className={ styles.instructions }>
              <h3>Instructions</h3>
              <p data-testid="instructions">{detailsRecipeArray[0][0].strInstructions}</p>
            </div>
            <div className={ styles.video }>
              <iframe
                src={ youtubeEmbed }
                title={ detailsRecipeArray[0][0].strMeal }
                data-testid="video"
              />
            </div>
            {/* Card de drinks recomendadas */}
            <div className={ styles.recommend }>
              <h3>Recommendations</h3>
              <Recommendations />
            </div>
            {/* <p data-testid="0-recomendation-card" /> */}
            <div className={ styles.btnStart }>
              <Link to={ `${pathname}/in-progress` }>
                <button
                  // className="start-recipe"
                  type="button"
                  data-testid="start-recipe-btn"
                >
                  {
                    recipeInProgress()
                  }
                  {/* Start Recipe */}
                </button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default FoodsRecipes;
