import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import Cart from '../../client/components/Cart';
import api from '../../client/axios/api';
import { jwtDecode } from 'jwt-decode';
import { buildMockUserResponse, buildMockCartResponse } from '../helper/Util';
import { successAlert } from '../../client/utils/toast';
import { AxiosResponse } from 'axios';

jest.mock("../../client/utils/toast", () => ({
  successAlert: jest.fn()
}))

jest.mock("../../client/components/CartTotal", () => () => <p data-testid = "fake_cart_total">Fake CartTotal</p>);
jest.mock("../../client/components/Coupon", () => () => <p data-testid = "fake_coupon">Fake coupon</p>);

jest.mock("../../client/axios/api", () => ({
  get: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn()
}))

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn()
}))

describe("Testing cart with empty cartData array", () => {

  it("should render successfully when cartData array is empty", async () => {
    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })
  
    expect(screen.getByTestId("empty_cart")).toHaveClass("bloowatch-cart-product__empty");
    expect(screen.queryByTestId("cart_row")).toBeNull();
  })

})

describe("Cart", () => {
  let mockUserResponse: AxiosResponse;
  let mockCartResponse: AxiosResponse;

  beforeAll(() => {
    localStorage.setItem("access_token", "mockAccessToken");
  })

  afterAll(() =>  {
    localStorage.removeItem("access_token");
  })

  beforeEach(() => {
    mockUserResponse = buildMockUserResponse() as AxiosResponse;
    mockCartResponse = buildMockCartResponse() as AxiosResponse;

    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse);
    (api.get as jest.Mock).mockResolvedValueOnce(mockUserResponse);
    (jwtDecode as jest.Mock).mockReturnValue({ userId: 1});
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should render successfully when cartData is not empty and isCoupon flag is false", async () => {
    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })

    expect(screen.getAllByTestId("cart_row")).toHaveLength(2);
    expect(screen.queryByTestId("empty_cart")).toBeNull();
    expect(screen.getByTestId("fake_cart_total")).toBeInTheDocument();
    expect(screen.queryByTestId("fake_coupon")).toBeNull();  
    expect(screen.getByTestId("cart_coupon_button_wrapper")).toHaveClass("bloowatch-cart-coupon__button-wrapper");
    expect(screen.getByTestId("cart-button__wrapper")).toHaveClass("bloowatch-cart-button__wrapper");
  })

  it("should render coupon form successfully when isCoupon flag is true", async () => {
    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })
  
    const apply_coupon = screen.getByText("apply coupon");

    fireEvent.click(apply_coupon);

    expect(screen.getByTestId("cart-coupon__form")).toHaveClass("bloowatch-cart-coupon__form");
    expect(screen.getByTestId("fake_coupon")).toBeInTheDocument();
  })

  it("should render cart_table row with remove_from_cart button", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce({ statusText: "Ok" });

    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })
  
    const remove_from_cart = screen.getAllByTestId("remove_from_cart");
    const remove_from_cart_wrapper = screen.getAllByTestId("remove_from_cart_wrapper");

    expect(remove_from_cart).toHaveLength(2);

    for (let i = 0; i < remove_from_cart_wrapper.length; i++){
      expect(remove_from_cart_wrapper[i]).toHaveClass("bloowatch-cart-product__remove-item");
    }

    fireEvent.click(remove_from_cart[0]);

    expect(api.delete).toHaveBeenCalledWith("cart/1/removeFromCart/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});
    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});
    expect(api.get).toHaveBeenCalledWith("user-detail/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});
  })

  it("should render cart_table row with product image", async () => {
    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })
  
    const cart_product_image_wrapper = screen.getAllByTestId("cart_product_image_wrapper");
    const images = screen.getAllByAltText("cart_image");

    for (let i = 0; i < cart_product_image_wrapper.length; i++){
      expect(cart_product_image_wrapper[i]).toHaveClass("bloowatch-cart-product__image");
    }

    expect(images[0]).toHaveProperty("src", "http://localhost/image_1704157861657.png");
  }) 

  it("should render cart_table row with decrement button and update cart quantity", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse);

    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })
  
    const cart_quantity_handler = screen.getAllByTestId("cart_quantity_handler");
    const update_cart = screen.getByRole("button", {name: "update cart"});

    for (let i = 0; i < cart_quantity_handler.length ; i++){
      expect(cart_quantity_handler[i]).toHaveClass("bloowatch-cart-product__quantity-handler");
    }

    const decrementButton = screen.getAllByRole("button", {name: "-"});
    const cart_quantity = screen.getAllByTestId("cart_quantity");

    expect(cart_quantity[0]).toHaveTextContent("2");

    expect(decrementButton[0]).toHaveClass("bloowatch-button");
    expect(decrementButton[0]).not.toBeDisabled();

    fireEvent.click(decrementButton[0]);
    expect(cart_quantity[0]).toHaveTextContent("1");
    expect(decrementButton[0]).toHaveClass("bloowatch-button__disabled");
    expect(decrementButton[0]).toBeDisabled();

    await act(async () => {
      fireEvent.click(update_cart); 
    })

    expect(api.patch).toHaveBeenCalledWith("/cart/updateCart/1",
     {"productId": 1, "quantity": 1}, {"headers": {"Authorization": "Bearer mockAccessToken"}});
    expect(successAlert).toHaveBeenCalled();
  })

  it("should render cart_table row with increment button and update cart quantity", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse);

    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })
  
    const update_cart = screen.getByRole("button", {name: "update cart"});

    const incrementButton = screen.getAllByRole("button", {name: "+"});
    const cart_quantity = screen.getAllByTestId("cart_quantity");

    expect(cart_quantity[0]).toHaveTextContent("2");
    expect(incrementButton[0]).toHaveClass("bloowatch-button");
    expect(incrementButton[0]).not.toBeDisabled();

    for (let i = 0; i < 3; i++){
      fireEvent.click(incrementButton[0]);
    }
    expect(cart_quantity[0]).toHaveTextContent("5");
    expect(incrementButton[0]).toHaveClass("bloowatch-button__disabled");
    expect(incrementButton[0]).toBeDisabled(); 

    await act(async () => {
      fireEvent.click(update_cart);
    })

    expect(api.patch).toHaveBeenCalledWith("/cart/updateCart/1",
     {"productId": 1, "quantity": 5}, {"headers": {"Authorization": "Bearer mockAccessToken"}});
    expect(successAlert).toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledTimes(3);
    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});
    expect(api.get).toHaveBeenCalledWith("user-detail/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});
    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});
  })

  it("should not update data when there is no change in cart", async () => {
    await act(async () => {
      render(<Cart/>, { wrapper: BuildApp})
    })
  
    const update_cart = screen.getByRole("button", {name: "update cart"});

    fireEvent.click(update_cart);
    expect(successAlert).toHaveBeenCalledWith("Nothing To Update."); 

    expect(api.patch).not.toHaveBeenCalled(); 
  })

})
