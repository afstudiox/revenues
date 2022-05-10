import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import Header from '../header/Header';
import style from '../../css/Ingredients.module.css';

function FoodsIngredients() {
  const {
    ingredientsFoods,
    handleNameIngredientMeal,
  } = useContext(RecipesContext);

  return (
    <>
      <Header title="Explore Ingredients" />
      <div className={ style.container }>
        {
          ingredientsFoods.map(({ name, image }, index) => (
            <Link to="/foods" key={ index }>
              <div
                onClick={ handleNameIngredientMeal }
                data-testid={ `${index}-ingredient-card` }
                role="presentation"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ image }
                  alt={ name }
                />
                <p data-testid={ `${index}-card-name` }>{ name }</p>
              </div>
            </Link>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

export default FoodsIngredients;
