import React, { useContext } from 'react'
import "../css/ProductCard.css"
import { DashboardContextValue, Product } from '../types/types'
import { addToCart } from '../utils/addToCart'
import { Link } from 'react-router-dom'
import { dashboardContext } from '../context/DashboardContext'

type ParentProp = {
  product: Product,
}

const ProductCard = ({product}: ParentProp) => {

  const { fetchProducts }: DashboardContextValue = useContext(dashboardContext)!

  const increaseProductQuantity = async (productId: number): Promise<void> => {
    await addToCart(productId);
    fetchProducts();
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
              disabled = {product?.quantity === product?.cartProducts[0]?.quantity} 
              className = {
                product?.quantity === product?.cartProducts[0]?.quantity? 
                "bloowatch-product-card__hide-button-disabled" 
                :'bloowatch-product-card__hide-button' 
              }
              onClick={() => increaseProductQuantity(product.id)}
            >
              {
                product?.quantity === product?.cartProducts[0]?.quantity ? 
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
