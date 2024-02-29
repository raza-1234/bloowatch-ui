import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import RegisterUser from '../../client/components/RegisterUser';
import api from '../../client/axios/api';
import { validationError } from '../../client/utils/validationError';
import { successAlert, errorAlert } from '../../client/utils/toast';
import Loader from '../../client/components/shared/Loader';

jest.mock("../../client/components/shared/Loader", () => () => <p data-testid = "mock_loader">Mock Loader</p>);

jest.mock("../../client/utils/validationError", () => ({
  validationError: jest.fn()
}));

jest.mock("../../client/utils/toast", () => ({
  successAlert: jest.fn(),
  errorAlert: jest.fn()
}));

jest.mock("../../client/axios/api", () => ({
  post: jest.fn()
}));

describe("RegisterUser", () => {

  beforeEach(() => {
    (api.post as jest.Mock).mockResolvedValue({
      data: {
        message: "Verification code sent to your email."
      },
      statusText: "OK"
    });
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should render successfully", async () => {
    await act(async () => {
      render(<RegisterUser/>, { wrapper: BuildApp })
    })

    expect(screen.getByTestId("register_wrapper")).toHaveClass("bloowatch-register-login__wrapper");
    expect(screen.getByTestId("register_form")).toHaveClass("bloowatch-register-login__form");
    expect(screen.getByTestId("user_name_wrapper")).toHaveClass("bloowatch-register-login__user-name");
    expect(screen.getByTestId("user_name_icon")).toHaveClass("bloowatch-register-login__name-icon");
    expect(screen.getByTestId("user_email_wrapper")).toHaveClass("bloowatch-register-login__user-email");
    expect(screen.getByTestId("user_email_icon")).toHaveClass("bloowatch-register-login__email-icon");
    expect(screen.getByTestId("user_password_wrapper")).toHaveClass("bloowatch-register-login__user-password");
    expect(screen.getByTestId("user_password_icon")).toHaveClass("bloowatch-register-login__password-icon");
    expect(screen.getByTestId("confirm_password_wrapper")).toHaveClass("bloowatch-register-login__user-password");
    expect(screen.getByTestId("confirm_password_icon")).toHaveClass("bloowatch-register-login__password-icon");
    expect(screen.getByTestId("control_password_visibility")).toHaveTextContent("Show");
    expect(screen.getByTestId("control_confirm_password_visibility")).toHaveTextContent("Show");
    expect(screen.getByTestId("confirmation_text")).toHaveClass("bloowatch-login-register__text");
    expect(screen.getByTestId("user_notice_link")).toHaveClass("bloowatch-login-register__link");
    expect(screen.getByTestId("privacy_policy_wrapper")).toHaveClass("auth-form-link");
    expect(screen.getByTestId("register_button_wrapper")).toHaveClass("bloowatch-login-register__button");
    expect(screen.getByTestId("register_button_wrapper")).toHaveClass("bloowatch-login-register__button");
    expect(screen.getByTestId("login_link")).toHaveClass("bloowatch-login-register__link"); 
  })

  it("should not call api when form field/fields are empty", async () => {
    await act(async () => {
      render(<RegisterUser/>, { wrapper: BuildApp })
    })

    const register_button = screen.getByRole("button", { name: "Register"});

    expect(register_button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(register_button);
    })
    
    expect(api.post).not.toHaveBeenCalled();
    expect(validationError).toHaveBeenCalled();
  })

  it("should call api when form fields are not empty", async () => {
    await act(async () => {
      render(<RegisterUser/>, { wrapper: BuildApp })
    })

    const register_button = screen.getByRole("button", { name: "Register"});
    const control_password_visibility = screen.getByTestId("control_password_visibility");
    const control_confirm_password_visibility = screen.getByTestId("control_confirm_password_visibility");

    const userName = screen.getByLabelText("userName");
    const userEmail = screen.getByLabelText("userEmail");
    const userPassword = screen.getByLabelText("userPassword");
    const confirmPassword = screen.getByLabelText("confirmPassword");

    fireEvent.change(userName, {target: {value: "test name"}});
    fireEvent.change(userEmail, {target: {value: "testEmail@gmail.com"}});
    fireEvent.change(userPassword, {target: {value: "1234"}});
    fireEvent.change(confirmPassword, {target: {value: "1234"}});

    expect(control_password_visibility).toHaveTextContent("Show");
    expect(control_confirm_password_visibility).toHaveTextContent("Show");
    expect(userPassword).toHaveProperty("type", "password");
    expect(confirmPassword).toHaveProperty("type", "password");

    fireEvent.click(control_password_visibility);
    fireEvent.click(control_confirm_password_visibility);

    expect(userPassword).toHaveProperty("type", "text");
    expect(confirmPassword).toHaveProperty("type", "text");

    await act(async () => {
      fireEvent.click(register_button);
    })
     
    expect(api.post).toHaveBeenCalledWith("/register",
     {"email": "testEmail@gmail.com", "name": "test name", "password": "1234"});
    expect(successAlert).toHaveBeenCalled();
  })

  it("should return error toast when register endpoint fails", async () => {
    const error = new Error('Fake Error');
    (api.post as jest.Mock).mockRejectedValueOnce(error)

    await act(async () => {
      render(<RegisterUser/>, { wrapper: BuildApp })
    })

    const register_button = screen.getByRole("button", { name: "Register"});

    const userName = screen.getByLabelText("userName");
    const userEmail = screen.getByLabelText("userEmail");
    const userPassword = screen.getByLabelText("userPassword");
    const confirmPassword = screen.getByLabelText("confirmPassword");

    fireEvent.change(userName, {target: {value: "test name"}});
    fireEvent.change(userEmail, {target: {value: "testEmail@gmail.com"}});
    fireEvent.change(userPassword, {target: {value: "1234"}});
    fireEvent.change(confirmPassword, {target: {value: "1234"}});

    await act(async () => {
      fireEvent.click(register_button);
    })
         
    expect(api.post).toHaveBeenCalledWith("/register",
     {"email": "testEmail@gmail.com", "name": "test name", "password": "1234"}); 
    expect(errorAlert).toHaveBeenCalledWith("Please Try again. Something went wrong");
  })

  it("should navigate to login page onClick login link", async () => {
    await act(async () => {
      render(<RegisterUser/>, { wrapper: BuildApp })
    })

    const login_link = screen.getByTestId("login_link");

    fireEvent.click(login_link);
    expect(window.location.pathname).toBe("/"); 
  })
})
  