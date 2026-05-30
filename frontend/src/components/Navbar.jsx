import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { websiteService } from '../services/api'
import './Navbar.css'

function Navbar() {
  const [settings, setSettings] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await websiteService.getSettings()
      setSettings(response.data)
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {settings?.logo ? (
            <img src={settings.logo} alt={settings.companyName} className="logo-image" />
          ) : (
            <span>{settings?.companyName || 'Data-Analogy'}</span>
          )}
        </Link>

        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-signup">Signup</Link>
            </>
          )}
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  )
}

export default Navbar
