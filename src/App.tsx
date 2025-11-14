import './App.css'
import { useEffect, useState } from 'react'
import MainLayout from './pages/MainLayout'
import Login from './pages/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'))

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
    }
  }, [])

  return (
    <>
      {isAuthenticated ? (
        <MainLayout />
      ) : (
        <Login onLoggedIn={() => {
          setIsAuthenticated(true)
          localStorage.setItem('isAuthenticated', 'true')
        }} />
      )}
    </>
  )
}

export default App
