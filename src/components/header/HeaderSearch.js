import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import styles from '../../css/Header.module.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

function HeaderSearch({ title }) {
  const [toggle, setToggle] = useState(false);
  const { recipesType,
    setRecipesType, buttonText,
    render, handleCategory, setLocation, handleStandard } = useContext(RecipesContext);
  const quatro = 4;
  const cinco = 5;

  const { location: { pathname } } = useHistory();

  useEffect(() => {
    setLocation(pathname);
    if (pathname.includes('/drinks')) {
      setRecipesType('cocktail');
    } else {
      setRecipesType('meal');
    }
  }, [recipesType]);

  const handleClick = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    // Requisito 9
    <header className={ styles.container }>
      <Link to="/profile">
        <input
          type="image"
          data-testid="profile-top-btn"
          className={ styles.icon }
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      <input
        type="image"
        data-testid="search-top-btn"
        className={ styles.icon }
        src={ searchIcon }
        alt="Search"
        onClick={ handleClick }
      />
      <div>
        {
          !toggle && (
            buttonText[render] !== undefined
              ? buttonText[render].map(({ strCategory }, index) => (
                index <= quatro ? (
                  <button
                    data-testid={ `${strCategory}-category-filter` }
                    type="button"
                    onClick={ handleCategory }
                    key={ index }
                  >
                    { strCategory }
                  </button>
                ) : index === cinco && (
                  <button
                    data-testid="All-category-filter"
                    onClick={ handleStandard }
                    type="button"
                  >
                    All
                  </button>
                )
              )) : []
          )
        }
      </div>
      {
        toggle && (
          <SearchBar />
        )
      }
    </header>
  );
}

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSearch;
