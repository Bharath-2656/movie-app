// theme.js

export const getTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return theme.theme.dark
  }
  return theme.theme.light
}

export const theme = {
  theme: {
    light: {
      text: '#121212',
      border: '#D1D1D1',
      primary: '#F5C518', // IMDB yellow
      primaryHover: '#e0b900',
      primaryBackground: '#FFFFFF',
      sidePanelBackground: '#F5F5F5',
      secondaryBackground: '#EFEFEF',
      error: '#DC3545',
      errorBackground: '#F8D7DA',
      success: '#28A745',
      successBackground: '#D4EDDA',
      warning: '#FFC107',
      warningBackground: '#FFF3CD',
      neutral: '#6C757D',
      neutralBackground: '#E2E3E5',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      text: '#FFFFFF',
      border: '#333333',
      primary: '#F5C518', // IMDB yellow
      primaryHover: '#e0b900',
      primaryBackground: '#121212',
      sidePanelBackground: '#1A1A1A',
      secondaryBackground: '#2A2A2A',
      error: '#FF6B6B',
      errorBackground: '#3B1E1E',
      success: '#28A745',
      successBackground: '#153B24',
      warning: '#FFC107',
      warningBackground: '#4A3A10',
      neutral: '#999999',
      neutralBackground: '#3C3C3C',
      shadow: 'rgba(0, 0, 0, 0.4)',
    },
    vibrant: {
      text: '#212529',
      border: '#CED4DA',
      primary: '#F5C518',
      primaryHover: '#e0b900',
      primaryBackground: '#FFFFFF',
      sidePanelBackground: '#FAFAFA',
      secondaryBackground: '#F3F4F6',
      error: '#E74C3C',
      errorBackground: '#FDEDEC',
      success: '#27AE60',
      successBackground: '#E9F7EF',
      warning: '#F1C40F',
      warningBackground: '#FCF3CF',
      neutral: '#95A5A6',
      neutralBackground: '#ECF0F1',
      shadow: 'rgba(0, 0, 0, 0.15)',
    },
  },
}

const applyTheme = (themeName = 'light') => {
  const themeVariables = theme.theme[themeName] || theme.theme.light
  Object.keys(themeVariables).forEach((key) => {
    document.documentElement.style.setProperty(`--${key}`, themeVariables[key])
  })
}

export const configureTheme = () => {
  // Apply the default theme based on system preferences
  const themeName = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
  applyTheme(themeName)

  // Optional: Add a listener for theme changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      applyTheme(e.matches ? 'dark' : 'light')
    })
}
