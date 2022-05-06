import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import RecipesContext from '../context/RecipesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// Requisito dos botões
function CardButtonShareAndFav() {
  const copy = clipboardCopy;
  // const { recipeDetail } = useContext(RecipesContext);
  const [shareClicked, setShareClicked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { location: { pathname } } = useHistory();
  // const lazaro = false;
  function copyToClipBoard() {
    copy(`http://localhost:3000${pathname}`);
    setShareClicked(true);
  }

  function favoriteRecipe() {
    setFavorite((prevState) => !prevState);
    JSON.parse(localStorage.getItem('favoriteRecipes'));
    // localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, {
    //   id: recipeDetail,
    // }]));
  }
  // FOMOS CORTADOS
  useEffect(() => {
    const storageObj = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageObj !== null) {
      const recipeId = pathname.split('/');
      Object.values(storageObj).find((element) => {
        if (element.id === recipeId[2]) {
          setFavorite((prevState) => !prevState);
        }
        return null;
      });
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={ copyToClipBoard }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="share button" />
      </button>

      <button
        type="button"
        onClick={ favoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeart : whiteHeart }
          alt="Profile"
        />
      </button>
      {shareClicked && (<p>Link copied!</p>)}
    </>
  );
}

export default CardButtonShareAndFav;
