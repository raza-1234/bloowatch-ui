import './App.css';
import React, { useEffect, useState } from 'react';
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
import ProductDetail from './components/ProductDetail';
import DashboardContext from './context/DashboardContext';
import { CartList } from './types/types';
import { AxiosResponse } from 'axios';
import api from './axios/api';
import useAuth from './hooks/useAuth';
import { tokenInfo } from './utils/tokenInfo';
// import CartContext from './context/CartContext';
// import CartContext from './context/CartContext';

function App() {

  const {auth}: any = useAuth()
  
  const [cartList, setCartList] = useState<CartList[]>([])
  const handleCartList = (data: CartList[]) => {
    setCartList(data)
  }

  useEffect(() => {
    if (auth){
      const {access_token, decoded_token}:any = tokenInfo();
      fetchCartProducts(decoded_token.userId);
    }
  }, [auth])

  const fetchCartProducts = async (userId: number): Promise<void> => {
    try {
      const response: AxiosResponse = await api.get(`cart/getAllCartProducts/${userId}`, {headers: {"Authorization" : `Bearer ${auth.token}`} })
      handleCartList(response.data)
    } catch (err: any){
      console.log(err);
    }
  }

  return (
    <div className="App">
      {/* <CartContext> */}
        <Header
          cartList = {cartList}
        />
      {/* </CartContext> */}
      <ToastContainer/>
        <Routes>
          <Route path='' element={<Layout/>}>

            {/* public routes */}
            <Route path = "/register" element={ <RegisterUser/> }/>
            <Route path = "/" element={ <LoginUser/> }/>
            <Route path = "/verify_email/:id" element={ <VerifyUser/> }/>
            
            {/* protected routes */}
            <Route element={ <RequireAuth/> }>

              <Route path = "/cart" element={ 
                // <CartContext>
                  <Cart
                  cartList = {cartList}
                  handleCartList = {handleCartList}
                  fetchCartProducts = {fetchCartProducts}
                  /> 
                // </CartContext>
                }
              />

              <Route path = "/shop" element={
                <DashboardContext>
                  <Dashboard 
                    fetchCartProducts = {fetchCartProducts}
                  />
                </DashboardContext>
                }
              />
              <Route path = "/product-detail/:id" element = {
                <DashboardContext>
                  <ProductDetail fetchCartProducts = {fetchCartProducts}/>
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
