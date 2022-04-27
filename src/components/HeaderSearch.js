import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function HeaderSearch({ title }) {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle((prevState) => !prevState);
  };

  console.log(toggle);

  return (
    // Requisito 9
    <header>
      <Link to="/profile">
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      <input
        type="image"
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search"
        onClick={ handleClick }
      />

      {
        toggle && (
          <input
            type="text"
            data-testid="search-input"
          />
        )
      }

    </header>
  );
}

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSearch;
