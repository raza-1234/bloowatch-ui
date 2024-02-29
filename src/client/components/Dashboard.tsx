import "../css/Dashboard.css"
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import ProductCard from './ProductCard'
import { Product, Paging, QueryParam } from '../types/types';
import FilterProduct from './FilterProduct';
import Pagination from './shared/Pagination';
import { fetchProducts } from '../utils/getProducts';
import { errorAlert } from '../utils/toast';
import useAuthData from "../context/AuthProvider";

const Dashboard = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [pagingInfo, setPagingInfo] = useState<Paging | null>(null);
  const { userData } = useAuthData();
  
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);

  const getProducts = async (parsedQuery: QueryParam) => {
    
    const productPayload = await fetchProducts(parsedQuery, userData.accessToken);
    
    if (productPayload.status !== 200){
      errorAlert('Something Went wrong. Please Reload the Page');
    }
    
    setProducts(productPayload?.data?.data);
    setPagingInfo(productPayload?.data?.paging);
  }

  useEffect(() => {
    getProducts(parsedQuery);
  },[])

  return (
    <div data-testid = "dashboard_wrapper" className='bloowatch-dashboard__wrapper'>
      <div data-testid = "dashboard_content" className='bloowatch-dashboard__content'>
        <div data-testid = "products_wrapper" className='bloowatch-dashboard__products'>
          {
            products?.length > 0 ?
            products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product = {product}
              />
            ))
            : <h3>no product found.</h3>
          }
        </div>
    
        <div data-testid = "side_bar_wrapper" className='bloowatch-dashboard__side-bar'>
          <FilterProduct
            getProducts = {getProducts}
          />
        </div>
      </div>

      { pagingInfo?.currentPage &&
        <Pagination
          pagingInfo = {pagingInfo}
          getProducts = {getProducts}
        /> 
      }
    </div>
  )
}

export default Dashboard;

