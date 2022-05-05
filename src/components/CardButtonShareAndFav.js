import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function CardButtonShareAndFav() {
  const copy = clipboardCopy;
  const [shareClicked, setShareClicked] = useState(false);
  const { location: { pathname } } = useHistory();
  function copyToClipBoard() {
    copy(`http://localhost:3000${pathname}`);
    setShareClicked(true);
  }

  return (
    <>
      <button type="button" data-testid="share-btn" onClick={ copyToClipBoard }>
        <img src={ shareIcon } alt="share button" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeart } alt="favorite heart" />
      </button>
      {shareClicked && (<p>Link copied!</p>)}
    </>
  );
}

export default CardButtonShareAndFav;
