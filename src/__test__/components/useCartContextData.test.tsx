import useCartContextData from "../../client/context/CartContext";
import api from "../../client/axios/api";
import { buildMockCartResponse } from "../helper/Util";
import BuildApp from "../helper/ComponentWrapper";
import { act, renderHook } from "@testing-library/react";
import { AxiosResponse } from "axios";

jest.mock('../../client/axios/api', () => ({
  get: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

describe("useCartContextData", () => { 
  const mockCartResponse: AxiosResponse = buildMockCartResponse() as AxiosResponse;

  it("useCartContextData", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockCartResponse);

    const { result } = renderHook(() => useCartContextData(), { wrapper: BuildApp }); 
    const { fetchCartProducts } = result.current;

    await act(async () => {
      fetchCartProducts("mockAccessToken", 1);
    })

    expect(result.current.cart).toEqual({cartCount: 2, cartData: mockCartResponse.data});
    expect(api.get).toHaveBeenCalledWith("cart/getAllCartProducts/1",
     {"headers": {"Authorization": "Bearer mockAccessToken"}}); 
  })
})

