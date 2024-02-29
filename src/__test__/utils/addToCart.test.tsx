import { addToCart } from '../../client/utils/addToCart';
import api from '../../client/axios/api';
import { jwtDecode } from 'jwt-decode';

jest.mock("../../client/axios/api", () => ({
  post: jest.fn()
}))

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn()
}))

describe("addToCart", () => {

  beforeEach(() => {
    localStorage.setItem("access_token", "mockAccessToken");
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should call an api and return data", async () => {
    (jwtDecode as jest.Mock).mockReturnValue({ userId: 1 });

    (api.post as jest.Mock).mockResolvedValue({
      data: {
        message: "item added to cart"
      },
      statusText: "OK"
    })

    await addToCart(1, 3, "mockAccessToken", 1); 

    expect(api.post).toHaveBeenCalledWith("cart/addToCart/1", 
      {"productId": 1, "quantity": 3},
      {"headers": {"Authorization": "Bearer mockAccessToken"}
    });
  })

  it("should log an error if an api call fail", async () => {
    (jwtDecode as jest.Mock).mockReturnValue({ userId: 1 });

    const error = new Error("api fails");
    (api.post as jest.Mock).mockRejectedValueOnce(error);

    await expect(addToCart(1, 3, "mockAccessToken", 1)).rejects.toThrow("Error: api fails");

    expect(api.post).toHaveBeenCalledWith("cart/addToCart/1",
      {"productId": 1, "quantity": 3},
      {"headers": {"Authorization": "Bearer mockAccessToken"}
    });
  })

})