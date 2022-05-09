import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { requestByAll, requestRecipeDetail } from '../../services/API';
import CardButtonShareAndFav from '../CardButtonShareAndFav';
import IngredientsListCheckBox from '../IngredientsListCheckbox';

function FoodsRecipes() {
  const { location: { pathname } } = useHistory();
  const { recipeDetail,
    setRecipeDetail,
    setRecommended, setFavoriteRecipe } = useContext(RecipesContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
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
            {
              ingredientsList.map((element, index) => (<IngredientsListCheckBox
                element={ element }
                index={ index }
                measureList={ measureList }
                key={ index }
              />))
            }
            <p data-testid="instructions">{detailsRecipeArray[0][0].strInstructions}</p>
            <button type="submit" data-testid="finish-recipe-btn"> Finish Recipe</button>
          </>
        )
      }
    </div>
  );
}

export default FoodsRecipes;
