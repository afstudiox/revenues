import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import Header from '../header/Header';

function DrinksIngredients() {
  const {
    ingredientsDrinks,
    handleNameIngredientDrink,
  } = useContext(RecipesContext);

  return (
    <>
      <Header title="Explore Ingredients" />
      {
        ingredientsDrinks.map(({ name, image }, index) => (
          <Link to="/drinks" key={ index }>
            <div
              onClick={ handleNameIngredientDrink }
              data-testid={ `${index}-ingredient-card` }
              role="presentation"
            >
              <img
                width="400px"
                data-testid={ `${index}-card-img` }
                src={ image }
                alt={ name }
              />
              <p data-testid={ `${index}-card-name` }>{ name }</p>
            </div>
          </Link>
        ))
      }
      <Footer />
    </>
  );
}

export default DrinksIngredients;
