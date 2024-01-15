import React, { useState } from 'react'
import "../css/ProductCategory.css"

type ParentProp = {
  handleCategory: (category: string) => void
}

const ProductCategory = ({ handleCategory}: ParentProp) => {
  const categories = ["tunder", "boards", "canoeing", "equipment", "paddling", "rental", "scuba-diving", "surfing"];
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const categoryHandler = (category: string, categoryId: number): void => {
    handleCategory(category);
    setSelectedCategory(categoryId)
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
