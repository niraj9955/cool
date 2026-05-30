import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

function AdminLayout() {
  const isAdmin = localStorage.getItem('userRole') === 'admin'
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
