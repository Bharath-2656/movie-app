// src/screens/ViewReview.jsx

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import MovieCard from '../../components/MovieCard/MovieCard'
import ReviewList from '../../components/ReviewList/ReviewList'
import { getMovieById, getReviews } from '../../service/api.service'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ViewReview = () => {
  const [movie, setMovie] = useState()
  const [reviews, setReviews] = useState([])
  const queryParams = new URLSearchParams(location.search)
  const movieId = queryParams.get('id')
  const navigate = useNavigate()
  const currentUser = useMemo(
    () => JSON.parse(localStorage.getItem('user')),
    []
  )

  const fetchMovies = useCallback(async () => {
    try {
      const movieData = await getMovieById(movieId)
      setMovie(movieData)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }, [movieId])

  const fetchReviews = useCallback(async () => {
    try {
      const reviews = await getReviews(movieId)
      setReviews(reviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }, [movieId])

  const hasUserReviewed = useMemo(() => {
    if (!currentUser || !reviews) return false
    return reviews.some((review) => review.userId === currentUser.id)
  }, [currentUser, reviews])

  useEffect(() => {
    fetchMovies()
    fetchReviews()
  }, [fetchMovies, fetchReviews])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div>
      <div className="logout-container">
        <button
          className="back-arrow"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
        <Button label="Logout" className="logout-btn" onClick={handleLogout} />
      </div>
      <h1>Movie Reviews</h1>
      {!movie ? (
        <p>No movies found.</p>
      ) : (
        <div>
          <div className="movie-card-container">
            <MovieCard
              {...movie}
              type={'review-page'}
              refreshMovies={fetchMovies}
              hasUserReviewed={hasUserReviewed}
            />
            <ReviewList reviews={reviews || []} refreshReviews={fetchReviews} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewReview
