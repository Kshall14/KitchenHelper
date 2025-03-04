

const APIKey = '551eacec75ac44b5a70f1b987a3c7bb3'
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const findRecipesByIngredients = async (ingredients, number = 15) => {
    try {
      const url = `${BASE_URL}/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=${APIKey}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response Data:', JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error('Error fetching recipes by ingredients:', error);
      throw error;
    }
  };
  export const findRecipesByOnlyIngredients = async (ingredients, number = 15) => {
    try {
      const url = `${BASE_URL}/complexSearch?includeIngredients=${ingredients}&number=${number}&apiKey=${APIKey}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response Data (Only Ingredients):', JSON.stringify(data, null, 2));
      return data.results; // Assuming the API returns results in a "results" property
    } catch (error) {
      console.error('Error fetching recipes by only ingredients:', error);
      throw error;
    }
  };
  export const getRecipeInformation = async (id) => {
    try {
      const url = `${BASE_URL}/${id}/information?apiKey=${APIKey}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Recipe Information:', JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error('Error fetching recipe information:', error);
      throw error;
    }
  };
  export const getRandomRecipe = async (number = 6) => {
    try {
      const url = `${BASE_URL}/random?apiKey=${APIKey}&number=${number}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Random Recipe:', JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      throw error;
    }
  };