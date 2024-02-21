import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom"
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import Missing from './components/shared/Missing';
import VerifyUser from './components/VerifyUser'; 
import Dashboard from './components/Dashboard';
import Layout from './components/shared/Layout';
import RequireAuth from './components/shared/RequireAuth';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import EditUser from './components/user/EditUser';

function App() {

  return ( 
    <div data-testId = "app" className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>

            <Route path = "register" element={ <RegisterUser/> }/>
            <Route path = "/" element={ <LoginUser/> }/>
            <Route path = "verify_email/:id" element={ <VerifyUser/> }/>
            
            <Route element={ <RequireAuth/> }>

              <Route path = "cart" element={ <Cart/> }/>
              <Route path = "shop" element={ <Dashboard/> }/>
              <Route path = "edit-user" element={ <EditUser/> }/>
              <Route path = "product-detail/:id" element = { <ProductDetail/> }/>
              
            </Route>
            <Route path='*' element = {<Missing/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
