import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import Coupon from '../../client/components/Coupon';
import api from '../../client/axios/api';
import { successAlert, errorAlert } from '../../client/utils/toast';
import { COUPON_APPLIED, INVALID_COUPON } from '../../client/types/types';
import { validationError } from '../../client/utils/validationError';
import { buildMockCouponDetail } from '../helper/Util';
import { AxiosResponse } from 'axios';

jest.mock("../../client/utils/validationError", () => ({
  validationError: jest.fn()
}))

jest.mock("../../client/axios/api", () => ({
  get: jest.fn()
}))

jest.mock("../../client/utils/toast", () => ({
  successAlert: jest.fn(),
  errorAlert: jest.fn()
}))

describe("Coupon", () => {
  const mockCouponHandler = jest.fn();

  let mockCouponResponse: AxiosResponse = {
    data: buildMockCouponDetail(),
    statusText: "OK"
  } as AxiosResponse;

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should render successfully and get coupon detail", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockCouponResponse);

    await act(async () => {
      render(<Coupon couponHandler={mockCouponHandler}/>, { wrapper: BuildApp})
    })

    const coupon_wrapper = screen.getByTestId("coupon_wrapper");
    const coupon_form = screen.getByTestId("coupon_form");
    const coupon_input = screen.getByLabelText("coupon");
    const cutom_button = screen.getByText("Apply");

    expect(coupon_wrapper).toBeInTheDocument();
    expect(coupon_wrapper).toHaveClass("bloowatch-coupon__wrapper");
    expect(coupon_form).toBeInTheDocument();
    expect(coupon_input).toBeInTheDocument();
    expect(coupon_input).toHaveProperty("placeholder", "Coupon Code"); 
    expect(cutom_button).toBeInTheDocument();

    fireEvent.change(coupon_input, {target: {value: "fake code"}});
    expect(screen.getByDisplayValue("fake code")).toBeInTheDocument(); 
     
    await act(async () => {
      fireEvent.click(cutom_button); 
    })

    expect(mockCouponHandler).toHaveBeenCalledWith(mockCouponResponse.data);
    expect(successAlert).toHaveBeenCalledWith(COUPON_APPLIED); 
  })

  it("should call validationError onClick apply-coupon button", async () => {
    await act(async () => {
      render(<Coupon couponHandler={mockCouponHandler}/>, { wrapper: BuildApp})
    })

    const coupon_input = screen.getByLabelText("coupon");
    const custom_button = screen.getByText("Apply");

    fireEvent.change(coupon_input, {target: {value: ""}});
     
    await act(async () => {
      fireEvent.click(custom_button);
    })

    expect(validationError).toHaveBeenCalledWith("coupon is required.");
  })

  it("should render error toast", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          message: "Invalid coupon."
        }
      }
    })

    await act(async () => {
      render(<Coupon couponHandler={mockCouponHandler}/>, { wrapper: BuildApp});
    })

    const coupon_input = screen.getByLabelText("coupon");
    const cutom_button = screen.getByText("Apply");

    fireEvent.change(coupon_input, {target: {value: "fake code"}});
    expect(screen.getByDisplayValue("fake code")).toBeInTheDocument();
     
    await act(async () => {
      fireEvent.click(cutom_button); 
    })

    expect(errorAlert).toHaveBeenCalledWith(INVALID_COUPON); 
  })

})
