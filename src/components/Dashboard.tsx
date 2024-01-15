import React from 'react'
import ProductCard from './ProductCard'
import { useState, useEffect } from 'react';
import api from '../axios/api'
import { AxiosResponse } from 'axios'
import "../css/Dashboard.css"
import { Product, Paging } from '../types/types';
import FilterProduct from './FilterProduct';
import useAuth from '../hooks/useAuth';
import logOut from '../utils/logout';
import { RESPONSE_TEXT, PRODUCT_STATUS } from '../types/types';
import Pagination from './shared/Pagination';

const Dashboard = () => {
  const [ products, setProducts ] = useState<Product[]>([])
  const [pagingInfo, setPagingInfo] = useState<Paging>()
  const [page, setPage] = useState<number>();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("")
  const { auth, setAuth }: any = useAuth();
  
  useEffect(() => {
    fetchProducts();
  }, [page, search, category])

  const handlePage = (Number: number): void => {
    setPage(Number)
  }

  const handleSearch = (title: string): void => {
    setSearch(title)
    setPage(undefined)
  }

  const handleCategory = (category: string): void => {
    setCategory(category)   
    setPage(undefined) 
  }  

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
    <div className='bloowatch-dashboard__wrapper'>
      <div className='bloowatch-dashboard__content'>
        <div className='bloowatch-dashboard__products'>
          {
            products.length > 0 ?
            products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product = {product}
                fetchProducts = {fetchProducts}
              />
            ))
            : <h3>no product found.</h3>
          }
        </div>
    
        <div className='bloowatch-dashboard__side-bar'>
          <FilterProduct
            search = {search}
            handleSearch = {handleSearch}
            handleCategory = {handleCategory}
          />
        </div>

      </div>

      { pagingInfo &&
        <Pagination
          pagingInfo = {pagingInfo!}
          handlePage = {handlePage}
        /> 
      }
    </div>
  )
}

export default Dashboard

