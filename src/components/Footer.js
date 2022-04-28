import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../css/Footer.module.css';

function Footer() {
  return (
    <div
      data-testid="footer"
      className={ styles.container }
    >
      <Link to="/drinks">
        <input
          type="image"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/explore">
        <input
          type="image"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="exploreIcon"
        />
      </Link>
      <Link to="/foods">
        <input
          type="image"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </Link>
    </div>
  );
}

export default Footer;
