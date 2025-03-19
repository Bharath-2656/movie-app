import React, { useState, useCallback, useEffect } from 'react'
import './CreateMovie.css'
import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/Button/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  createMovie,
  getMovieById,
  updateMovie,
} from '../../service/api.service'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const CreateMovie = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const movieId = queryParams.get('id')

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    director: '',
    imageUrl: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Fetch movie details if in edit mode
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movieId) {
        try {
          setLoading(true)
          const data = await getMovieById(movieId)
          setMovie({
            title: data.title || '',
            description: data.description || '',
            releaseYear: data.releaseYear || '',
            genre: data.genre || '',
            director: data.director || '',
            imageUrl: data.imageUrl || '',
          })
        } catch (error) {
          console.error('Failed to fetch movie details:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchMovieDetails()
  }, [movieId])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setErrors({})

      const validationErrors = {}
      if (!movie.title) validationErrors.title = 'Title is required'
      if (!movie.description)
        validationErrors.description = 'Description is required'
      if (
        !movie.releaseYear ||
        isNaN(movie.releaseYear) ||
        movie.releaseYear < 1900 ||
        movie.releaseYear > 2025
      ) {
        validationErrors.releaseYear =
          'Release Year must be a number between 1900 and 2025'
      }
      if (!movie.genre) validationErrors.genre = 'Genre is required'
      if (!movie.director) validationErrors.director = 'Director is required'
      if (!movie.imageUrl) validationErrors.imageUrl = 'Image URL is required'

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      try {
        if (movieId) {
          await updateMovie(movieId, movie)
        } else {
          await createMovie(movie)
        }
        navigate('/home')
      } catch (error) {
        console.error('Failed to submit movie:', error)
      }
    },
    [movie, navigate, movieId]
  )

  const fields = [
    { label: 'Movie Title', name: 'title', type: 'text' },
    { label: 'Description', name: 'description', type: 'text' },
    { label: 'Release Year', name: 'releaseYear', type: 'number' },
    { label: 'Genre', name: 'genre', type: 'text' },
    { label: 'Director', name: 'director', type: 'text' },
    { label: 'Image URL', name: 'imageUrl', type: 'url' },
  ]

  return (
    <div className="create-movie-container">
      <button
        className="back-arrow"
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <AiOutlineArrowLeft size={24} />
      </button>
      <h2 className="create-movie-title">
        {movieId ? 'Edit Movie' : 'Create Movie'}
      </h2>

      {loading ? (
        <p>Loading movie details...</p>
      ) : (
        <form className="create-movie-form" onSubmit={handleSubmit}>
          {fields.map(({ label, name, type }) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <CustomInput
                type={type}
                name={name}
                value={movie[name]}
                onChange={handleInputChange}
                required
                error={errors[name]}
              />
              {errors[name] && (
                <span className="error-message">{errors[name]}</span>
              )}
            </div>
          ))}
          <Button
            label={movieId ? 'Update Movie' : 'Add Movie'}
            type="submit"
            className="submit-button"
          />
        </form>
      )}
    </div>
  )
}

export default CreateMovie
