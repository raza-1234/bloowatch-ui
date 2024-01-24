import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import AuthData from '../../context/AuthProvider';

const RequireAuth = () => {
  const { userData: { accessToken } } = AuthData();
  const location = useLocation();  

  return (
    <div>
      {
        accessToken ?
          <Outlet/>
          :<Navigate to="/" state = {{from: location}} replace/>
      }
    </div>
  )
}
export default RequireAuth
