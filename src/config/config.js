const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL,
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL,
  },
}

const environment = process.env.NODE_ENV || 'development'

export default config[environment]