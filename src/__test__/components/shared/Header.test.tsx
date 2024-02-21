import React from 'react';
import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import Header from '../../../components/shared/Header';
import { BrowserRouter } from 'react-router-dom';
import AuthData, {AuthProvider} from '../../../context/AuthProvider';
import {CartProvider} from '../../../context/CartContext';

// jest.mock('../../../context/AuthProvider', () => ({
  // ...jest.requireActual("../../../context/AuthProvider"),

  // default: ({AuthData: jest.fn()})
  // AuthData: jest.fn().mockReturnValue({
  //   userData: {},
  //   setUserData: jest.fn(),
  //   getUserData: jest.fn()
  // })
// }));

  // AuthData: jest.fn().mockReturnValue({
  //   userData: {},
  //   setUserData: jest.fn(),
  //   getUserData: jest.fn()
  // })



// jest.mock('../../../context/CartContext', () => ({
//   ...jest.requireActual("../../../context/CartContext"),
//   CartContextData: jest.fn().mockReturnValue({ 
//     cart: {
//       cartData: [],
//       count: 0
//     },
//     fetchCartProducts: jest.fn()
//   })
// }));


// jest.mock('../../../context/AuthProvider', () => ({
//   __esModule: true, 
//   default: jest.fn(() => ({
//     userData: {
//       accessToken: 'mockAccessToken',
//       name: 'Mock User',
//     },
//     setUserData: jest.fn(),
//   })),
// }));

// jest.mock('../../../context/CartContext', () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     cart: {
//       cartData: [],
//       cartCount: 0,
//     },
//   })),
// }));

const mockUserData = {
  accessToken: "fakeToken",
  email: "fakeEmail@gmail.com",
  id: 1,
  name: "fake name",
}

const buildApp = () => {
  return (
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Header/>  
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    )
  )
}

describe("Header", () => {

  it("should render successfully", () => {
    // mockAuthData.mockReturnValueOnce({getUserData: jest.fn(), userData: {
    //   accessToken: "fakeToken",
    //   email: "fakeEmail@gmail.com",
    //   id: 1,
    //   name: "fake name",
    // }, setUserData: jest.fn() })

    const {container} = buildApp();

    expect(container).toMatchSnapshot(); 
    // const { result, waitForTheNextUpdate } = renderHook(() => AuthData());
    // console.log('result', result.current.getUserData({
    //   accessToken: "fakeToken",
    //   email: "fakeEmail@gmail.com",
    //   id: 1,
    //   name: "fake name",
    ;

    // act(() => {
    //   mount<Header>
    // })
 
    // const header_wrapper = screen.getByTestId("header_wrapper");
    // const header_content = screen.getByTestId("header_content")

    // expect(header_wrapper).toBeInTheDocument();
    // expect(header_wrapper).toHaveClass("bloowatch-header__wrapper");
    // expect(header_content).toBeInTheDocument();
    // expect(header_content).toHaveClass("bloowatch-header__content");
  }) 
 
  // it("should render bloowatch logo", () => {
  //   buildApp();

  //   const logo = screen.getByTestId("logo");
  //   const images = screen.getAllByRole("img")

  //   expect(logo).toBeInTheDocument();
  //   expect(logo).toHaveClass("bloowatch-header__logo");
  //   expect(images[0]).toHaveProperty("alt", "logo");
  //   expect(images[0]).toHaveProperty("src", "http://localhost/logo.png");
  //   fireEvent.click(images[0]);
  //   expect(window.location.pathname).toBe("/shop");
  // })

  // it("should render headers menu", () => {
  //   buildApp();

  //   const header_menu = screen.getByTestId("header_menu");
  //   const hamburger_menu = screen.getByTestId("hamburger_menu");
  //   const hamburger_menu_icon = screen.getByTestId("hamburger_menu_icon");
  //   const shopPage = screen.getByText("Shop");
  //   const registerPage = screen.getByText("Register");
  //   const loginPage = screen.getByText("Login");

  //   expect(header_menu).toBeInTheDocument();
  //   expect(hamburger_menu).toBeInTheDocument();
  //   expect(hamburger_menu_icon).toBeInTheDocument();
  //   expect(shopPage).toBeInTheDocument();
  //   expect(registerPage).toBeInTheDocument();
  //   expect(loginPage).toBeInTheDocument();

  //   expect(header_menu).toHaveClass("bloowatch-header__nav-list");
  //   expect(hamburger_menu).toHaveClass("bloowatch-header__mobile-view");

  //   fireEvent.click(shopPage);
  //   expect(window.location.pathname).toBe("/shop");

  //   fireEvent.click(registerPage);
  //   expect(window.location.pathname).toBe("/register");

  //   fireEvent.click(loginPage);
  //   expect(window.location.pathname).toBe("/");

  //   fireEvent.click(hamburger_menu_icon);
  //   const mobile_screen_wrapper = screen.getByTestId("mobile_screen_wrapper");
  //   expect(header_menu).toHaveClass("bloowatch-header__mobile-menu");
  //   expect(mobile_screen_wrapper).toBeInTheDocument();
  //   expect(mobile_screen_wrapper).toHaveClass("bloowatch-mobile-screen__wrapper");
  // })

  // it("should do whatever i say", () => {
  //   const { container } = buildApp();
    
  //   expect(container).toMatchSnapshot();
  //   expect(AuthData).toHaveBeenCalled();
  // })
 
})