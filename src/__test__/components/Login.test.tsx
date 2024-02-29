import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import LoginUser from '../../client/components/LoginUser';
import api from '../../client/axios/api';
import { validationError } from '../../client/utils/validationError';
import { jwtDecode } from 'jwt-decode';
import { buildMockCartResponse } from '../helper/Util';
import { errorAlert } from '../../client/utils/toast';
import { AxiosResponse } from 'axios';

jest.mock("../../client/utils/toast", () => ({
  errorAlert: jest.fn()
}))

jest.mock("../../client/utils/validationError", () => ({
  validationError: jest.fn()
}))

jest.mock("../../client/axios/api",  () => ({
  get: jest.fn(),
  post: jest.fn()
}))

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn()
}))

describe("LoginUser", () => {
  let mockCartResponse: AxiosResponse;

  beforeEach(() => {
    mockCartResponse = buildMockCartResponse() as AxiosResponse;
    (api.post as jest.Mock).mockResolvedValue({
      data: {
        accessToken: "mockAccessToken"
      },
      statusText: "OK"
    });

    (api.get as jest.Mock).mockResolvedValue(mockCartResponse);

    (jwtDecode as jest.Mock).mockReturnValue({ userId: 1 });
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should render successfully", async () => {
    await act(async() => {
      render(<LoginUser/>, { wrapper: BuildApp});
    });

    expect(screen.getByTestId("login_wrapper")).toHaveClass("bloowatch-register-login__wrapper");
    expect(screen.getByTestId("login_form")).toHaveClass("bloowatch-register-login__form");
    expect(screen.getByTestId("email_input_wrapper")).toHaveClass("bloowatch-register-login__user-email");
    expect(screen.getByTestId("email_icon")).toHaveClass("bloowatch-register-login__email-icon");
    expect(screen.getByTestId("password_input_wrapper")).toHaveClass("bloowatch-register-login__user-password");
    expect(screen.getByTestId("password_icon")).toHaveClass("bloowatch-register-login__password-icon");
    expect(screen.getByTestId("login_button")).toHaveClass("bloowatch-login-register__button");
    expect(screen.getByTestId("register_link_wrapper")).toHaveClass("bloowatch-login-register__text");
    expect(screen.getByTestId("register_link")).toHaveClass("bloowatch-login-register__link");
  }) 

  it("should not call api when form input field/fields are empty", async () => {
    await act(async() => {
      render(<LoginUser/>, { wrapper: BuildApp});
    });

    const login_button = screen.getByRole("button", { name: "Login" });

    await act(async() => {
      fireEvent.click(login_button);
    })

    expect(validationError).toHaveBeenCalled();
    expect(api.post).not.toHaveBeenCalled();
  })

  it("should call api when form input field/fields are not empty and return an error toast", async () => {
    (api.post as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          message: "Login failed"
        }
      }
    });

    await act(async() => {
      render(<LoginUser/>, { wrapper: BuildApp});
    });

    const login_button = screen.getByRole("button", { name: "Login" });
    const userEmail = screen.getByLabelText("userEmail");
    const userPassword = screen.getByLabelText("userPassword");

    fireEvent.change(userEmail, {target: {value: "fakeEmail@gmail.com"}});
    fireEvent.change(userPassword, {target: {value: "1234"}});
     
    await act(async() => {
      fireEvent.click(login_button);
    })
 
    expect(api.post).toHaveBeenCalledWith("/login", {"email": "fakeEmail@gmail.com", "password": "1234"}); 
    expect(errorAlert).toHaveBeenCalled();
    expect(window.location.pathname).toBe("/");
  }) 
 
  it("should call api when form input field/fields are not empty", async () => {
    await act(async() => {
      render(<LoginUser/>, { wrapper: BuildApp});
    });

    const login_button = screen.getByRole("button", { name: "Login" });
    const userEmail = screen.getByLabelText("userEmail");
    const userPassword = screen.getByLabelText("userPassword");
    const control_password_visibility = screen.getByTestId("control_password_visibilty");

    fireEvent.change(userEmail, {target: {value: "fakeEmail@gmail.com"}});
    fireEvent.change(userPassword, {target: {value: "1234"}});

    expect(screen.getByDisplayValue("fakeEmail@gmail.com"));
    expect(control_password_visibility).toHaveTextContent("Show");
    expect(userPassword).toHaveProperty("type", "password");

    fireEvent.click(control_password_visibility);
     
    expect(control_password_visibility).toHaveTextContent("Hide");
    expect(userPassword).toHaveProperty("type", "text"); 

    await act(async() => {
      fireEvent.click(login_button);
    })
 
    expect(api.post).toHaveBeenCalledWith("/login", {"email": "fakeEmail@gmail.com", "password": "1234"}); 
    expect(window.location.pathname).toBe("/shop");
  })

  it("should navigate to register page onClick register link", async () => {
    await act(async() => {
      render(<LoginUser/>, { wrapper: BuildApp});
    });

    const register_link = screen.getByText("Register");

    fireEvent.click(register_link); 

    expect(window.location.pathname).toBe("/register");
  })

})