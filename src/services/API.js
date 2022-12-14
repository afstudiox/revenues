// const API_URL_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
// const API_URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const API_URL_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const requestByIngredients = async (recipesType, ingredient) => {
  const request = await fetch(`https://www.the${recipesType}db.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = await request.json();
  return response;
};

export const requestByName = async (recipesType, name) => {
  const request = await fetch(`https://www.the${recipesType}db.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => response.json());
  return request;
};

export const requestByLetter = async (recipesType, letter) => {
  const request = await fetch(`https://www.the${recipesType}db.com/api/json/v1/1/search.php?f=${letter}`)
    .then((response) => response.json());
  return request;
};

export const requestByAll = async (recipesType) => {
  const request = await fetch(`https://www.the${recipesType}db.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json());
  return request;
};

export const requestRecipeDetail = async (recipesType, recipeID) => {
  const request = await fetch(`https://www.the${recipesType}db.com/api/json/v1/1/lookup.php?i=${recipeID}`)
    .then((response) => response.json());
  return request;
};

export const requestTextButtonsMeals = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json());
  return request;
};

export const requestTextButtonsMealsCocktail = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json());
  return request;
};

export const requestFilterCategory = async (type, category) => {
  const request = await fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json());
  return request;
};

export const requestRandomMeal = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json());
  return request;
};

export const requestRandomCocktail = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json());
  return request;
};

export const screenFoodsIngredients = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json());
  return request.meals;
};

export const screenFoodsImageIngredients = (imageFood) => {
  const url = `https://www.themealdb.com/images/ingredients/${imageFood}-Small.png`;
  return url;
};

export const screenDrinksIngredients = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json());
  return request.drinks;
};

export const screenDrinksImageIngredients = (imageDrink) => {
  const url = `https://www.thecocktaildb.com/images/ingredients/${imageDrink}-Small.png`;
  return url;
};

export const explorerFoodsNationality = () => {
  const request = fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json());
  return request;
};

export const searchExploreNationality = async (area) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json());
  return request;
};
