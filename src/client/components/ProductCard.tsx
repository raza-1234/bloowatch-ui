import "../css/ProductCard.css"
import React from 'react'
import { Link } from 'react-router-dom'

import { Product } from '../types/types'
import { addToCart } from '../utils/addToCart'
import useCartContextData from '../context/CartContext'
import useAuthData from '../context/AuthProvider'
import { errorAlert } from "../utils/toast"

type ParentProp = {
  product: Product,
}

const ProductCard = ({product}: ParentProp) => {

  const { cart, fetchCartProducts } = useCartContextData();
  const { userData } = useAuthData();

  const addProductInCart = async (productId: number): Promise<void> => {
    try  {
      await addToCart(productId, 1, userData.accessToken, userData.id);
      fetchCartProducts(userData.accessToken, userData.id);
    } catch(err) {
      console.log('Error in product cart', err);
      errorAlert('SomeThing Went wrong!');
    }
  }
  
  return (
    <div data-testid = "product_card_wrapper" className='bloowatch-product-card__wrapper'>
      <Link to = {`/product-detail/${product.id}`}>
        <div className='bloowatch-product-card__image'>
          <img src = {require(`../${product.image}`)} alt="product_img"/>
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
          onClick={() => addProductInCart(product.id)}
        >
          {
            product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ?
            "Out Of Stock"
            :"Add To Cart"
          }
        </button>
      </div>
      
      <div data-testid = "product_detail" className='bloowatch-product-card__text'>
        <h4 data-testid = "product_title">
          {product.title}
        </h4>
        <p data-testid = "product_category">
          { product.category.map((category) => (`${category} `))}
        </p>
        <div data-testid = "product_price">
          {product.price}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
