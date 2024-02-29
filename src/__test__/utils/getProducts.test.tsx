import { fetchProducts } from "../../client/utils/getProducts";
import api from "../../client/axios/api";
import { buildMockProductResponse } from "../helper/Util";
import { QueryParam } from "../../client/types/types";

jest.mock("../../client/axios/api", () => ({
  get: jest.fn()
}))

describe("fetchProducts", () => {
  let mockProductResponse = buildMockProductResponse();
  let accessToken = "mockAccessToken"
  const data: QueryParam = {
    page: '1',
    price: ["100", "200"],
    search: "fake search"
  }

  beforeAll(() => {
    localStorage.setItem("access_token", accessToken);
  })

  afterAll(() => {
    localStorage.removeItem("access_token");
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should call fetchProducts function", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockProductResponse);    

    const response = await fetchProducts(data, accessToken);

    expect(api.get).toHaveBeenCalledWith(
      "products/get-products?page=1&price=100&price=200&search=fake%20search", 
      {"headers": {"Authorization": "Bearer mockAccessToken"}}
    );

    expect(response).toEqual(mockProductResponse); 
  })

  it("should return 'No Product Exist.' if no product found", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { message: "No Product Exist.", data: [], paging: {}}});

    const response = await fetchProducts(data, accessToken);

    expect(api.get).toHaveBeenCalledWith(
      "products/get-products?page=1&price=100&price=200&search=fake%20search", 
      {"headers": {"Authorization": "Bearer mockAccessToken"}}
    );

    expect(response).toBe("No Product Exist.");
  })

  it("should return error 'token expire'", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce({ response: { data: "token expire"}});

    const errorResponse = await fetchProducts(data, accessToken);

    expect(api.get).toHaveBeenCalledWith(
      "products/get-products?page=1&price=100&price=200&search=fake%20search", 
      {"headers": {"Authorization": "Bearer mockAccessToken"}}
    );

    expect(errorResponse).toBe("token expire");
  })

  it("should return error 'api fail'", async () => {
    const error = new Error('Fake Error');
    (api.get as jest.Mock).mockRejectedValueOnce(error);

    await expect(fetchProducts(data, accessToken)).rejects.toThrow("Error: Fake Error"); 

    expect(api.get).toHaveBeenCalledWith(
      "products/get-products?page=1&price=100&price=200&search=fake%20search", 
      {"headers": {"Authorization": "Bearer mockAccessToken"}}
    );
  }) 
})
