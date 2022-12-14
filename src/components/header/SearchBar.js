/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import styles from '../../css/Header.module.css';
import { requestByIngredients, requestByLetter, requestByName } from '../../services/API';

function SearchBar() {
  const { setRecipes,
    resultSize, recipesType/*  setRecipesType, */, recipes } = useContext(RecipesContext);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [value, setValue] = useState('');
  const { location: { pathname } } = useHistory();

  console.log(recipesType);

  const history = useHistory();

  function redirectToRecipe() {
    const key = Object.keys(recipes);
    // Requisito 18
    if (recipes[key[0]] === null) {
      alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
    // Requisito 16
    if (key[0] === 'meals' && recipes[key] !== null) {
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
    <div className={ styles.searchBar }>
      <input
        type="text"
        onChange={ changeValue }
        value={ value }
        data-testid="search-input"
        className={ styles.searchInput }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ requestAPI }
      >
        Search
      </button>
      <div className={ styles.radios }>
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
      </div>
    </div>
  );
}

export default SearchBar;
