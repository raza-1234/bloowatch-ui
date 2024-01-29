import "../css/Filter.css"
import React from 'react'

import SearchProduct from './SearchProduct'
import ProductCategory from './ProductCategory'
import RangeSlider from './RangleSlider'
import { QueryParam } from '../types/types'

type ParentProp = {
  getProducts: (data: QueryParam) => void
}

const FilterProduct = ({getProducts}: ParentProp) => {
  return (
    <div className='bloowatch-filter-product__wrapper'>
      <SearchProduct
        getProducts = {getProducts}
      />
      <RangeSlider
        getProducts = {getProducts}
      />
      <ProductCategory
        getProducts = {getProducts}
      />
    </div>
  )
}

export default FilterProduct
