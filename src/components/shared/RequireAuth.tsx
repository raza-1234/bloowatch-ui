import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = () => {
  const { auth }: any = useAuth();
  const location = useLocation();  

  return (
    <div>
      {
        auth?.userEmail?
          <Outlet/>
          :<Navigate to="/" state = {{from: location}} replace/>
      }
    </div>
  )
}
export default RequireAuth
