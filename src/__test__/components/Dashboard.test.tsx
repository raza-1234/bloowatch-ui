import React from 'react';
import { act, render, screen } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import Dashboard from '../../client/components/Dashboard';
import api from '../../client/axios/api';
import { buildProductResponse } from '../helper/Util';
import { jwtDecode } from 'jwt-decode';
import { buildPagingInfo } from '../helper/Util';

jest.mock("../../client/components/FilterProduct", () => () => <p data-testid = "fake_filter_product">Filter Product</p>)
jest.mock("../../client/components/ProductCard", () => () => <p data-testid = "fake_product_card">Products</p>)
jest.mock("../../client/components/shared/Pagination", () => () => <p data-testid = "fake_pagination">Pagination</p>)

jest.mock("../../client/axios/api", () => ({
  get: jest.fn()
}))

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn()
}))

describe("Dashboard", () => {

  beforeAll(() => {
    localStorage.setItem("access_token", "mockAccessToken"); 
  })

  afterAll(() => {
    localStorage.removeItem("access_token");
  })

  beforeEach(() => {
    const productArray = buildProductResponse(3);
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        data: productArray,
        paging: buildPagingInfo()
      },
      statustext: "OK"
    });
    (jwtDecode as jest.Mock).mockReturnValue({ userId: 1}); 
  })

  afterEach(() => {
    jest.clearAllMocks();
  })
 
  it("should render products successfully", async () => {
    await act(async () => {
      render(<Dashboard/>, { wrapper: BuildApp})
    })
    
    expect(screen.getByTestId("dashboard_wrapper")).toHaveClass("bloowatch-dashboard__wrapper");
    expect(screen.getByTestId("dashboard_content")).toHaveClass("bloowatch-dashboard__content"); 
    expect(screen.getByTestId("products_wrapper")).toHaveClass("bloowatch-dashboard__products");
    expect(screen.getByTestId("side_bar_wrapper")).toHaveClass("bloowatch-dashboard__side-bar");
    expect(screen.getByTestId("fake_filter_product")).toBeInTheDocument();

    expect(api.get).toHaveBeenCalledWith("products/get-products?", {"headers": {"Authorization": "Bearer mockAccessToken"}}); 
    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1", {"headers": {"Authorization": "Bearer mockAccessToken"}}); 
    expect(api.get).toHaveBeenCalledWith("user-detail/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});    
    expect(screen.getAllByTestId("fake_product_card")[0]).toBeInTheDocument();
    expect(screen.getByTestId("fake_pagination")).toBeInTheDocument();
  })

  it("should render 'no product found.' successfully when no product exist", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        data: [],
        paging: {}
      }
    });
    await act(async () => {
      render(<Dashboard/>, { wrapper: BuildApp})
    })
    
    expect(screen.getByText("no product found.")).toBeInTheDocument(); 
    expect(api.get).toHaveBeenCalledWith("products/get-products?", {"headers": {"Authorization": "Bearer mockAccessToken"}}); 
    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1", {"headers": {"Authorization": "Bearer mockAccessToken"}}); 
    expect(api.get).toHaveBeenCalledWith("user-detail/1", {"headers": {"Authorization": "Bearer mockAccessToken"}})
    expect(screen.queryByTestId("fake_pagination")).toBeNull();
  })

})
 