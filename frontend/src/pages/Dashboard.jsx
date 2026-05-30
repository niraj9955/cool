import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { userService } from '../../services/api'
import './Dashboard.css'

function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await userService.getUserStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const isAdmin = localStorage.getItem('userRole') === 'admin'

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.fullName || 'User'}!</h1>
        <p>Here's what's happening with your account</p>
      </div>

      <div className="dashboard-grid">
        {/* Welcome Card */}
        <div className="dashboard-card welcome-card">
          <h2>👋 Welcome to Data-Analogy</h2>
          <p>You're successfully logged in. Explore our platform and manage your account.</p>
          {isAdmin && (
            <Link to="/admin" className="btn-primary">Go to Admin Panel</Link>
          )}
        </div>

        {/* Profile Card */}
        <div className="dashboard-card profile-card">
          <h3>Your Profile</h3>
          <div className="profile-info">
            <div className="avatar">{user?.fullName?.charAt(0) || 'U'}</div>
            <div>
              <p><strong>Name:</strong> {user?.fullName || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>Role:</strong> {user?.role || 'User'}</p>
            </div>
          </div>
          <Link to="/profile" className="btn-secondary">Edit Profile</Link>
        </div>

        {/* Activity Card */}
        <div className="dashboard-card activity-card">
          <h3>Recent Activity</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="activity-list">
              <li>✅ Account created</li>
              <li>✅ Last login: Today</li>
              <li>✅ Profile viewed</li>
            </ul>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card actions-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/services">Browse Services</Link>
            <Link to="/contact">Contact Support</Link>
            <Link to="/settings">Account Settings</Link>
            {isAdmin && <Link to="/admin/users">Manage Users</Link>}
          </div>
        </div>

        {/* Stats Card - Admin Only */}
        {isAdmin && (
          <div className="dashboard-card stats-card full-width">
            <h3>Platform Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats?.totalUsers || 0}</span>
                <span className="stat-label">Total Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats?.totalServices || 0}</span>
                <span className="stat-label">Services</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats?.totalLeads || 0}</span>
                <span className="stat-label">Leads</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats?.revenue || '$0'}</span>
                <span className="stat-label">Revenue</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
