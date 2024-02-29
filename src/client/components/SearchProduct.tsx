import "../css/SearchProduct.css"
import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import queryString from 'query-string'
import { QueryParam } from '../types/types'

type ParentProp = {
  getProducts: (data: QueryParam) => void
}

const SearchProduct = ({getProducts}: ParentProp) => {

  const [params, setParams] = useSearchParams();
  const search = params.get("search") || ""
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);
  
  const handleSearch = async (title: string): Promise<void> => {
    parsedQuery.search = title;
    delete parsedQuery.category;
    delete parsedQuery.page;
    
    if (title.trim()){
      setParams((prevParams) => {
        if (prevParams.has("category")){
          prevParams.delete("category"); 
        }
        if (prevParams.has("page")){
          prevParams.delete("page")
        }
        prevParams.set("search", title); 
        return prevParams;
      });
    }
    else {
      setParams((prevParams) => {
        prevParams.delete("search"); 
        prevParams.delete("page")
        return prevParams;
      });
    }
    getProducts(parsedQuery)
  }

  return (
    <div data-testid = "searchProduct" className='bloowatch-search-product__wrapper'>
      <form className='bloowatch-search-product__form'>
        <p>search</p>
        <input 
          aria-label="search"
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
