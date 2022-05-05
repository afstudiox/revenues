import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// Requisito dos botões
function CardButtonShareAndFav() {
  const copy = clipboardCopy;
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
  }

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
        src={ shareIcon }
        type="button"
        data-testid="share-btn"
        onClick={ copyToClipBoard }
      >
        <img src={ shareIcon } alt="share button" />
      </button>

      <input
        type="image"
        data-testid="favorite-btn"
        src={ favorite ? blackHeart : whiteHeart }
        alt="Profile"
        onClick={ favoriteRecipe }
      />
      {/* <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoriteRecipe }
        src={ !favorite ? whiteHeart : blackHeart }
      >
        {!favorite
          ? (<img src={ whiteHeart } alt="favorite heart" />)
          : (<img src={ blackHeart } alt="favorite heart" />) }
      </button> */}
      {shareClicked && (<p>Link copied!</p>)}
    </>
  );
}

export default CardButtonShareAndFav;
