import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuthData from '../../context/AuthProvider';

const RequireAuth = () => {
  const { userData: { accessToken } } = useAuthData();
  const location = useLocation();  

  return (
    <React.Fragment>
      {
        accessToken ?
          <Outlet/>
          :<Navigate to="/" state = {{from: location}} replace/>
      }
    </React.Fragment>
  )
}
export default RequireAuth;
