import React from 'react'
import { Link } from 'react-router-dom'
import './SimplePages.css'

function Profile() {
  return (
    <div className="simple-page">
      <h1>Profile Settings</h1>
      <p>Manage your profile information here.</p>
      <Link to="/dashboard" className="btn-back">← Back to Dashboard</Link>
    </div>
  )
}

function Settings() {
  return (
    <div className="simple-page">
      <h1>Account Settings</h1>
      <p>Configure your account preferences.</p>
      <Link to="/dashboard" className="btn-back">← Back to Dashboard</Link>
    </div>
  )
}

export { Profile, Settings }
