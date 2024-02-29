import { AxiosResponse } from "axios"
import api from "../axios/api"
import { STATUS_TEXT } from "../types/types";

export const addToCart = 
  async (productId: number, quantity: number, access_token: string | null, userId?: number ): Promise<void> => {
    
  try {
    const response: AxiosResponse = await api.post(`cart/addToCart/${userId}`,
      {productId, quantity: quantity}, 
      {
        headers: { 'Authorization': `Bearer ${access_token}` 
      }
    });
    
    if(response?.statusText !== STATUS_TEXT) {
      throw new Error('Failed to add product in cart')
    } 
  } catch (err){
    console.log(err, 'Failed to add product in cart')
    throw new Error(err)
  }
}