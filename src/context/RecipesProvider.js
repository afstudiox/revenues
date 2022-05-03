import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { requestByAll } from '../services/API';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { Provider } = RecipesContext;
  const [recipes, setRecipes] = useState({});
  const [recipesType, setRecipesType] = useState('meal');
  const [resultSize, setResultSize] = useState(0);
  const [recipeDetail, setRecipeDetail] = useState({});
  // console.log('Recipes do provider =>', recipes);

  const handleRequest = ({ target }) => {
    setRecipesType(target.name);
  };

  const dataValues = {
    // colocar estados e funções para os filhos aqui
    recipes,
    recipesType,
    recipeDetail,
    setRecipeDetail,
    setRecipes,
    setRecipesType,
    resultSize,
    handleRequest,
    setResultSize,
  };

  // console.log('RecipesType do provider', recipesType);

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
