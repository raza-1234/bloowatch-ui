import React from 'react';
import { act, render, screen } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import CartTotal from '../../client/components/CartTotal';
import { buildMockCouponDetail } from '../helper/Util';

describe("CartTotal", () => {

  const mockCouponDetail = buildMockCouponDetail();

  it("should render successfully when there is coupon detail", async () => {
    await act(async () => {
      render(<CartTotal total = {500} couponDetail = {mockCouponDetail}/>, { wrapper: BuildApp})
    })

    const cart_wrapper = screen.getByTestId("cart_wrapper");
    const new_total = screen.getByTestId("new_total");

    expect(cart_wrapper).toBeInTheDocument();
    expect(screen.getByText("cart total")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("500$")).toBeInTheDocument();
    expect(screen.getByText("Coupon")).toBeInTheDocument();
    expect(screen.getByText("fake coupon")).toBeInTheDocument();
    expect(screen.getByText("New Total")).toBeInTheDocument();
    expect(new_total).toBeInTheDocument();
    expect(new_total).toHaveTextContent("400$");
  })

  it("should not render coupon name and newTotal should be same as total when there is no coupon detail", async () => {
    await act(async () => {
      render(<CartTotal total = {500}/>, { wrapper: BuildApp})
    })

    expect(screen.queryByText("Coupon")).toBeNull();
    expect(screen.getByTestId("new_total")).toHaveTextContent("500$"); 
  })

})
