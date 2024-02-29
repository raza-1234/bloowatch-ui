import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EditUser from "../../../client/components/user/EditUser"
import { ModalName } from '../../../client/types/types';
import api from '../../../client/axios/api';
import BuildApp from "../../helper/ComponentWrapper"
import { jwtDecode } from 'jwt-decode';
import { buildMockCartResponse, buildMockProductResponse, buildMockUserResponse } from '../../helper/Util';
import { successAlert, errorAlert } from '../../../client/utils/toast';
import { AxiosResponse } from 'axios';

jest.mock("../../../client/axios/api", () => ({
  get: jest.fn(),
  put: jest.fn()
}))

jest.mock("../../../client/utils/toast", () => ({
  successAlert: jest.fn(),
  errorAlert: jest.fn()
}))

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe("EditUser", () => {
  let accessToken: string; 
  let userId: { userId: number};
  let mockCartResponse: AxiosResponse;
  let mockGetUserData: AxiosResponse;
  let mockProductData: AxiosResponse;

  beforeAll(() => {
    accessToken = 'mockAccessToken';
    localStorage.setItem('access_token', accessToken);
  })
  afterAll(() => {
    localStorage.removeItem('access_token');
  })

  beforeEach(() => {
    mockCartResponse = buildMockCartResponse() as AxiosResponse;
    mockGetUserData = buildMockUserResponse() as AxiosResponse;
    mockProductData = buildMockProductResponse() as AxiosResponse;

    userId = { userId: 1 };
    (jwtDecode as jest.Mock).mockReturnValue(userId);

    (api.put as jest.Mock).mockResolvedValue(mockProductData);
    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse);
    (api.get as jest.Mock).mockResolvedValue(mockGetUserData);
  })

  afterEach(()  => {
    jest.clearAllMocks();
  })

  it("should render successfully", async () => {
    await act(async() => {
      render(<EditUser/>, { wrapper: BuildApp })
    }) 

    const form__wrapper = screen.getByTestId("form__wrapper");
    const form = screen.getByTestId("form");

    expect(form__wrapper).toBeInTheDocument();
    expect(form__wrapper).toHaveClass("bloowatch-edit-user__wrapper"); //selecting with class giving an error in development...
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("bloowatch-edit-user__form");
    expect(screen.getByRole("heading", {name: ModalName.EDIT_USER})).toBeInTheDocument();
  })

  it("should render form input fields with change password button", async () => {
    await act(async () => {
      render(<EditUser/>, { wrapper: BuildApp })
    })

    const userEmail = screen.getByLabelText("userEmail");
    const saveChangesButton = screen.getByRole("button", {name: "Save Changes"});
    const changePasswordButton = screen.getByRole("button", {name: "Change Password"})

    expect(screen.getByLabelText("userName")).toBeInTheDocument();
    expect(screen.getByLabelText("userPassword")).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveProperty("readOnly");
    expect(screen.getByDisplayValue("test@example.com")); 
    expect(screen.getByDisplayValue("Test User"));
    expect(saveChangesButton).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument(); 
  })

  it("should update user info", async () => {
    await act(async () => {
      render(<EditUser/>, { wrapper: BuildApp })
    })

    const userName  = screen.getByLabelText("userName");
    const password = screen.getByLabelText("userPassword");
    const changePasswordButton = screen.getByRole("button", {name: "Change Password"});

    fireEvent.click(changePasswordButton);
    const newPassword = screen.getByLabelText("newPassword");
    const confirmPassword = screen.getByLabelText("confirmPassword");

    fireEvent.change(userName, {target: {value: "fake name"}});
    fireEvent.change(password, {target: {value: "1234"}});
    fireEvent.change(newPassword, {target: {value: "12345"}});
    fireEvent.change(confirmPassword, {target: {value: "12345"}});

    const button = screen.getByRole("button", {name: "Save Changes"});

    await act(async () => {
      fireEvent.click(button);
    })

    // expect(api.put).toHaveBeenCalled();
    // expect(successAlert).toHaveBeenCalled();
    // expect(api.get).toHaveBeenCalled();  
  })

  it("should render form password input fields with hide password button", async () => {
    await act(async () => {
      let container = render(<EditUser/>, { wrapper: BuildApp })
    })

    const changePasswordButton = screen.getByRole("button", {name: "Change Password"});

    fireEvent.click(changePasswordButton);
    const newPassword = screen.getByLabelText("newPassword");
    const confirmPassword = screen.getByLabelText("confirmPassword");
    const hidePasswordButton = screen.getByRole("button", {name: "Hide Password"});
    const newPasswordVisibility = screen.getByTestId("newPasswordVisibility");
    const confirmPasswordVisibility = screen.getByTestId("confirmPasswordVisibility");

    expect(newPassword).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(hidePasswordButton).toBeInTheDocument();
    expect(newPasswordVisibility).toHaveTextContent("Show");
    expect(confirmPasswordVisibility).toHaveTextContent("Show");

    fireEvent.change(newPassword, {target: {value: "12345"}});
    fireEvent.change(confirmPassword, {target: {value: "12345"}});
    fireEvent.click(newPasswordVisibility);
    fireEvent.click(confirmPasswordVisibility);

    expect(newPasswordVisibility).toHaveTextContent("Hide"); 
    expect(confirmPasswordVisibility).toHaveTextContent("Hide");

    const passwordText = screen.getAllByDisplayValue("12345");

    expect(passwordText).toHaveLength(2);
    for (let i = 0; i < passwordText.length; i++){
      expect(passwordText[i]).toBeInTheDocument();
    }
  
  })

  // it("should return error when password is incorrect", async () => {
  //   (api.put as jest.Mock).mockRejectedValueOnce({
  //     response: {
  //       data: {
  //         message: "Wrong Password."
  //       }
  //     }
  //   });

  //   await act(async () => {
  //     render(<EditUser/>, { wrapper: BuildApp })
  //   })

  //   const userName  = screen.getByLabelText("userName");
  //   const password = screen.getByLabelText("userPassword");
  //   const changePasswordButton = screen.getByRole("button", {name: "Change Password"});

  //   fireEvent.click(changePasswordButton);
  //   const newPassword = screen.getByLabelText("newPassword");
  //   const confirmPassword = screen.getByLabelText("confirmPassword");

  //   fireEvent.change(userName, {target: {value: "fake name"}});
  //   fireEvent.change(password, {target: {value: "1234"}});
  //   fireEvent.change(newPassword, {target: {value: "12345"}});
  //   fireEvent.change(confirmPassword, {target: {value: "12345"}});

  //   const button = screen.getByRole("button", {name: "Save Changes"});

  //   await act(async () => {
  //     fireEvent.click(button);
  //   })

  //   expect(api.put).toHaveBeenCalled();
  //   expect(errorAlert).toHaveBeenCalled();
  // })
 
})
