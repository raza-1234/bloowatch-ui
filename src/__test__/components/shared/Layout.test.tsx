import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../../../components/shared/Layout';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthProvider';
import { CartProvider } from '../../../context/CartContext';

jest.mock('../../../components/shared/Header', () => () => (
  <div data-testid='Header'>Header</div>
))

jest.mock('../../../components/shared/Footer', () => () => (
  <div data-testid='Footer'>Footer</div>
))

const buildApp = () => {
  return (
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Layout/>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    )
  )
}

describe("Layout", () => {

  it("should render successfully", () => {
    buildApp();
    const main = screen.getByTestId("main");
    const outlet_container = screen.getByTestId("outlet_container");

    expect(main).toBeInTheDocument();
    expect(screen.getByTestId("Header")).toBeInTheDocument();
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
    expect(outlet_container).toBeInTheDocument();
    expect(outlet_container).toHaveClass("main-content");
  })

}) 