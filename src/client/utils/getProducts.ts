import api from "../axios/api";
import { AxiosResponse } from "axios";
import { PRODUCT_NOT_FOUND, EXPIRED_TOKEN, QueryParam, DataDetail } from "../types/types";
import queryString from "query-string";
import logOut from "./logout";

export async function fetchProducts(data: QueryParam, accessToken: string | null): Promise<string| any> {   
  
  if(!accessToken) {
    logOut();
  }

  data.price = data?.price?.toString().split(",");
  const queryParams = queryString.stringify(data); 
  
  try {
    const response: AxiosResponse = await api.get(`products/get-products?${queryParams}`,
      {headers: {"Authorization" : `Bearer ${accessToken}`}}
    );    
    
    if (response.data?.message === PRODUCT_NOT_FOUND){      
      return PRODUCT_NOT_FOUND;
    }      
    return response
  }catch (err){
    console.log(err);
    if (err.response?.data === EXPIRED_TOKEN){
      return EXPIRED_TOKEN;
    }
    throw new Error(err);
  }
} 
