import "../css/ProductCard.css"
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { Product, QueryParam } from '../types/types'
import { addToCart } from '../utils/addToCart'
import CartContextData from '../context/CartContext'
import AuthData from '../context/AuthProvider'

type ParentProp = {
  product: Product,
  getProducts: (data: QueryParam) => void
}

const ProductCard = ({product, getProducts}: ParentProp) => {
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);
  const { cart, fetchCartProducts } = CartContextData();  
  
  const { userData } = AuthData();

  const increaseProductQuantity = async (productId: number): Promise<void> => {
    await addToCart(productId, 1);
    fetchCartProducts(userData.accessToken!, userData.id!); 
  }
  
  return (
      <div className='bloowatch-product-card__wrapper'>
        <Link to = {`/product-detail/${product.id}`}>
          <div className='bloowatch-product-card__image'>
            <img src = {require(`../${product.image}`)}/>
          </div>
        </Link>

          <div className='bloowatch-product-card__button'>
            <button
              disabled = {
                product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity
              }
              className = {
                product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ?
                "bloowatch-product-card__hide-button-disabled" 
                :'bloowatch-product-card__hide-button' 
              }
              onClick={() => increaseProductQuantity(product.id)}
            >
              {
                product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ?
                "Out Of Stock"
                :"Add To Cart"
              }
            </button>
          </div>
          
          <div className='bloowatch-product-card__text'>
            <h4>
              {product.title}
            </h4>
            <p>
              { product.category.map((category) => (`${category} `))}
            </p>
            <div>
              {product.price}
            </div>
          </div>
      </div>
  )
}

export default ProductCard
