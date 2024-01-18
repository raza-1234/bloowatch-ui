import React, { FC, createContext, useState} from 'react'
import { Product, Paging, PRODUCT_STATUS, RESPONSE_TEXT, DashboardContextValue } from '../types/types';
import { AxiosResponse } from 'axios';
import api from '../axios/api';
import useAuth from '../hooks/useAuth';
import logOut from '../utils/logout';

type DashboardContextProvider = {
  children: JSX.Element | JSX.Element[]
}

export const dashboardContext = createContext<DashboardContextValue | null>(null);
const DashboardContext = ({children}: DashboardContextProvider) => {

  const [ products, setProducts ] = useState<Product[]>([])
  const [pagingInfo, setPagingInfo] = useState<Paging>()
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("")
  const [page, setPage] = useState<number>();
  const { auth, setAuth }: any = useAuth();

  async function fetchProducts(): Promise<void> {    
    try {
      let response: AxiosResponse;
      if (search.trim()){
        response = await api.get(`products/get-products?page=${page}&search=${search.toLowerCase()}`, {headers: {"Authorization" : `Bearer ${auth.token}`}}
        );
      }
      else if (category.trim()){
        response = await api.get(`products/get-products?page=${page}&category=${category.toLowerCase()}`, {headers: {"Authorization" : `Bearer ${auth.token}`}});
      }
      else {
        response = await api.get(`products/get-products?page=${page}`, {headers: {"Authorization" : `Bearer ${auth.token}`}});
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
        {products, pagingInfo, search, setSearch, category, setCategory, page, setPage, fetchProducts}
      }
    >
      {children}
    </dashboardContext.Provider>
  )
}

export default DashboardContext
