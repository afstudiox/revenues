import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiFoodMenu } from 'react-icons/bi';
import styles from '../css/Login.module.css';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const minPasswordLength = 6;
  const regxEmail = /\S+@\S+\.\S+/;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  // Requisitos 6, 7 e 8
  const submitButton = () => {
    const email = { email: user.email };
    const inProgressRecipes = { cocktails: {
    },
    meals: {
    } };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(email));
    if (localStorage.setItem('doneRecipes', []) === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  return (
    <div className={ styles.container }>
      <form>
        {/* // Requisitos 2,3 e 4 */}
        {<div className={ styles.icon }><BiFoodMenu /></div>}
        <h3>LOGIN</h3>
        <label htmlFor="email">
          {/* Email: [CSS - USAR SOMENTE PLACEHOLDER] */}
          <input
            type="email"
            name="email"
            placeholder="Your email..."
            data-testid="email-input"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          {/* Password: [CSS - USAR SOMENTE PLACEHOLDER] */}
          <input
            type="password"
            name="password"
            placeholder="Your password..."
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
        <Link to="/foods">
          <button
            type="submit"
            data-testid="login-submit-btn"
            onClick={ submitButton }
            disabled={ !(regxEmail
              .test(user.email) && user.password.length > minPasswordLength) }
          >
            ENTER
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
