import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaEye, FaPen, FaTrashAlt } from 'react-icons/fa'
import './MovieCard.css'
import Review from '../Review/Review'
import DeleteConfirmationModal from '../ConfirmationModel/ConfirmationModal'
import { deleteMovie } from '../../service/api.service'

const MovieCard = ({
  id,
  title,
  description,
  releaseYear,
  genre,
  director,
  imageUrl,
  type,
  refreshMovies,
  hasUserReviewed,
}) => {
  const userData = JSON.parse(localStorage.getItem('user')) || null
  const role = userData?.role
  const navigate = useNavigate()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    const userData = JSON.parse(localStorage.getItem('user')) || null
    if (!userData) {
      // Not logged in: redirect to login
      navigate('/login')
    } else {
      setIsModalOpen(true)
    }
  }

  const handleOpenDelete = () => {}
  const handleCloseDelete = () => setOpenDeleteModal(false)

  const handleDelete = async () => {
  }

  const onDelete = async (movieId) => {
    try {
      await deleteMovie(movieId)
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  const handleEdit = () => {
  }

  return (
    <div className="movie-card">
      <div className="movie-card-left">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="movie-card-image" />
        )}
        <div className="movie-card-title">{title}</div>
      </div>

      <div className="movie-card-right">
        <p className="movie-card-description">{description}</p>
        <p>
          <strong>Release Year:</strong> {releaseYear}
        </p>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>Director:</strong> {director}
        </p>

        <div className="review-button-container">
          {!hasUserReviewed && (
            <button className="review-button" onClick={openModal}>
              <FaPen /> Add Review
            </button>
          )}
        </div>

        {isModalOpen && (
          <Review
            movieId={id}
            setIsModalOpen={setIsModalOpen}
            review={undefined}
          />
        )}


          <div className="movie-card-actions">
            <button className="edit-button" onClick={handleEdit}>
              <FaEdit /> Edit
            </button>
            <button className="delete-button" onClick={handleOpenDelete}>
              <FaTrashAlt /> Delete
            </button>
          </div>
      </div>

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        title={'Delete Movie'}
        description={'Are you sure you want to delete this movie?'}
      />
    </div>
  )
}

export default MovieCard
