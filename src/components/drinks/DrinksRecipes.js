import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import '~slick-carousel/slick/slick-theme.css';
// import '~slick-carousel/slick/slick.css';
import RecipesContext from '../../context/RecipesContext';
import { requestByAll, requestRecipeDetail } from '../../services/API';
import CardButtonShareAndFav from '../CardButtonShareAndFav';
import IngredientsList from '../IngredientsList';
import Recommendations from '../Recommendations';
import './drinksRecipes.css';

function DrinksRecipes() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const { location: { pathname } } = useHistory();
  const { recipeDetail,
    setRecipeDetail,
    setRecommended } = useContext(RecipesContext);
  const detailsRecipeArray = Object.values(recipeDetail);
  const recommendedQtt = 6;

  async function requestDetails() {
    const id = pathname.split('/');
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
          <div className="container">
            <img
              src={ detailsRecipeArray[0][0].strDrinkThumb }
              alt={ detailsRecipeArray[0][0].strDrink }
              data-testid="recipe-photo"
              className="image-drink"
            />
            <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strDrink}</h2>
            <CardButtonShareAndFav />
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
            {/* https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map */}
            <Recommendations />
            {/* <Slider { ...settings }>
              { recommended?.meals?.filter((_element, index) => index < recommendedQtt)
                .map((recipe, index) => (
                  <CardRecipes key={ index } recipe={ recipe } index={ index } /> // Cheguei :D
                ))}
            </Slider> */}
            {/* <section>
              <p data-testid="0-recomendation-card" />
            </section> */}
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
