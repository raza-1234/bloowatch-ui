import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom"
import LoginUser from './client/components/LoginUser';
import RegisterUser from './client/components/RegisterUser';
import Missing from './client/components/shared/Missing';
import VerifyUser from './client/components/VerifyUser'; 
import Dashboard from './client/components/Dashboard';
import Layout from './client/components/shared/Layout';
import RequireAuth from './client/components/shared/RequireAuth';
import Cart from './client/components/Cart';
import ProductDetail from './client/components/ProductDetail';
import EditUser from './client/components/user/EditUser';

function App() {

  return ( 
    <div data-testid = "app" className="App">
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
