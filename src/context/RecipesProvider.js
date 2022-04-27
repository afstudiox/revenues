import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { Provider } = RecipesContext;
  const [recipes, setRecipes] = useState([]);

  const dataValues = {
    // colocar estados e funções para os filhos aqui
    recipes,
    setRecipes,
  };

  console.log(recipes);

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
