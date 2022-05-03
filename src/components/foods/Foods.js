import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import Footer from '../Footer';
import HeaderSearch from '../header/HeaderSearch';

function Foods() {
  const { recipes } = useContext(RecipesContext);
  const type = Object.keys(recipes);
  const magic = 11;

  // useEffect(() => {
  //   console.log
  // },[])

  // console.log(Object.keys(recipes).length);

  return (
    <>
      <HeaderSearch title="Foods" />
      {Object.keys(recipes).length
        && recipes[type[0]] !== null
        && recipes[type[0]].filter((_recipe, index) => index <= magic)
          .map((recipe, index) => (
            <section key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            </section>
          ))}
      <Footer />
    </>
  );
}

export default Foods;
