import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { websiteService } from '../services/api'
import './Footer.css'

function Footer() {
  const [settings, setSettings] = useState(null)

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

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>{settings?.companyName || 'Data-Analogy'}</h3>
          <p>{settings?.tagline || 'Building Digital Excellence'}</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="contact-info">
            <li>📍 {settings?.address || '123 Business St, City'}</li>
            <li>📞 {settings?.phone || '+1 234 567 8900'}</li>
            <li>✉️ {settings?.email || 'info@data-analogy.com'}</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to our newsletter for updates</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {settings?.companyName || 'Data-Analogy'}. All rights reserved.</p>
        <p>{settings?.footerText || 'Powered by Data-Analogy Platform'}</p>
      </div>
    </footer>
  )
}

export default Footer
