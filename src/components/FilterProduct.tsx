import React from 'react'
import SearchProduct from './SearchProduct'
import ProductCategory from './ProductCategory'
import RangeSlider from './RangleSlider'

const FilterProduct = () => {
  return (
    <div> 
      <SearchProduct/>
      <RangeSlider/>
      <ProductCategory/>
    </div>
  )
}

export default FilterProduct
