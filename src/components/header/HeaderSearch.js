import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/Header.module.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

function HeaderSearch({ title }) {
  const [toggle, setToggle] = useState(false);

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
