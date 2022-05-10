import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Styles from '../css/CardRecommendations.module.css';
import './CardRecommendations.css';
// import RecipesContext from '../context/RecipesContext';

function CardRecommendations(props) {
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

  const path = `${pathname}/${id}`;
  console.log(path);

  return (
    <Link to={ path }>
      <section
        key={ index }
        className={ Styles.container }
      >
        <img
          data-testid={ `${index}-recomendation-card` }
          src={ thumb }
          alt={ name }
          width="170px"
          className="recommendation-image"
        />
        <p data-testid={ `${index}-recomendation-title` }>{ name }</p>
      </section>
    </Link>
  );
}

CardRecommendations.propTypes = {
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardRecommendations;
