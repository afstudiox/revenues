import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import Header from '../header/Header';
import styles from '../../css/Explorer.module.css';

function ExploreDrinks() {
  const { randomDrinks } = useContext(RecipesContext);
  const { drinks } = randomDrinks;

  const id = drinks ? drinks[0].idDrink : 'Deu ruim bixo >:(';

  console.log(id);

  return (
    <>
      <Header title="Explore Drinks" />
      <div className={ styles.container }>
        <Link to="/explore/drinks/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <Link to={ `/drinks/${id}` }>
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

export default ExploreDrinks;
