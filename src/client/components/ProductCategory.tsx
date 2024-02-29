import "../css/ProductCategory.css"
import React from 'react'
import queryString from 'query-string';
import { useLocation, useSearchParams } from 'react-router-dom';
import { QueryParam } from '../types/types';

type ParentProp = {
  getProducts: (data: QueryParam) => void
}

const ProductCategory = ({getProducts}: ParentProp) => {
  const categories = ["tunder", "boards", "canoeing", "equipment", "paddling", "rental", "scuba-diving", "surfing"];
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);
  const [params, setParams] = useSearchParams();
  const category = params.get("category")!
  
  const categoryHandler = (productCategory: string): void => {
    delete parsedQuery.search;
    delete parsedQuery.page;
    parsedQuery.category = productCategory;
    
    setParams((prevParams) => {
      if (prevParams.has("search")){
        prevParams.delete("search");
      }
      if (prevParams.has("page")){
        prevParams.delete("page");
      }
      prevParams.set("category", productCategory)
      return prevParams;
    });
    getProducts(parsedQuery);
  }

  const resetCategory = () => {
    delete parsedQuery.category;
    setParams((prevParams) => {
      if (prevParams.has("category")){
        prevParams.delete("category")
      }
      return prevParams;
    });
    getProducts(parsedQuery);
  }

  return (
    <div data-testid = "category_wrapper" className='bloowatch-category__wrapper'>
      <p>categories</p>
      <ul className='bloowatch-category__list'>
        {
          categories.map((productCategory, index) => {
            return (
              <li 
                data-testid = "category"
                className={category === productCategory? "bloowatch-category__selected": "bloowatch-category__un-selected"}
                key = {index}
                onClick={() => categoryHandler(productCategory)}
              >
                {productCategory}
              </li>
            )
          })
        }
      </ul>
      <div className='bloowatch-category__reset'>
        <button disabled = {category ? false: true}
          className = {category? "bloowatch-category__reset-button": "bloowatch-category__reset-button-disabled"}
          onClick={resetCategory}
        >
          Reset Category
        </button>
      </div>
    </div>
  )
}

export default ProductCategory


