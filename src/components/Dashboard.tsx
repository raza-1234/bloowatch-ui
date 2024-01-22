import React, { useContext, useEffect } from 'react'
import ProductCard from './ProductCard'
import "../css/Dashboard.css"
import { Product, DashboardContextValue } from '../types/types';
import FilterProduct from './FilterProduct';
import Pagination from './shared/Pagination';
import { dashboardContext } from '../context/DashboardContext'
import { tokenInfo } from '../utils/tokenInfo';

type ParentProp = {
  fetchCartProducts: (userId: number) => void
}

const Dashboard = ({fetchCartProducts}: ParentProp) => {
  const {
    products, pagingInfo, fetchProducts, category, search, page, price 
  }: DashboardContextValue = useContext(dashboardContext)!

  const { 
    decoded_token: {
      userId
    }
  } = tokenInfo();
  
  useEffect(() => {
    fetchProducts(price, category, search, page);
    fetchCartProducts(userId);
  }, [])

  return (
    <div className='bloowatch-dashboard__wrapper'>
      <div className='bloowatch-dashboard__content'>
        <div className='bloowatch-dashboard__products'>
          {
            products?.length > 0 ?
            products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product = {product}
                fetchCartProducts = {fetchCartProducts}
              />
            ))
            : <h3>no product found.</h3>
          }
        </div>
    
        <div className='bloowatch-dashboard__side-bar'>
          <FilterProduct/>
        </div>
      </div>

      { pagingInfo &&
        <Pagination/> 
      }
    </div>
  )
}

export default Dashboard

