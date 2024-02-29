import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import VerifyUser from '../../client/components/VerifyUser';
import api from '../../client/axios/api';
import { useParams } from 'react-router-dom';
import { successAlert, errorAlert } from '../../client/utils/toast';

jest.mock("../../client/utils/toast");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}))

jest.mock("../../client/axios/api", () => ({
  put: jest.fn()
}))

const mockSuccessAlert = jest.mocked(successAlert);
const mockErrorAlert = jest.mocked(errorAlert);

const mockParams = { id: 1 };
const response = {
  data: { 
    message: "fake user verified"
  }, 
  statuText: 200
}
const userInput = {
  emailToken: "fake token"
}

describe("VerifyUser", () => {

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue(mockParams);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render successfully", () => {
    render(<VerifyUser/>);
 
    expect(screen.getByTestId("user-verification")).toHaveClass("bloowatch-user-verification__wrapper");
    expect(screen.getByTestId("user-verification-form")).toHaveClass("bloowatch-user-verification__form");
    expect(screen.getByText("Verification Code:")).toBeInTheDocument(); 
    expect(screen.getByTestId("token_input_wrapper")).toHaveClass("bloowatch-user-verification__token");
    expect(screen.getByTestId("icon")).toHaveClass("bloowatch-user-verification__token-icon");
  }) 

  it("should render input field for email token code", async () => {
    (api.put as jest.Mock).mockResolvedValueOnce(response);
    render(<VerifyUser/>);
 
    const input = screen.getByLabelText("token code");
    const button = screen.getByRole("button", {name: "Verify Email"});

    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty("type", "text");
    expect(input).toHaveProperty("placeholder", "Enter Verification-Token (e.g xxxxxx)");
    expect(button).toBeInTheDocument();

    fireEvent.change(input, {target: {value: userInput.emailToken}});
    expect(screen.getByDisplayValue(userInput.emailToken)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    })
    expect(api.put).toHaveBeenCalledWith(`/verification/verify_email/${mockParams.id}`, userInput); 
    expect(mockSuccessAlert).toHaveBeenCalledWith(response.data.message);
  })

  it("should show an error toast if an api fails", async () => {

    (api.put as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          message: "api fails"
        }
      }
    });

    const { container } = render(<VerifyUser/>);
 
    const input = screen.getByLabelText("token code");
    const button = screen.getByRole("button", {name: "Verify Email"});

    fireEvent.change(input, {target: {value: userInput.emailToken}});
    expect(screen.getByDisplayValue(userInput.emailToken)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    })
    expect(api.put).toHaveBeenCalledWith(`/verification/verify_email/${mockParams.id}`, userInput);
    expect(mockErrorAlert).toHaveBeenCalledWith("api fails");
  })

}) 