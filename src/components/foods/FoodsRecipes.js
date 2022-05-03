import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { requestRecipeDetail } from '../../services/API';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import './foodsRecipes.css';

function FoodsRecipes() {
  const { location: { pathname } } = useHistory();
  const { recipeDetail, setRecipeDetail } = useContext(RecipesContext);
  const [youtubeEmbed, setYoutubeEmbed] = useState('');
  const detailsRecipeArray = Object.values(recipeDetail);

  async function requestDetails() {
    const id = pathname.split('/');
    const details = await requestRecipeDetail('meal', id[2]);
    setRecipeDetail(details);
  }

  useEffect(() => {
    console.log(recipeDetail);
    requestDetails();
  }, []);

  useEffect(() => {
    if (detailsRecipeArray.length !== 0) {
      const finalString = detailsRecipeArray[0][0].strYoutube
        .replace('watch?v=', 'embed/');
      setYoutubeEmbed(finalString);
    }
  }, [recipeDetail]);

  return (
    <div className="container">
      {
        detailsRecipeArray.length === 1
        && (
          <div>
            <img
              src={ detailsRecipeArray[0][0].strMealThumb }
              alt={ detailsRecipeArray[0][0].strMeal }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{detailsRecipeArray[0][0].strMeal}</h2>
            <button type="button" data-testid="share-btn">
              Share
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeart } alt="favorite heart" />
            </button>
            <h5 data-testid="recipe-category">{detailsRecipeArray[0][0].strCategory}</h5>
            <ul>
              {/* colocar os ingredientes e quantidades aqui */}
              <li data-testid="0-ingredient-name-and-measure" />
            </ul>
            <p data-testid="instructions">{detailsRecipeArray[0][0].strInstructions}</p>
            <iframe
              width="300"
              height="220"
              src={ youtubeEmbed }
              title={ detailsRecipeArray[0][0].strMeal }
              data-testid="video"
            />
            {/* Card de drinks recomendadas */}
            <section>
              <p data-testid="0-recomendation-card" />
            </section>
            <Link to={ `${pathname}/in-progress` }>
              <button
                className="start-recipe"
                type="button"
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

export default FoodsRecipes;
