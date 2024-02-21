import React from 'react';
import { render, act, renderHook,screen } from '@testing-library/react';
import api from '../../../axios/api';
import { AxiosResponse } from 'axios';
import { jwtDecode } from "jwt-decode";
import useAuthData, { AuthProvider } from '../../../context/AuthProvider';
import Header from '../../../components/shared/Header';
import { CartProvider } from '../../../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../axios/api', () => ({
  get: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  // it('fetches user data when access token is present', async () => {
  //   // Mock API response
  //   const mockUserData = {
  //     id: 1,
  //     name: 'Test User',
  //     email: 'test@example.com',
  //   };
  //   const mockResponse: AxiosResponse = { data: mockUserData } as AxiosResponse;
  //   (api.get as jest.Mock).mockResolvedValue(mockResponse);
  //   const userId = { userId: 1};
  //   const accessToken = 'mockAccessToken';
  //   localStorage.setItem('access_token', accessToken);
  //   (jwtDecode as jest.Mock).mockReturnValue(userId)

  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <AuthProvider>
  //           <CartProvider>
  //           <Header/>
  //           </CartProvider>
  //         </AuthProvider>
  //       </BrowserRouter>
  //     );
  //   });

  //   expect(screen.queryByTestId('header_wrapper')).toMatchSnapshot();
  //   expect(api.get).toHaveBeenCalledWith('http://localhost:3500/user-detail/1', {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  // });

  it('throws error when useAuthData is used outside AuthProvider', () => {
    const wrapper = ({ children }: any) => 
      <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>;

    const { result } = renderHook(() => useAuthData(), { wrapper });
  });
});
