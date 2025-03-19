import axiosInstance from '../config/axiosConfig'

export const getMovies = async () => {
  try {
    const response = await axiosInstance.get('/movies')
    return response.data
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

export const getMovieById = async (movieId) => {
}

export const createMovie = async (movieData) => {
}

export const updateMovie = async (movieId, movieData) => {
}

export const deleteMovie = async (movieId) => {
}

export const addReview = async (reviewData) => {
}

export const getReviews = async (movieId) => {
}
export const editReview = async (reviewId, data) => {
}

export const deleteReview = async (reviewId) => {
}

export const loginUser = async (email, password) => {
}

export const registerUser = async (username, email, password) => {
}
