import React from 'react'
import SearchProduct from './SearchProduct'
import ProductCategory from './ProductCategory'
import RangeSlider from './RangleSlider'
import "../css/Filter.css"


const FilterProduct = () => {
  return (
    <div className='bloowatch-filter-product__wrapper'>
      <SearchProduct/>
      <RangeSlider/>
      <ProductCategory/>
    </div>
  )
}

export default FilterProduct
