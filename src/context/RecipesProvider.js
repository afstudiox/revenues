import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  requestByAll,
  requestFilterCategory,
  requestTextButtonsMeals,
  requestTextButtonsMealsCocktail,
} from '../services/API';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { Provider } = RecipesContext;
  const [recipes, setRecipes] = useState({});
  const [recipesType, setRecipesType] = useState('meal');
  const [resultSize, setResultSize] = useState(0);
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recommended, setRecommended] = useState({});
  const [buttonText, setButtonText] = useState([]);
  const [location, setLocation] = useState('');
  const [arrayCategory, setArrayCategory] = useState([]);
  const [render, setRender] = useState('');

  const handleRequest = ({ target }) => {
    console.log(target.name);
  };

  const handleStandard = async () => {
    setRecipes(await requestByAll(recipesType));
  };

  const handleCategory = async ({ target }) => {
    const { innerText } = target;
    if (!arrayCategory.includes(innerText)) {
      setRecipes(await requestFilterCategory(recipesType, innerText));
      setArrayCategory([...arrayCategory, ...[innerText]]);
    } else {
      setRecipes(await requestByAll(recipesType));
      setArrayCategory([]);
    }
  };

  const dataValues = {
    // colocar estados e funções para os filhos aqui
    recipes,
    buttonText,
    location,
    handleStandard,
    handleCategory,
    handleRequest,
    setLocation,
    render,
    setRender,
    setButtonText,
    recipesType,
    recipeDetail,
    recommended,
    setRecommended,
    setRecipeDetail,
    setRecipes,
    setRecipesType,
    resultSize,
    setResultSize,
  };

  useEffect(() => {
    const key = Object.keys(recipes);
    if (key.length) {
      setResultSize(recipes[key[0]] === null
        ? { } : recipes[key[0]].length);
    }
    // console.log(recipes[key].length);
  }, [recipes]);

  useEffect(() => {
    const setRec = async () => {
      const all = await requestByAll(recipesType);
      setRecipes(all);
    };
    setRec();
  }, [recipesType]);

  useEffect(() => {
    const request = async () => {
      if (location.includes('/drinks')) {
        setButtonText(await requestTextButtonsMealsCocktail());
        setRender('drinks');
      } else {
        setButtonText(await requestTextButtonsMeals());
        setRender('meals');
      }
    };
    request();
  }, [location]);

  return (
    <Provider value={ dataValues }>
      { children }
    </Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
