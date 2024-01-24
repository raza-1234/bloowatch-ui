import React, { useContext } from 'react'
import ProductCard from './ProductCard'
import "../css/Dashboard.css"
import { Product, DashboardContextValue } from '../types/types';
import FilterProduct from './FilterProduct';
import Pagination from './shared/Pagination';
import { dashboardContext } from '../context/DashboardContext'

const Dashboard = () => {
  const {
    products, pagingInfo, fetchProducts, category, search, page, price
  }: DashboardContextValue = useContext(dashboardContext)!;

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

