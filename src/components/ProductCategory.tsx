import React, { useContext, useState } from 'react'
import "../css/ProductCategory.css"
import { DashboardContextValue } from '../types/types';
import { dashboardContext } from '../context/DashboardContext';

const ProductCategory = () => {
  const categories = ["tunder", "boards", "canoeing", "equipment", "paddling", "rental", "scuba-diving", "surfing"];
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const {fetchProducts, setCategory, search, price }: DashboardContextValue = useContext(dashboardContext)!
  
  const categoryHandler = (productCategory: string, categoryId: number): void => {
    setCategory(productCategory)
    setSelectedCategory(categoryId)
    fetchProducts(price, productCategory, search, undefined)
  } 

  return (
    <div className='bloowatch-category__wrapper'>
      <p>categories</p>
      <ul className='bloowatch-category__list'>
        {
          categories.map((category, index) => {
            return (
              <li 
                className={selectedCategory === index? "bloowatch-category__selected": "bloowatch-category__un-selected"}
                key = {index} 
                onClick={() => categoryHandler(category, index)}
              >
                {category}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ProductCategory


