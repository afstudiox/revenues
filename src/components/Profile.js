import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './header/Header';
import './profile.css';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  function logout() {
    localStorage.clear();
  }

  return (
    <>
      <Header title="Profile" />
      <main>
        <p data-testid="profile-email">{email}</p>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            Logout
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
