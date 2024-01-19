import React, { useContext, useState } from 'react'
import "../css/SearchProduct.css"
import { dashboardContext } from '../context/DashboardContext'
import { DashboardContextValue } from '../types/types'

const SearchProduct = () => {

  const { fetchProducts, setSearch, search, category, price }: DashboardContextValue = useContext(dashboardContext)!

  const handleSearch = async (title: string): Promise<void> => {
    setSearch(title)
    fetchProducts(price, category, title, undefined)
  }

  return (
    <div className='bloowatch-search-product__wrapper'>
      <form className='bloowatch-search-product__form'>
        <p>search</p>
        <input 
          type='text'
          placeholder='Search for a product'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
    </div>
  )
}

export default SearchProduct
