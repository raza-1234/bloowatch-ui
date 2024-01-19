import React, { FC, createContext, useState} from 'react'
import { Product, Paging, PRODUCT_STATUS, RESPONSE_TEXT, DashboardContextValue, Children } from '../types/types';
import { AxiosResponse } from 'axios';
import api from '../axios/api';
import useAuth from '../hooks/useAuth';
import logOut from '../utils/logout';

export const dashboardContext = createContext<DashboardContextValue | null>(null);
const DashboardContext = ({children}: Children) => {

  const [ products, setProducts ] = useState<Product[]>([])
  const [pagingInfo, setPagingInfo] = useState<Paging>()
  const [page, setPage] = useState<number>();
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [price, setPrice] = useState<number[]>([0, 100]);
  const { auth, setAuth }: any = useAuth();  

  async function fetchProducts(productPrice: number[], productCategory?: string, title?: string, pageNumber?: number): Promise<void> {       
    try {
      let response: AxiosResponse;
      if (title?.trim()){
        response = await api.get(`products/get-products?price[]=${productPrice[0]}&price[]=${productPrice[1]}&page=${pageNumber}&search=${title.toLowerCase()}`, {headers: {"Authorization" : `Bearer ${auth.token}`}}
        );
      }
      else if (productCategory?.trim()){
        response = await api.get(`products/get-products?price[]=${productPrice[0]}&price[]=${productPrice[1]}&page=${pageNumber}&category=${productCategory.toLowerCase()}`, {headers: {"Authorization" : `Bearer ${auth.token}`}});
      }
      else {
        response = await api.get(`products/get-products?price[]=${productPrice[0]}&price[]=${productPrice[1]}&page=${pageNumber}`, {headers: {"Authorization" : `Bearer ${auth.token}`}});
      }

      if (response.data.message === PRODUCT_STATUS){
        setProducts([])
        setPagingInfo(undefined)
        return ; 
      }            
      setProducts(response.data.data)
      setPagingInfo(response.data.paging)
    } catch (err){
      console.log(err);
      if (err.response.data === RESPONSE_TEXT){
        logOut();
        setAuth();
      }
    }
  }  

  return (
    <dashboardContext.Provider 
      value={
        {products, pagingInfo, fetchProducts, page, setPage, category, setCategory, search, setSearch, setPrice, price  }
      }
    >
      {children}
    </dashboardContext.Provider>
  )
}

export default DashboardContext
