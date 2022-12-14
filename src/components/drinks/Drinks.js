import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import styles from '../../css/Drinks.module.css';
import CardRecipes from '../CardRecipes';
import Footer from '../Footer';
import HeaderSearch from '../header/HeaderSearch';

function Drinks() {
  const { recipes } = useContext(RecipesContext);
  const type = Object.keys(recipes);
  const magic = 11;

  return (
    <>
      <HeaderSearch title="Drinks" />
      <div className={ styles.container }>
        {type.length
          && recipes[type[0]] !== null
          && recipes[type[0]].filter((_recipe, index) => index <= magic)
            .map((recipe, index) => (
              <CardRecipes recipe={ recipe } index={ index } key={ index } />
            ))}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
