import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import Home from './screens/Home/Home'
import CreateMovie from './screens/Movies/CreateMovie'
import Login from './screens/Auth/Login/Login'
import Register from './screens/Auth/Register/Register'

import { configureTheme, getTheme } from './theme/theme'
import ViewReview from './screens/Review/ViewReview'

function App() {
  useEffect(() => {
    configureTheme()
  }, [])

  const theme = getTheme()

  return (
    <div
      className="app-container"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: theme.primaryBackground,
        color: theme.text,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review/movie" element={<ViewReview />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
