import axios from 'axios'

const API_URL = '/api/recipes/'

// Create new recipe
const createRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, recipeData, config)

  return response.data
}

// Get user recipes
const getRecipes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user recipe
const deleteRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + recipeId, config)

  return response.data
}

const recipeService = {
  createRecipe,
  getRecipes,
  deleteRecipe,
}

export default recipeService
