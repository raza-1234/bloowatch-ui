import "../css/ProductDetail.css"
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { AxiosResponse } from 'axios';

import { Product, STATUS_TEXT } from '../types/types'
import { addToCart } from '../utils/addToCart';
import AuthData from '../context/AuthProvider';
import CartContextData from '../context/CartContext';
import api from '../axios/api';

const ProductDetail = () => {

  const param = useParams();
  const [availableStock, setAvailableStock] = useState<number>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const { cart, fetchCartProducts } = CartContextData();
  const { userData } = AuthData();

  const fetchProduct = async() => {    
    try {
      const response: AxiosResponse =
      await api.get(`http://localhost:3500/products/get-product/${param.id}`,
        {headers: {"Authorization" : `Bearer ${userData.accessToken}`}}
      );
      if (response.statusText === STATUS_TEXT){
        const available_stock: number = (response?.data?.quantity - response?.data?.cartProducts[0]?.quantity); // update
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
    await addToCart(productId, quantity);
    fetchCartProducts(userData.accessToken!, userData?.id!);
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
                    product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ? true
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
                className={ 
                  product?.quantity === cart?.cartData?.find((item) => (product.id === item.productId))?.quantity ?
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
