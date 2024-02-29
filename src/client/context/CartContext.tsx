import React, {createContext, useContext, useEffect, useState} from "react";
import { AxiosResponse } from 'axios';
import { Children, CartContextType, CartContextProvider, STATUS_TEXT } from "../types/types";
import api from '../axios/api';
import { jwtDecode } from "jwt-decode";
import useAuthData from "./AuthProvider";

const CartContext = createContext<CartContextProvider | null>(null);

export const CartProvider = ({children}: Children) => {
  const [cart, setCart] = useState<CartContextType>({
    cartData: [],
    cartCount: 0,
  })
  
  const { userData } = useAuthData();

  useEffect(() => {   
    if (userData?.accessToken){
      const { userId }: {userId: number} = jwtDecode(userData?.accessToken);
      if ( userId ) {
        fetchCartProducts(userData?.accessToken, userId)
      }
    } 
  },[userData?.accessToken])

  const fetchCartProducts = async (accessToken?: string, userId?: number): Promise<void> => {
    try {
      const response: AxiosResponse = await api.get(`cart/getAllCartProducts/${userId}`, 
        {
          headers: {"Authorization" : `Bearer ${accessToken}`
        }
      })            
      if (response.statusText === STATUS_TEXT && response.data.length){
        setCart({cartData: response.data, cartCount: response.data.length});
        return;
      }
      setCart({cartData: [], cartCount: 0});
    } catch (err: any){
      console.log(err);
    }
  }

  return (
    <CartContext.Provider value = {{cart, fetchCartProducts}} >
      {children}
    </CartContext.Provider>
  )
}

const useCartContextData = () => {
  const context = useContext(CartContext);
  if(!context) {
    throw new Error('Cart Context Not Setup Properly.')
  }

  return context;
}
export default useCartContextData;


