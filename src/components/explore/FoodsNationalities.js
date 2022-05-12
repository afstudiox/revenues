import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import styles from '../../css/Foods.module.css';
import HeaderSearch from '../header/HeaderSearch';

/* <select id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select> */

function FoodsNationalities() {
  const {
    explorerNationality,
    foodsNatinality,
    handleArea,
  } = useContext(RecipesContext);

  const doze = 12;

  return (
    <>
      <HeaderSearch title="Explore Nationalities" />
      <select
        onChange={ handleArea }
        data-testid="explore-by-nationality-dropdown"
        id="Explorer"
      >
        {
          explorerNationality && explorerNationality.map(({ strArea }, index) => (
            (
              <option
                data-testid={ `${strArea}-option` }
                key={ index }
                value={ strArea }
              >
                { strArea }
              </option>
            )
          ))
        }
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
      </select>
      <div className={ styles.container }>
        {
          foodsNatinality.meals
            ? foodsNatinality.meals.map(({ strMealThumb, strMeal, idMeal }, index) => (
              index < doze && (
                <Link to={ `/foods/${idMeal}` }>
                  <div data-testid={ `${index}-recipe-card` } key={ index }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ strMealThumb }
                      alt=":D"
                      width="100px"
                    />
                    <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
                  </div>
                </Link>
              )
            )) : []
        }
      </div>

      <Footer />
    </>
  );
}

export default FoodsNationalities;
