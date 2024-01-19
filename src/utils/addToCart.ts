import { AxiosResponse } from "axios"
import api from "../axios/api"
import { tokenInfo } from "./tokenInfo"

export const addToCart = async (productId: number, quantity: number): Promise<void> => {

  const { 
    decoded_token: {
      userId
    }, access_token
  } = tokenInfo();

  try {
    const response: AxiosResponse = await api.post(`cart/addToCart/${userId}`,
      {productId, quantity: quantity}, 
      {
        headers: { 'Authorization': `Bearer ${access_token.token}` 
      }
    });
    console.log(response);
  } catch (err){
    console.log(err)
  }
}