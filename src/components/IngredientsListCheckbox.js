import PropTypes from 'prop-types';
import React from 'react';

function IngredientsListCheckBox({ element, index, measureList }) {
  return (
    <label htmlFor={ `${index}-ingredient` } data-testid={ `${index}-ingredient-step` }>
      <input
        type="checkbox"
        id={ `${index}-ingredient` }
        key={ index }
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
