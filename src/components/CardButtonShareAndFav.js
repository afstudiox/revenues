import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import styles from '../css/Recipes.module.css';

// Requisito dos botões
function CardButtonShareAndFav() {
  const copy = clipboardCopy;
  const { recipeDetail, favoriteRecipe } = useContext(RecipesContext);
  const [shareClicked, setShareClicked] = useState(false);
  const [favoriteImg, setFavoriteImg] = useState(false);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    console.log(recipeDetail);
  }, []);

  // const { recipeDetail } = useContext(RecipesContext);
  // const lazaro = false;
  function copyToClipBoard() {
    copy(`http://localhost:3000${pathname}`);
    setShareClicked(true);
  }

  function handleFavoriteRecipe() {
    setFavoriteImg((prevState) => !prevState);
    // const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([favoriteRecipe]));
    console.log(favoriteRecipe);
  }
  // FOMOS CORTADOS
  useEffect(() => {
    const storageObj = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageObj !== null) {
      const recipeId = pathname.split('/');
      Object.values(storageObj).find((element) => {
        if (element.id === recipeId[2]) {
          setFavoriteImg((prevState) => !prevState);
        }
        return null;
      });
    }
  }, []);

  return (
    <>
      <div className={ styles.message }>
        {shareClicked && (<p>Link copied!</p>)}
      </div>

      <div className={ styles.btnShare }>
        <button
          type="button"
          onClick={ copyToClipBoard }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share button" />
        </button>

        <button
          type="button"
          onClick={ handleFavoriteRecipe }
        >
          <img
            data-testid="favorite-btn"
            src={ favoriteImg ? blackHeart : whiteHeart }
            alt="Profile"
          />
        </button>
      </div>
    </>
  );
}

export default CardButtonShareAndFav;
