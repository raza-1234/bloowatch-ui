import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProductCard from '../../client/components/ProductCard';
import BuildApp from '../helper/ComponentWrapper';
import { buildMockCartResponse, buildMockUserResponse } from '../helper/Util';
import api from '../../client/axios/api';
import { jwtDecode } from 'jwt-decode';
import { AxiosResponse } from 'axios';
import { Product } from '../../client/types/types';

jest.mock("../../client/axios/api", () => ({
  get: jest.fn(),
  post: jest.fn()
}))

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe("ProductCard", () => {
  
  let mockProductResponse: Product;
  let mockCartResponse: AxiosResponse;
  let userId: { userId: number};

  beforeAll(() => {
    localStorage.setItem('access_token', "mockAccessToken");  
  })

  afterAll(() => {
    localStorage.removeItem("access_token");
  })

  beforeEach(() => {
    mockCartResponse = buildMockCartResponse() as AxiosResponse;
    const mockuserResponse = buildMockUserResponse() as AxiosResponse;

    const mockResponse: any = {
      category: ["fake category"],
      image: "images/image_1704157861657.png",
      price: 70,
      quantity: 5,
      title: "fake product",
      id: 1
    };

    mockProductResponse = {...mockResponse};

    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse);
    (api.get as jest.Mock).mockResolvedValueOnce(mockuserResponse);

    userId = { userId: 1 };
    (jwtDecode as jest.Mock).mockReturnValue(userId);
  })

  it("should render image successfully", async () => {
    await act(async () => {
      render(<ProductCard product = {mockProductResponse}/>, { wrapper: BuildApp })
    })

    const product_card_wrapper = screen.getByTestId("product_card_wrapper");
    const image = screen.getByAltText("product_img");

    expect(image).toBeInTheDocument();
    expect(product_card_wrapper).toBeInTheDocument();
    expect(image).toHaveProperty("src", "http://localhost/image_1704157861657.png"); 

    fireEvent.click(image);
    expect(window.location.pathname).toBe("/product-detail/1");
  }) 

  it("should render button successfully", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse);

    await act(async () => {
      render(<ProductCard product = {mockProductResponse}/>, { wrapper: BuildApp })
    })

    const button = screen.getByRole("button", { name: "Add To Cart" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bloowatch-product-card__hide-button");
    expect(button).not.toBeDisabled();

    await act(async() => {
      fireEvent.click(button); 
    })

    expect(api.post).toHaveBeenCalledWith("cart/addToCart/1",
     {"productId": 1, "quantity": 1}, {"headers": {"Authorization": "Bearer mockAccessToken"}});

    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1",
     {"headers": {"Authorization": "Bearer mockAccessToken"}});

    expect(api.get).toHaveBeenCalledWith("user-detail/1",
     {"headers": {"Authorization": "Bearer mockAccessToken"}});
  })

  it("should render disabled button successfully", async () => {
    mockCartResponse.data[0].quantity = 5;    

    await act(async () => {
      render(<ProductCard product = {mockProductResponse}/>, { wrapper: BuildApp })
    })

    const button = screen.getByRole("button", { name: "Out Of Stock" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bloowatch-product-card__hide-button-disabled");
    expect(button).toBeDisabled();
  })

  it("should render product detail successfully", async () => {
    await act(async () => {
      render(<ProductCard product = {mockProductResponse}/>, { wrapper: BuildApp })
    })

    expect(screen.getByTestId("product_detail")).toHaveClass("bloowatch-product-card__text");
    expect(screen.getByTestId("product_title")).toBeInTheDocument();
    expect(screen.getByTestId("product_category")).toBeInTheDocument();
    expect(screen.getByTestId("product_price")).toBeInTheDocument();
  })

})
