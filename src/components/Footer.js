import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import styles from '../css/Footer.module.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const { handleRequest } = useContext(RecipesContext);

  return (
    <div
      data-testid="footer"
      className={ styles.container }
    >
      <Link to="/drinks">
        <input
          name="cocktail"
          onClick={ handleRequest }
          type="image"
          id="drinkIcon"
          data-testid="drinks-bottom-btn"
          className={ styles.icon }
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/explore">
        <input
          type="image"
          data-testid="explore-bottom-btn"
          className={ styles.icon }
          src={ exploreIcon }
          alt="exploreIcon"
        />
      </Link>
      <Link to="/foods">
        <input
          name="meal"
          onClick={ handleRequest }
          type="image"
          id="mealIcon"
          data-testid="food-bottom-btn"
          className={ styles.icon }
          src={ mealIcon }
          alt="mealIcon"
        />
      </Link>
    </div>
  );
}

export default Footer;
