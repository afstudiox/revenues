import PropTypes from 'prop-types';
import React from 'react';

function IngredientsList({ element, index, measureList }) {
  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ index }
    >
      { measureList[index] === undefined ? `${element}`
        : `${element} - ${measureList[index]}`}
    </li>
  );
}

IngredientsList.propTypes = {
  element: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  measureList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default IngredientsList;
