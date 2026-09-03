import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// Wrap the login/register/forgot-password routes with this so someone
// who's already signed in gets bounced straight to the notes home instead
// of seeing the login form again.
const PublicRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicRoute
