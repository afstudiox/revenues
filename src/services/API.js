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

export const requestByAll = async (teste) => {
  const request = await fetch(`https://www.the${teste}db.com/api/json/v1/1/search.php?s=`)
    .then((response) => response.json());
  return request;
};

export const requestRecipeDetail = async (recipesType, recipeID) => {
  console.log(`https://www.the${recipesType}db.com/api/json/v1/1/lookup.php?i=${recipeID}`);
  const request = await fetch(`https://www.the${recipesType}db.com/api/json/v1/1/lookup.php?i=${recipeID}`)
    .then((response) => response.json());
  return request;
  // console.log(`www.the${recipesType}db.com/api/json/v1/1/lookup.php?i=${recipeID}`);
  // const request = await
  // fetch(`www.the${recipesType}db.com/api/json/v1/1/lookup.php?i=${recipeID}`)
  //   .then((response) => { console.log(response); return response.json(); });
  // return request;
};
