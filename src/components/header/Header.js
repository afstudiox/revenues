import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';

function Header({ title }) {
  return (
    // Requisito 9
    <header>
      <Link to="/profile">
        <input
          type="image"
          data-testid="profile-top-btn"
          img
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
