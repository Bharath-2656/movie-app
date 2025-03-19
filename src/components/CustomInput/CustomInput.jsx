import React from 'react'
import './CustomInput.css'
import { getTheme } from '../../theme/theme'

const CustomInput = ({
  name,
  label,
  type,
  value,
  onChange,
  required,
  error,
  style,
}) => {
  const theme = getTheme()

  return (
    <div className="custom-input" style={style}>
      {type === 'textarea' ? (
        <textarea
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={label}
          style={{
            width: '100%',
            borderRadius: '8px',
            borderColor: theme.secondaryBackground,
            color: theme.primary,
            backgroundColor: theme.secondaryBackground,
            ...(error ? { borderColor: 'red', borderWidth: '2px' } : {}),
          }}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={label}
          style={{
            borderColor: theme.primary,
            color: theme.primary,
            backgroundColor: theme.secondaryBackground,
            ...(error ? { borderColor: 'red', borderWidth: '2px' } : {}),
          }}
        />
      )}
    </div>
  )
}

export default CustomInput
