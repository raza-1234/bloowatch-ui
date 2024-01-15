import React from 'react'
import SearchProduct from './SearchProduct'
import ProductCategory from './ProductCategory'
import RangeSlider from './RangleSlider'

type ParentProp = {
  search: string,
  handleSearch: (title: string) => void
  handleCategory: (category: string) => void
}

const FilterProduct = ({handleSearch, search, handleCategory}: ParentProp) => {
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
