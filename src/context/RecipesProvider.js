import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  requestByAll,
  requestByIngredients,
  requestFilterCategory,
  requestRandomCocktail,
  requestRandomMeal,
  requestTextButtonsMeals,
  requestTextButtonsMealsCocktail,
  screenDrinksImageIngredients,
  screenDrinksIngredients,
  screenFoodsImageIngredients,
  screenFoodsIngredients } from '../services/API';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const { Provider } = RecipesContext;
  const [recipes, setRecipes] = useState({});
  const [recipesType, setRecipesType] = useState('meal');
  const [resultSize, setResultSize] = useState(0);
  const [recipeDetail, setRecipeDetail] = useState({});
  const [recommended, setRecommended] = useState({});
  const [buttonText, setButtonText] = useState([]);
  const [location, setLocation] = useState('');
  const [randomFoods, setRandomFoods] = useState({});
  const [randomDrinks, setRandomDrinks] = useState({});
  const [arrayCategory, setArrayCategory] = useState([]);
  const [render, setRender] = useState('');
  const [textRender, setTextRender] = useState('');
  const [favoriteRecipe, setFavoriteRecipe] = useState({
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  });
  const [ingredientsFoods, setIngredientsFoods] = useState(
    [],
  );
  const [ingredientsDrinks, setIngredientsDrinks] = useState(
    [],
  );

  const handleNameIngredientMeal = async ({ target }) => {
    const { innerText } = target.nextElementSibling;
    setRecipes(await requestByIngredients('meal', innerText));
  };

  const handleNameIngredientDrink = async ({ target }) => {
    const { innerText } = target.nextElementSibling;
    setTextRender(innerText);
  };

  useEffect(() => {
    const request = async () => {
      setRandomFoods(await requestRandomMeal());
    };
    request();
  }, []);

  useEffect(() => {
    const request = async () => {
      setRandomDrinks(await requestRandomCocktail());
    };
    request();
  }, []);

  const handleRequest = (/* { target } */) => {
    /* console.log(target.name); */
  };

  const handleStandard = async () => {
    setRecipes(await requestByAll(recipesType));
  };

  useEffect(() => {
    const doze = 12;
    const iFoods = async () => {
      const iFood = await screenFoodsIngredients();
      iFood.forEach(({ strIngredient }, index) => {
        if (index < doze) {
          setIngredientsFoods(
            (prevState) => [...prevState,
              { name: strIngredient, image: screenFoodsImageIngredients(strIngredient) }],
          );
        }
      });
    };
    iFoods();
  }, []);

  console.log(ingredientsDrinks);

  useEffect(() => {
    const doze = 12;
    const iDrinks = async () => {
      const iDrink = await screenDrinksIngredients();
      iDrink.forEach(async ({ strIngredient1 }, index) => {
        if (index < doze) {
          setIngredientsDrinks(
            (prevState) => [...prevState,
              { name: strIngredient1,
                image: screenDrinksImageIngredients(strIngredient1) }],
          );
        }
      });
    };
    iDrinks();
  }, []);

  const handleCategory = async ({ target }) => {
    const { innerText } = target;
    if (!arrayCategory.includes(innerText)) {
      setRecipes(await requestFilterCategory(recipesType, innerText));
      setArrayCategory([...arrayCategory, ...[innerText]]);
    } else {
      setRecipes(await requestByAll(recipesType));
      setArrayCategory([]);
    }
  };

  const dataValues = {
    // colocar estados e funções para os filhos aqui
    recipes,
    buttonText,
    favoriteRecipe,
    location,
    handleStandard,
    handleNameIngredientDrink,
    randomFoods,
    randomDrinks,
    handleCategory,
    handleNameIngredientMeal,
    handleRequest,
    setLocation,
    render,
    setRender,
    ingredientsFoods,
    ingredientsDrinks,
    setButtonText,
    recipesType,
    recipeDetail,
    recommended,
    setFavoriteRecipe,
    setRecommended,
    setRecipeDetail,
    setRecipes,
    setRecipesType,
    resultSize,
    setResultSize,
  };

  useEffect(() => {
    const doze = 12;
    const iFoods = async () => {
      const iFood = await screenFoodsIngredients();
      iFood.forEach(({ strIngredient }, index) => {
        if (index < doze) {
          setIngredientsFoods(
            (prevState) => [...prevState,
              { name: strIngredient, image: screenFoodsImageIngredients(strIngredient) }],
          );
        }
      });
    };
    iFoods();
  }, []);

  useEffect(() => {
    const doze = 12;
    const iDrinks = async () => {
      const iDrink = await screenDrinksIngredients();
      iDrink.forEach(async ({ strIngredient1 }, index) => {
        if (index < doze) {
          setIngredientsDrinks(
            (prevState) => [...prevState,
              { name: strIngredient1,
                image: screenDrinksImageIngredients(strIngredient1) }],
          );
        }
      });
    };
    iDrinks();
  }, []);

  useEffect(() => {
    const key = Object.keys(recipes);
    if (key.length) {
      setResultSize(recipes[key[0]] === null
        ? { } : recipes[key[0]].length);
    }
    // console.log(recipes[key].length);
  }, [recipes]);

  useEffect(() => {
    const setRec = async () => {
      if (textRender !== '' && recipesType === 'cocktail') {
        setRecipes(await requestByIngredients('cocktail', textRender));
      } else {
        const all = await requestByAll(recipesType);
        setRecipes(all);
      }
    };
    setRec();
  }, [textRender, recipesType]);

  useEffect(() => {
    const request = async () => {
      if (location.includes('/drinks')) {
        setButtonText(await requestTextButtonsMealsCocktail());
        setRender('drinks');
      } else {
        setButtonText(await requestTextButtonsMeals());
        setRender('meals');
      }
    };
    request();
  }, [location]);

  return (
    <Provider value={ dataValues }>
      { children }
    </Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
