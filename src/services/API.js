const API_URL_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const API_URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_URL_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const requestByIngredients = async (ingredient) => {
  const request = await fetch(`${API_URL_INGREDIENT}${ingredient}`);
  const response = await request.json();
  return response;
};

export const requestByName = async (name) => {
  const request = await fetch(`${API_URL_NAME}${name}`)
    .then((response) => response.json());
  return request;
};

export const requestByLetter = async (letter) => {
  const request = await fetch(`${API_URL_FIRST_LETTER}${letter}`)
    .then((response) => response.json());
  return request;
};
