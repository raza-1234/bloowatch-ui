import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../../../client/components/shared/Layout';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../client/context/AuthProvider';
import { CartProvider } from '../../../client/context/CartContext';

jest.mock('../../../client/components/shared/Header', () => () => (
  <div data-testid='Header'>Header</div>
))

jest.mock('../../../client/components/shared/Footer', () => () => (
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