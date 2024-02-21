import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VerifyUser from '../../components/VerifyUser';
import api from '../../axios/api';
import { useParams } from "react-router-dom"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}))

jest.mock("../../axios/api", () => ({
  put: jest.fn()
}))

describe("VerifyUser", () => {

  beforeEach(() => {
    useParams.mockReturnValue({ id: "1" }); 
    api.put.mockResolvedValue({ data: { messgae: "coupon applied"}, statuText: 200 });
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render successfully", () => {
    const { container } = render(<VerifyUser/>)
 
    expect(screen.getByTestId("user-verification")).toBeInTheDocument();
    expect(screen.getByTestId("user-verification-form")).toBeInTheDocument();
    expect(screen.getByText("Verification Code:")).toBeInTheDocument(); 
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  })

  // it("should render input field for email token code", () => {
  //   const { container } = render(<VerifyUser/>)
 
  //   const input = screen.getByLabelText("token code");
  //   const button = screen.getByRole("button", {name: "Verify Email"});

  //   expect(input).toBeInTheDocument();
  //   expect(input).toHaveProperty("type", "text");
  //   expect(input).toHaveProperty("placeholder", "Enter Verification-Token (e.g xxxxxx)");
  //   expect(button).toBeInTheDocument();

  //   fireEvent.change(input, {target: {value: "fake code"}});
  //   expect(screen.getByDisplayValue("fake code")).toBeInTheDocument();

  //   fireEvent.click(button);
  //   expect(container).toMatchSnapshot(); 

  //   expect(api.put).toHaveBeenCalledWith("/verification/verify_email/1", { emailToken: "fake code" });
  // })

})