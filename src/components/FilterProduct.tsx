import React, { useContext } from 'react'
import SearchProduct from './SearchProduct'
import ProductCategory from './ProductCategory'
import RangeSlider from './RangleSlider'
import { dashboardContext } from '../context/DashboardContext'
import { DashboardContextValue } from '../types/types'

type ParentProp = {
  handleSearch: (title: string) => void
  handleCategory: (category: string) => void
}

const FilterProduct = ({handleSearch, handleCategory}: ParentProp) => {
  const { search }: DashboardContextValue = useContext(dashboardContext)!

  return (
    <div>
      <SearchProduct
        search = {search}
        handleSearch = {handleSearch}
      />
      <RangeSlider/>
      <ProductCategory
        handleCategory = {handleCategory}
      />
    </div>
  )
}

export default FilterProduct
