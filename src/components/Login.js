import React from 'react';

function Login() {
  return (
    <form>
      <h3>Login</h3>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          placeholder="Your email..."
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          placeholder="Your password..."
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
