import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import CardRecipes from '../CardRecipes';
import Footer from '../Footer';
import HeaderSearch from '../header/HeaderSearch';
import Styles from '../../css/Drinks.module.css';

function Drinks() {
  const { recipes } = useContext(RecipesContext);
  const type = Object.keys(recipes);
  const magic = 11;

  return (
    <>
      <HeaderSearch title="Drinks" />
      <div className={ Styles.container }>
        {type.length
          && recipes[type[0]] !== null
          && recipes[type[0]].filter((_recipe, index) => index <= magic)
            .map((recipe, index) => (
              // <section key={ index } data-testid={ `${index}-recipe-card` }>
              //   <img
              //     data-testid={ `${index}-card-img` }
              //     src={ recipe.strDrinkThumb }
              //     alt={ recipe.strDrink }
              //   />
              //   <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              // </section>
              <CardRecipes recipe={ recipe } index={ index } key={ index } />
            ))}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
