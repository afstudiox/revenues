import PropTypes from 'prop-types';
import React from 'react';
// import { useHistory } from 'react-router-dom';

function IngredientsListCheckBox({ element, index, measureList }) {
  // const { location: { pathname } } = useHistory();

  const checkIngredient = ({ target }) => {
    JSON.parse(localStorage.getItem('inProgressRecipes'));
    // const cocktails = Object.keys(recipeInProgress.cocktails);
    // const meals = Object.keys(recipeInProgress.meals);
    // if (meals.find((id) => id.includes(pathname.split('/')[2])) !== null) {
    //  console.log('teste');
    // }
    if (target.checked) {
      target.parentNode.className = 'clicked';
    } else {
      target.parentNode.className = '';
    }
  };

  return (
    <label
      htmlFor={ `${index}-ingredient` }
      data-testid={ `${index}-ingredient-step` }
      // className={lazaro? 'riscado': 'não riscado'}
    >
      <input
        type="checkbox"
        id={ `${index}-ingredient` }
        key={ index }
        onClick={ checkIngredient }
      />
      { measureList[index] === undefined ? `${element}`
        : `${element} - ${measureList[index]}`}
    </label>
  );
}

IngredientsListCheckBox.propTypes = {
  element: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  measureList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default IngredientsListCheckBox;
