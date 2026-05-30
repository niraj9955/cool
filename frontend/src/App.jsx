import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'

// User Protected Pages
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageServices from './pages/admin/ManageServices'
import ManageUsers from './pages/admin/ManageUsers'
import ManageTeam from './pages/admin/ManageTeam'
import ManageTestimonials from './pages/admin/ManageTestimonials'
import ManageContactMessages from './pages/admin/ManageContactMessages'
import WebsiteSettings from './pages/admin/WebsiteSettings'
import SEOSettings from './pages/admin/SEOSettings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* User Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="leads" element={<ManageContactMessages />} />
          <Route path="website-settings" element={<WebsiteSettings />} />
          <Route path="seo-settings" element={<SEOSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
