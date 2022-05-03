/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { requestByIngredients, requestByLetter, requestByName } from '../../services/API';

function SearchBar() {
  const { setRecipes,
    resultSize, recipesType, setRecipesType, recipes } = useContext(RecipesContext);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [value, setValue] = useState('');
  const { location: { pathname } } = useHistory();
  console.log('Pathname =>', pathname);
  useEffect(() => {
    if (pathname !== '/foods') {
      setRecipesType('cocktail');
    } else {
      setRecipesType('meal');
    }
  }, []);

  console.log('recipesType do searchBar =>', recipesType);

  const history = useHistory();

  // Sorry, we haven't found any recipes for these filters.

  function redirectToRecipe() {
    const key = Object.keys(recipes);
    if (recipes[key[0]] === null) {
      alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    } if (key[0] === 'meals' && recipes[key] !== null) {
      return resultSize === 1
      && history.push(`${pathname}/${recipes.meals[0].idMeal}`);
    }
    return resultSize === 1
    && history.push(`${pathname}/${recipes.drinks[0].idDrink}`);
  }

  useEffect(() => {
    redirectToRecipe();
  }, [resultSize]);

  const getSelectedRadio = ({ target }) => {
    setSelectedRadio(target.id);
  };

  const changeValue = ({ target }) => {
    setValue(target.value);
  };

  const requestAPI = async () => {
    if (selectedRadio === 'letter' && value.length > 1) {
      alert('Your search must have only 1 (one) character');
      return null;
    }
    switch (selectedRadio) {
    case 'ingredient':
      setRecipes(await requestByIngredients(recipesType, value));
      break;
    case 'name':
      setRecipes(await requestByName(recipesType, value));
      break;
    case 'letter':
      setRecipes(await requestByLetter(recipesType, value));
      break;
    default:
      return null;
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={ changeValue }
        value={ value }
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          name="search"
          onChange={ getSelectedRadio }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="search"
          onChange={ getSelectedRadio }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="letter">
        <input
          type="radio"
          id="letter"
          name="search"
          onChange={ getSelectedRadio }
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ requestAPI }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
