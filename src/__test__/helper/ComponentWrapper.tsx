import React from 'react';
import { AuthProvider } from '../../client/context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../client/context/CartContext';

const BuildApp = ({children}: any) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default BuildApp; 