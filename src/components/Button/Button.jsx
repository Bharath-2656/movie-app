import React from 'react'
import './Button.css' // Import the CSS file for styling
import { getTheme } from '../../theme/theme'

const Button = ({ children, label, onClick, style, className }) => {
  const theme = getTheme()
  return (
    <button
      className={className}
      style={{
        backgroundColor: theme.primary,
        color: theme.primaryBackground,
        ...style,
      }}
      children={children}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
