import "../css/ProductDetail.css"
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { AxiosResponse } from 'axios';

import { Product, STATUS_TEXT } from '../types/types'
import { addToCart } from '../utils/addToCart';
import useAuthData from '../context/AuthProvider';
import useCartContextData from '../context/CartContext';
import api from '../axios/api';

const ProductDetail = () => {

  const param = useParams();
  const [availableStock, setAvailableStock] = useState<number>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const { cart, fetchCartProducts } = useCartContextData();
  const { userData } = useAuthData();
  
  const fetchProduct = async() => { 

    try {
      const response: AxiosResponse =
      await api.get(`products/get-product/${param.id}`,
        {headers: {"Authorization" : `Bearer ${userData.accessToken}`}}
      );      
      if (response.statusText === STATUS_TEXT){    
        const available_stock: number = (response?.data?.quantity - response?.data?.cartProducts[0]?.quantity);
        setAvailableStock(available_stock);
        setProduct(response?.data);
      }      
    } catch (err){
      console.log(err);
    }
  }
 
  useEffect(() => {
    fetchProduct();
  }, [])
  
  const cartQuantityHandler = async (productId: number) => {
    await addToCart(productId, quantity, userData.accessToken, userData.id);
    await fetchCartProducts(userData.accessToken, userData.id);
    await fetchProduct();
    setQuantity(1);
  }  

  return (
    <React.Fragment>
      {
        product &&
        <div data-testid = "product_detail_wrapper" className='bloowatch-product__detail-wrapper'>
          <div className='bloowatch-product__image-content'>
            <div className='bloowatch-product__image'>
              <img data-testid = "productImage" src={require(`../${product?.image}`)}/>
            </div>
          </div>

          <div className='bloowatch-product__text-detail'>
            <h3>{product?.title}</h3>

            <div className='bloowatch-product__price'>
              ${product?.price}
            </div>

            <div className='bloowatch-product__cart'>
              <p data-testid = "product-quantity_add-to-cart">{quantity}</p>
              <div className='bloowatch-cart__icons-wrapper'>
                <button data-testid = "increment" disabled = {
                  product?.cartProducts[0] ? 
                    product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ? true
                    :quantity === availableStock
                  :quantity === product?.quantity} 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FaAngleUp/>
                </button>
                <hr/>
                <button data-testid = "decrement" disabled = {quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                  <FaAngleDown/> 
                </button>
              </div>
              <button data-testid = "add_to_cart" disabled = {
                  product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity && true
                }
                className={ 
                  product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ?
                  "bloowatch-cart__disabled-button"
                  :'bloowatch-cart__button'}
                onClick={() => cartQuantityHandler(product.id)}
              >
                { product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ?
                  "Out Of Stock": "Add To Cart"}
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