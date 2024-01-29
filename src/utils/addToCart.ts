import { AxiosResponse } from "axios"
import api from "../axios/api"
import { jwtDecode } from "jwt-decode";
import { Decoded_Token } from "../types/types";

export const addToCart = async (productId: number, quantity: number): Promise<void> => {
  const access_token: string = localStorage.getItem("access_token")!;
  const decoded_token: Decoded_Token = jwtDecode(access_token);

  try {
    const response: AxiosResponse = await api.post(`cart/addToCart/${decoded_token.userId}`,
      {productId, quantity: quantity}, 
      {
        headers: { 'Authorization': `Bearer ${access_token}` 
      }
    });
    console.log(response);
  } catch (err){
    console.log(err)
  }
}