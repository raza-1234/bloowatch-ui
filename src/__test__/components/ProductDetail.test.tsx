import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import ProductDetail from '../../client/components/ProductDetail';
import BuildApp from '../helper/ComponentWrapper';
import api from '../../client/axios/api';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { buildMockCartResponse, buildMockProductResponse, buildMockUserResponse } from '../helper/Util';
import { AxiosResponse } from 'axios';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}))

jest.mock("../../client/axios/api", () => ({
  get: jest.fn(),
  post: jest.fn()
}))

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe("ProductDetail", () => {
  let mockCartResponse: AxiosResponse; 
  let mockProductResponse: AxiosResponse;
  let mockUserResponse: AxiosResponse;

  beforeAll(() => {
    localStorage.setItem("access_token", "mockaccessToken"); 
  })

  afterAll(() => {
    localStorage.removeItem("access_token");
  })
  
  beforeEach(() => {
    mockCartResponse = buildMockCartResponse() as AxiosResponse;
    mockProductResponse = buildMockProductResponse() as AxiosResponse;
    mockUserResponse = buildMockUserResponse() as AxiosResponse;
     
    (jwtDecode as jest.Mock).mockReturnValue({ userId: 1 }); 
    (useParams as jest.Mock).mockReturnValue({ id: 1 });

    (api.get as jest.Mock).mockResolvedValueOnce(mockProductResponse);
    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse); 
    (api.get as jest.Mock).mockResolvedValueOnce(mockUserResponse);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })  

  it("should render successfully", async () => {
    let container: any;
    await act(async () => {
      container = render(<ProductDetail/>, {wrapper: BuildApp});
    })    

    const { container: component } = container;
    const product_detail_wrapper = screen.getByTestId("product_detail_wrapper"); 
    const productImage = screen.getByTestId("productImage");
    const title = component.getElementsByClassName('bloowatch-product__text-detail');
    const productPrice = component.getElementsByClassName('bloowatch-product__price');

    const incrementQuantity = screen.getByTestId("increment");

    expect(product_detail_wrapper).toBeInTheDocument();

    expect(incrementQuantity).toBeInTheDocument();
    expect(incrementQuantity).not.toBeDisabled();

    expect(title).toHaveLength(1);
    expect(productPrice).toHaveLength(1); 

    expect(screen.getByText(mockProductResponse.data.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProductResponse.data.price}`)).toBeInTheDocument();

    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveProperty("src", "http://localhost/image_1704157861657.png");
  })

  it("should render increment button with proper increment functionality", async () => {
    await act(async () => {
      render(<ProductDetail/>, {wrapper: BuildApp});
    })    

    const incrementQuantity = screen.getByTestId("increment");
    const decrementQuantity = screen.getByTestId("decrement");
    const add_to_cart = screen.getByTestId("add_to_cart");

    expect(incrementQuantity).toBeInTheDocument();
    expect(incrementQuantity).not.toBeDisabled();
    expect(decrementQuantity).toBeDisabled();
    expect(add_to_cart).toHaveClass("bloowatch-cart__button"); 

    for (let i = 1; i <= 3; i++){
      fireEvent.click(incrementQuantity);
    }
    expect(screen.getByText("3")).toBeInTheDocument(); 
    expect(incrementQuantity).toBeDisabled(); 
    expect(decrementQuantity).not.toBeDisabled();

    expect(add_to_cart).not.toBeDisabled();
    expect(add_to_cart).toHaveTextContent("Add To Cart");
  })

  it("should render decrement button with proper decrement functionality", async () => {
    await act(async () => {
      render(<ProductDetail/>, {wrapper: BuildApp});
    })    

    const incrementQuantity = screen.getByTestId("increment");
    const decrementQuantity = screen.getByTestId("decrement");

    fireEvent.click(incrementQuantity);
    expect(screen.getByTestId("product-quantity_add-to-cart")).toHaveTextContent("2"); 
 
    fireEvent.click(decrementQuantity);
    expect(screen.getByTestId("product-quantity_add-to-cart")).toHaveTextContent("1"); 
  })

  it("should render disabled addToCart button when product is out of stock", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [
          {
            product: {
              category: ["fake category"],
              image: "images/image_1704157861657.png",
              price: 70,
              quantity: 5,
              title: "fake product",
              id: 1
            },
            productId: 1,
            quantity: 5,
            userId: 1,
            id: 1
          }
      ],
      statusText: "OK"
    });
    (api.get as jest.Mock).mockResolvedValueOnce(mockProductResponse);

    (api.post as jest.Mock).mockResolvedValueOnce({
      data: {
        message: "item added to cart"
      },
      statusText: "OK"
    }) 

    await act(async () => {
      render(<ProductDetail/>, {wrapper: BuildApp});
    })    

    const incrementQuantity = screen.getByTestId("increment");
    const decrementQuantity = screen.getByTestId("decrement");
    const add_to_cart = screen.getByTestId("add_to_cart");

    expect(incrementQuantity).toBeInTheDocument();
    expect(incrementQuantity).not.toBeDisabled();
    expect(decrementQuantity).toBeDisabled();

    for (let i = 1; i <= 3; i++){
      fireEvent.click(incrementQuantity);
    }

    expect(screen.getByTestId("product-quantity_add-to-cart")).toHaveTextContent("3"); 
    expect(incrementQuantity).toBeDisabled(); 
    expect(add_to_cart).toHaveTextContent("Add To Cart");

    await act(async () => {
      fireEvent.click(add_to_cart); 
    })

    expect(api.post).toHaveBeenCalledWith("cart/addToCart/1",
     {"productId": 1, "quantity": 3}, {"headers": {"Authorization": "Bearer mockaccessToken"}});
    
    expect(api.get).toHaveBeenCalledWith("products/get-product/1", {"headers": {"Authorization": "Bearer mockaccessToken"}});
    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1", {"headers": {"Authorization": "Bearer mockaccessToken"}});
    expect(api.get).toHaveBeenCalledWith("user-detail/1", {"headers": {"Authorization": "Bearer mockaccessToken"}});

    expect(add_to_cart).toHaveClass("bloowatch-cart__disabled-button");
    expect(add_to_cart).toHaveTextContent("Out Of Stock");
    expect(add_to_cart).toBeDisabled();
    expect(screen.getByTestId("product-quantity_add-to-cart")).toHaveTextContent("1"); 
  })

})