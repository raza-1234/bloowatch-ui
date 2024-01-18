import React, { useContext, useEffect } from 'react'
import ProductCard from './ProductCard'
import "../css/Dashboard.css"
import { Product, DashboardContextValue } from '../types/types';
import FilterProduct from './FilterProduct';
import Pagination from './shared/Pagination';
import { dashboardContext } from '../context/DashboardContext'

const Dashboard = () => {
  const {
    products, pagingInfo, search, setSearch, category, setCategory, page, setPage, fetchProducts
  }: DashboardContextValue = useContext(dashboardContext)!

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
          <FilterProduct
            handleSearch = {handleSearch}
            handleCategory = {handleCategory}
          />
        </div>
      </div>

      { pagingInfo &&
        <Pagination
          handlePage = {handlePage}
        /> 
      }
    </div>
  )
}

export default Dashboard

