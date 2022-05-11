import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './header/Header';
import styles from '../css/Profile.module.css';

function Profile() {
  const [storageEmail, setStorageEmail] = useState('');
  // const { email } = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      setStorageEmail(email);
    }
  }, []);

  function logout() {
    localStorage.clear();
  }

  return (
    <>
      <Header title="Profile" />
      <main className={ styles.container }>
        <h5>USER</h5>
        <p data-testid="profile-email">{ storageEmail }</p>
        <div className={ styles.buttons }>
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
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
