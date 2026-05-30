import React from 'react'
import { NavLink } from 'react-router-dom'
import './AdminSidebar.css'

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Data-Analogy</h2>
        <p>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin" end>
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/users">
          👥 Users
        </NavLink>
        <NavLink to="/admin/services">
          🛠️ Services
        </NavLink>
        <NavLink to="/admin/team">
          👨‍💼 Team
        </NavLink>
        <NavLink to="/admin/testimonials">
          💬 Testimonials
        </NavLink>
        <NavLink to="/admin/leads">
          📧 Leads
        </NavLink>
        <NavLink to="/admin/website-settings">
          ⚙️ Website Settings
        </NavLink>
        <NavLink to="/admin/seo-settings">
          🔍 SEO Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/">
          🏠 Back to Site
        </NavLink>
        <button 
          onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('userRole')
            window.location.href = '/login'
          }}
          className="logout-btn"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
