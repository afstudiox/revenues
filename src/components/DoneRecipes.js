import React, { useEffect, useState } from 'react';
import { Link /* useHistory */ } from 'react-router-dom';
import Header from './header/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipe, setDoneRecipes] = useState([]);
  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);
  return (
    <div>
      <Header title="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {doneRecipe.length > 0 && doneRecipe.map((element, index) => (
        <div key={ index }>
          <Link to={ `/${element.type}s/${element.id}` }>
            <img
              className="doneRecipes"
              src={ element.image }
              alt={ element.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { element.nationality !== ''
                ? `${element.nationality} - ${element.category}`
                : `${element.alcoholicOrNot} - ${element.category}`}
            </p>
            <h5 data-testid={ `${index}-horizontal-name` }>{ element.name }</h5>
            <p data-testid={ `${index}-horizontal-done-date` }>{ element.doneDate }</p>
            <button type="button">
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
            <div>
              {element.tags.map((elementTag) => (
                <p
                  key={ elementTag }
                  data-testid={ `${index}-${elementTag}-horizontal-tag` }
                >
                  {elementTag}
                </p>
              ))}
            </div>
          </Link>
        </div>
      ))}
      {console.log(doneRecipe)}
    </div>
  );
}

export default DoneRecipes;
