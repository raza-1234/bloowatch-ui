import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import Missing from './components/shared/Missing';
import VerifyUser from './components/VerifyUser'; 
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {

  const [isLogIn, setIsLogIn] = useState(false)

  function handleLogin(value: boolean): void {
    setIsLogIn(value)
  }

  return (
    <div className="App">
      <Header isLogIn = {isLogIn}/>
      <ToastContainer/>
      <main className='main-content'>
        <Routes>
          <Route 
            path = "/register" 
            element={
              <RegisterUser
              />
            }
          />
          <Route 
            path = "/" 
            element={
              <LoginUser
                handleLogin={handleLogin}
              />
            }
          />
          <Route 
            path = "/verify_email/:id" 
            element={
              <VerifyUser/>
            }
          />
          <Route 
            path = "/shop" 
            element={
              <Dashboard/>
            }
          />
          <Route
            path='*'
            element = {<Missing/>}
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
