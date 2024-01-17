import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react'
import api from '../axios/api';
import useAuth from '../hooks/useAuth';
import { CloseOutlined } from '@ant-design/icons';
import { CartList, CouponDetail } from '../types/types';
import "../css/Cart.css"
import { addToCart } from '../utils/addToCart';
import { tokenInfo } from '../utils/tokenInfo';
import CustomButton from './shared/CustomButton';
import Coupon from './Coupon';
import CartTotal from './CartTotal';

const Cart = () => {
  const {auth}: any = useAuth();
  const [cartList, setCartList] = useState<CartList[]>([]);
  const [isCoupon, setIsCoupon] = useState(false)
  const [ couponDiscount, setCouponDiscount] = useState<number | undefined>()
  const [couponDetail, setCouponDetail] = useState<CouponDetail>()

  const { 
    decoded_token: {
      userId
    }
  } = tokenInfo();

  useEffect(() => {
    fetchCartProducts();
  }, [])
  
  const fetchCartProducts = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await api.get(`cart/getAllCartProducts/${userId}`, {headers: {"Authorization" : `Bearer ${auth.token}`} })
      setCartList(response.data)
    } catch (err: any){
      console.log(err);
    }
  }

  const increaseProductQuantity = async (productId: number): Promise<void> => {
    await addToCart(productId);
    await fetchCartProducts();
  }

  const decreaseProductQuantity = async (productId: number): Promise<void> => {
    try {
      await api.delete(`cart/${productId}/removeFromCart/${userId}`, {headers: {"Authorization" : `Bearer ${auth.token}`} })
      fetchCartProducts()
    } catch (err){
      console.log(err);
    }
  }

  const unCartProduct = async (productId: number): Promise<void> => {
    try {
      await api.delete(`cart/${productId}/unCart/${userId}`, {headers: {"Authorization" : `Bearer ${auth.token}`}})
      fetchCartProducts();
    } catch (err){
      console.log(err);
    }
  }

  const handleCouponField = () => {
    setIsCoupon(!isCoupon)
  } 

  const subTotal = () => {
    const total_price = cartList.reduce((acc, curr) => {
      return acc = acc + (curr.product.price * curr.quantity)
    },0)
    return total_price;
  }

  const couponHandler = (data?: CouponDetail): void => {
    setCouponDetail(data);
  }

  return (
    <div className='bloowatch-cart-product__wrapper'>
      <div className='bloowatch-cart-table__wrapper'>
        <table className='bloowatch-cart-product__table'>
          <thead>
            <tr>
              <th className='bloowatch-cart-product__delItem'></th>
              <th>Product</th>
              <th>Title</th>
              <th>Price ($)</th>
              <th>Quantity</th>
              <th className='description'>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              cartList.length > 0 ?
              cartList.map((cartProduct) => {
                return (
                  <tr
                    key={cartProduct.id}>
                    <td className='bloowatch-cart-product__remove-item'>
                      <CloseOutlined style={{color: "gray"}} onClick={() => unCartProduct(cartProduct.productId)}/>
                    </td>
                    <td className='bloowatch-cart-product__image'>
                      <img src = {require(`../${cartProduct.product.image}`)}/>
                    </td>
                    <td>
                      <h5>{cartProduct.product.title}</h5>
                    </td>
                    <td>
                      <h5>{cartProduct.product.price}</h5>
                    </td>
                    <td className='bloowatch-cart-product__quantity-handler'>
                      <React.Fragment>
                        <button 
                          disabled={cartProduct.quantity === 1}
                          onClick = {() => decreaseProductQuantity(cartProduct.productId)}
                          className ={cartProduct.quantity === 1 ? "bloowatch-button__disabled": "bloowatch-button"}
                        > 
                        - 
                        </button>
                        <p>{cartProduct.quantity}</p>
                        <button 
                          disabled={cartProduct.quantity === cartProduct.product.quantity} 
                          onClick={() => increaseProductQuantity(cartProduct.productId)}
                          className ={cartProduct.quantity === cartProduct.product.quantity ? "bloowatch-button__disabled": "bloowatch-button"}
                        >
                        +
                        </button>
                      </React.Fragment>
                    </td>
                    <td>
                      <p>{cartProduct.product.price * cartProduct.quantity} $</p>
                    </td>
                  </tr>
                )
              })
              :<tr>                
                <td>No Data Exist...</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      {
        cartList.length > 0 &&
        <div className='bloowatch-cart-button__wrapper'>
          <CustomButton
            text='apply coupon'
            clickHandler = {handleCouponField}
          />
          <CustomButton
            text='update cart'
            clickHandler = {handleCouponField}
          />
        </div>
      }
      {
        isCoupon &&
        <Coupon
          couponHandler = {couponHandler}
        />
      }
      {
        cartList.length > 0 && 
        <CartTotal
          total = {subTotal()!}
          couponDetail = {couponDetail!}
        />
      }
    </div>
  )
}

export default Cart
