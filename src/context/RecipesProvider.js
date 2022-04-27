import PropTypes from 'prop-types';
import React from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { Provider } = RecipesContext;

  const dataValues = {
    // colocar estados e funções para os filhos aqui
  };

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
