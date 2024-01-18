import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom"
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import Missing from './components/shared/Missing';
import VerifyUser from './components/VerifyUser'; 
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import Layout from './components/shared/Layout';
import RequireAuth from './components/shared/RequireAuth';
import Cart from './components/Cart';
import EditUser from './components/user/EditUser';
import ProductDetail from './components/ProductDetail';
import DashboardContext from './context/DashboardContext';

function App() {

  return (
    <div className="App">
      <Header/>
      <ToastContainer/>
        <Routes>
          <Route path='' element={<Layout/>}>

            {/* public routes */}
            <Route path = "/register" element={ <RegisterUser/> }/>
            <Route path = "/" element={ <LoginUser/> }/>
            <Route path = "/verify_email/:id" element={ <VerifyUser/> }/>
            
            {/* protected routes */}
            <Route element={ <RequireAuth/> }>
              <Route path = "/cart" element={ <Cart/> }/>
              <Route path = "/edit-user" element={ <EditUser/> }/>

              <Route path = "/shop" element={
                <DashboardContext>
                  <Dashboard/>
                </DashboardContext>
                }
              />
              <Route path = "/product-detail/:id" element = {
                <DashboardContext>
                  <ProductDetail/>
                </DashboardContext>
                }
              />
            </Route>
            
            {/* missing routes */}
            <Route path='*' element = {<Missing/>}/>
            
          </Route>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
