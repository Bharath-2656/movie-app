import React, { useState } from 'react'
import './ConfirmationModal.css'

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  const [confirming, setConfirming] = useState(false)

  const handleConfirmClick = () => {
    setConfirming(true)
    console.log('Confirming.....')
    setTimeout(() => {
      onConfirm()
      onClose()
    }, 100)
  }

  if (!open) return null

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2 className="delete-modal-title">{title}</h2>
        <p className="delete-modal-text">{description}</p>
        <div className="delete-modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="confirm-button"
            onClick={handleConfirmClick}
            disabled={confirming}
          >
            {confirming ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
