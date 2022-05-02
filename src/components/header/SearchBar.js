/* eslint-disable no-alert */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { requestByIngredients, requestByLetter, requestByName } from '../../services/API';

// eslint-disable-next-line react/prop-types
function SearchBar() {
  const { setRecipes, recipesType, setRecipesType } = useContext(RecipesContext);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [value, setValue] = useState('');
  const { location: { pathname } } = useHistory();
  useEffect(() => {
    if (pathname !== '/foods') {
      setRecipesType('cocktail');
    } else {
      setRecipesType('meal');
    }
  }, []);

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