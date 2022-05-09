import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { requestByAll, requestRecipeDetail } from '../../services/API';
import CardButtonShareAndFav from '../CardButtonShareAndFav';
import IngredientsListCheckBox from '../IngredientsListCheckbox';

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
                ingredientsList.map((element, index) => (<IngredientsListCheckBox
                  element={ element }
                  index={ index }
                  measureList={ measureList }
                  key={ index }
                />))
              }
            </ul>
            <p data-testid="instructions">{detailsRecipeArray[0][0].strInstructions}</p>
            <button type="submit" data-testid="finish-recipe-btn"> Finish Recipe</button>
          </div>
        )
      }
    </div>
  );
}

export default DrinksRecipes;
