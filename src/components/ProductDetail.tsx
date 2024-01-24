import React, {useContext, useEffect, useState} from 'react'
import { dashboardContext } from '../context/DashboardContext'
import { Product, DashboardContextValue } from '../types/types'
import { useParams } from 'react-router-dom'
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { addToCart } from '../utils/addToCart';
import "../css/ProductDetail.css"
import AuthData from '../context/AuthProvider';
import CartContextData from '../context/CartContext';

const ProductDetail = () => {

  const params = useParams();  
  const [availableStock, setAvailableStock] = useState<number>()
  const [quantity, setQuantity] = useState(1);
  const {fetchCartProducts} = CartContextData()

  const {
    products, fetchProducts, category, search, page, price
  }: DashboardContextValue = useContext(dashboardContext)!;

  const {
    userData: {
      id,
      accessToken
    }
  } = AuthData();

  const product = products?.find((product: Product) => (product.id === Number(params.id) && product));

  useEffect(() => {
    if (!products?.length){
      fetchProducts(price, category, search, page);
    }
    if (product?.cartProducts[0]){
      const available_stock: number = (product.quantity - product.cartProducts[0].quantity);
      setAvailableStock(available_stock)
    }
  }, [product])
  
  const cartQuantityHandler = async (productId: number) => {
    await addToCart(productId, quantity);
    fetchProducts(price, category, search, page);
    fetchCartProducts(accessToken!, id);
    setQuantity(1);
  }

  return (
    <React.Fragment>
      {
        product &&
        <div className='bloowatch-product__detail-wrapper'>
          <div className='bloowatch-product__image-content'>
            <div className='bloowatch-product__image'>
              <img src={require(`../${product?.image}`)}/>
            </div>
          </div>

          <div className='bloowatch-product__text-detail'>
            <h3>{product?.title}</h3>

            <div className='bloowatch-product__price'>
              ${product?.price}
            </div>

            <div className='bloowatch-product__cart'>
              <p>{quantity}</p>
              <div className='bloowatch-cart__icons-wrapper'>
                <button disabled = {
                  product?.cartProducts[0] ? 
                    product?.quantity === product?.cartProducts[0]?.quantity ? true
                    :quantity === availableStock
                  :quantity === product?.quantity} 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FaAngleUp/>
                </button>
                <hr/>
                <button disabled = {quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                  <FaAngleDown/>
                </button>
              </div>
              <button disabled = {
                  product?.quantity === product?.cartProducts[0]?.quantity && true
                }
                className={ product?.quantity === product?.cartProducts[0]?.quantity ? 
                  "bloowatch-cart__disabled-button"
                  :'bloowatch-cart__button'}
                onClick={() => cartQuantityHandler(product.id)}
              >
                {product?.quantity === product?.cartProducts[0]?.quantity? "Out Of Stock": "Add To Cart"}
              </button>
            </div>

            <div className='bloowatch-product__category'>
              <h4>categories:</h4>
              <p>
                { product?.category.map((category: any) => (`${category} `))}
              </p>
            </div>
            <div className='bloowatch-product__category'>
              <h4>tags:</h4>
              <p>
                { product?.category.map((category: any) => (`${category} `))}
              </p>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default ProductDetail
