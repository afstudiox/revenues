import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import Header from '../header/Header';
import styles from '../../css/Explorer.module.css';

function ExploreFoods() {
  const { randomFoods } = useContext(RecipesContext);
  const { meals } = randomFoods;

  const id = meals ? meals[0].idMeal : 'Deu ruim bixo >:(';

  return (
    <>
      <Header title="Explore Foods" />
      <div className={ styles.container }>
        <Link to="/explore/foods/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
        <Link to={ `/foods/${id}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Surprise me!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
