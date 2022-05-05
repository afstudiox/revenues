import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from '../css/CardRecipes.module.css';
// import RecipesContext from '../context/RecipesContext';

function CardRecipes(props) {
  const { recipe, index } = props;
  const { location: { pathname } } = useHistory();

  let thumb = '';
  let name = '';
  let id = '';

  const DRINK = recipe.strDrinkThumb !== undefined;
  const MEAL = recipe.strMealThumb !== undefined;

  if (MEAL) {
    const { strMealThumb, strMeal, idMeal } = recipe;
    thumb = strMealThumb;
    name = strMeal;
    id = idMeal;
  } else if (DRINK) {
    const { strDrinkThumb, strDrink, idDrink } = recipe;
    thumb = strDrinkThumb;
    name = strDrink;
    id = idDrink;
  }

  const path = `${pathname}${id}`;

  return (
    <Link to={ path }>
      <section
        key={ index }
        data-testid={ `${index}-recipe-card` }
        className={ Styles.container }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt={ name }
        />
        <p data-testid={ `${index}-card-name` }>{ name }</p>
      </section>
    </Link>
  );
}

CardRecipes.propTypes = {
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardRecipes;
