import PropTypes from 'prop-types';
import React from 'react';

function IngredientsListCheckBox({ element, index, measureList }) {
  const checkIngredient = ({ target }) => {
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
