import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import '~slick-carousel/slick/slick-theme.css';
// import '~slick-carousel/slick/slick.css';
import RecipesContext from '../../context/RecipesContext';
import { requestByAll, requestRecipeDetail } from '../../services/API';
import CardButtonShareAndFav from '../CardButtonShareAndFav';
import IngredientsList from '../IngredientsList';
import Recommendations from '../Recommendations';
import styles from '../../css/Recipes.module.css';
import './drinksRecipes.css';

function DrinksRecipes() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const { location: { pathname } } = useHistory();
  const { recipeDetail,
    setRecipeDetail,
    setRecommended, setFavoriteRecipe } = useContext(RecipesContext);
  const detailsRecipeArray = Object.values(recipeDetail);
  const recommendedQtt = 6;
  const id = pathname.split('/');

  async function requestDetails() {
    const details = await requestRecipeDetail('cocktail', id[2]);
    const recommend = await requestByAll('meal');
    setRecipeDetail(details);
    // Requisito 36
    setRecommended(recommend.meals.filter((_element, index) => index < recommendedQtt));
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

      setFavoriteRecipe(
        {
          id: id[2],
          type: 'drink',
          nationality: '',
          category: recipeDetail.drinks[0].strCategory,
          alcoholicOrNot: recipeDetail.drinks[0].strAlcoholic,
          name: recipeDetail.drinks[0].strDrink,
          image: recipeDetail.drinks[0].strDrinkThumb,
        },
      );
    }
  }, [recipeDetail]);

  // Requisito 40
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
          <div className={ styles.container }>
            <img
              src={ detailsRecipeArray[0][0].strDrinkThumb }
              alt={ detailsRecipeArray[0][0].strDrink }
              data-testid="recipe-photo"
              className="image-drink"
            />
            <div className={ styles.recipe }>
              <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strDrink}</h2>
              <h5
                data-testid="recipe-category"
              >
                {detailsRecipeArray[0][0].strAlcoholic}

              </h5>
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
              {/* https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map */}
            </div>
            <div className={ styles.recommend }>
              <h3>Recommendations</h3>
              <Recommendations />
            </div>
            <div className={ styles.btnStart }>
              <Link to={ `${pathname}/in-progress` }>
                <button
                  type="button"
                  // className="start-recipe"
                  data-testid="start-recipe-btn"
                >
                  {recipeInProgress()}
                </button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default DrinksRecipes;
