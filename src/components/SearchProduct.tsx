import React from 'react'
import "../css/SearchProduct.css"

type ParentProp = {
  search: string
  handleSearch: (title: string) => void
}

const SearchProduct = ({handleSearch, search}: ParentProp) => {
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
