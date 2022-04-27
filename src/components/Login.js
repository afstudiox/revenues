import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(email));
  };

  return (
    <form>
      {/* // Requisitos 2,3 e 4 */}
      <h3>Login</h3>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          placeholder="Your email..."
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Password:
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
          Enter
        </button>
      </Link>
    </form>
  );
}

export default Login;
