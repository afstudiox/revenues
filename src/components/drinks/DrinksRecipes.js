import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import { requestRecipeDetail } from '../../services/API';
import './drinksRecipes.css';

function DrinksRecipes() {
  const { location: { pathname } } = useHistory();
  const { recipeDetail, setRecipeDetail } = useContext(RecipesContext);
  const detailsRecipeArray = Object.values(recipeDetail);

  async function requestDetails() {
    const id = pathname.split('/');
    const retorno = await requestRecipeDetail('cocktail', id[2]);
    setRecipeDetail(retorno);
    return retorno;
  }

  useEffect(() => {
    requestDetails();
  }, []);

  return (
    <div>
      {
        detailsRecipeArray.length === 1
        && (
          <div className="container">
            <img
              src={ detailsRecipeArray[0][0].strDrinkThumb }
              alt={ detailsRecipeArray[0][0].strDrink }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strDrink}</h2>
            <button type="button" data-testid="share-btn">
              Share
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeart } alt="favorite heart" />
            </button>
            <h5 data-testid="recipe-category">{detailsRecipeArray[0][0].strAlcoholic}</h5>
            <ul>
              {/* colocar os ingredientes e quantidades aqui */}
              <li data-testid="0-ingredient-name-and-measure" />
            </ul>
            <p data-testid="instructions">{detailsRecipeArray[0][0].strInstructions}</p>
            {/* Card de receitas recomendadas */}
            <section>
              <p data-testid="0-recomendation-card" />
            </section>
            <Link to={ `${pathname}/in-progress` }>
              <button
                type="button"
                className="start-recipe"
                data-testid="start-recipe-btn"
              >
                Start recipe
              </button>
            </Link>
          </div>
        )
      }
    </div>
  );
}

export default DrinksRecipes;
