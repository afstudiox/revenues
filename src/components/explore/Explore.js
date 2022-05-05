import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../header/Header';
import styles from '../../css/Explorer.module.css';

function Explore() {
  return (
    <>
      <Header title="Explore" />
      <div className={ styles.container }>
        <Link to="/explore/foods">
          <button
            type="button"
            data-testid="explore-foods"
          >
            Explore Foods

          </button>
        </Link>
        <Link to="/explore/drinks">
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explore Drinks

          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
