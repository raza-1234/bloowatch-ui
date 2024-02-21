import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditUser from "../../../components/user/EditUser"
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthProvider';
import { CartProvider } from "../../../context/CartContext"
import { ModalName } from '../../../types/types';

const buildApp = () => {
  return (
    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <EditUser/>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    )
  )
}

describe("EditUser", () => {

  it("should render successfully", () => {
    buildApp();

    const form__wrapper = screen.getByTestId("form__wrapper");
    const form = screen.getByTestId("form");

    expect(form__wrapper).toBeInTheDocument();
    expect(form__wrapper).toHaveClass("bloowatch-edit-user__wrapper"); //selecting with class giving an erorr in development...
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("bloowatch-edit-user__form");
    expect(screen.getByRole("heading", {name: ModalName.EDIT_USER})).toBeInTheDocument();
  })

  it("should render form input fields", () => {
    const { container } = buildApp();

    expect(container).toMatchSnapshot();
  })

})