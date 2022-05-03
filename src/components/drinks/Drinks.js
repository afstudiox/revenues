import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import HeaderSearch from '../header/HeaderSearch';

function Drinks() {
  const { recipes } = useContext(RecipesContext);
  const type = Object.keys(recipes);
  const magic = 11;

  console.log(Object.keys(recipes).length);

  return (
    <>
      <HeaderSearch title="Drinks" />
      {Object.keys(recipes).length
        && recipes[type[0]] !== null
        && recipes[type].filter((_recipe, index) => index <= magic)
          .map((recipe, index) => (
            <section key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            </section>
          ))}
      <Footer />
    </>
  );
}

export default Drinks;
