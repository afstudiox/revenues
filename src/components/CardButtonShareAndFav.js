import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
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
  function copyToClipBoard() {
    copy(`http://localhost:3000${pathname}`);
    setShareClicked(true);
  }

  function favoriteRecipe() {
    setFavorite((prevState) => !prevState);
  }

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
