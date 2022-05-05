import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { requestByAll,
  requestFilterCategory,
  requestTextButtonsMeals, requestTextButtonsMealsCocktail } from '../services/API';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { Provider } = RecipesContext;
  const [recipes, setRecipes] = useState({});
  const [recipesType, setRecipesType] = useState('meal');
  const [resultSize, setResultSize] = useState(0);
  const [buttonText, setButtonText] = useState([]);
  const [location, setLocation] = useState('');
  const [arrayCategory, setArrayCategory] = useState([]);
  const [render, setRender] = useState('');

  console.log('ButtonText =>', buttonText);
  console.log(arrayCategory);

  const handleRequest = ({ target }) => {
    console.log(target.name);
  };

  const handleStandard = async () => {
<<<<<<< HEAD
    setRecipes(await requestByAll());
=======
    setRecipes(await requestByAll(recipesType));
>>>>>>> f1d10bcb0810ca1aedcc15781b35c0e9b39bc003
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
