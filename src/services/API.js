// const API_URL_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
// const API_URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const API_URL_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const requestByIngredients = async (recipesType, ingredient) => {
  console.log(`https://www.the${recipesType}db.com/api/json/v1/1/filter.php?i=${ingredient}`);
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
