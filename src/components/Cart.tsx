import "../css/Cart.css"
import React, { useState, useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons';

import { CartList, CouponDetail, STATUS_TEXT } from '../types/types';
import CustomButton from './shared/CustomButton';
import Coupon from './Coupon';
import CartTotal from './CartTotal';
import api from '../axios/api';
import AuthData from '../context/AuthProvider';
import CartContextData from '../context/CartContext';
import { successAlert } from '../utils/toast';

const Cart = () => {
  
  const { cart: { cartData }, fetchCartProducts } = CartContextData();  
  const { userData } = AuthData();

  const [cartList, setCartList] = useState<CartList[] | undefined>()
  const [isCoupon, setIsCoupon] = useState(false)
  const [couponDetail, setCouponDetail] = useState<CouponDetail>()

  useEffect(() => {
    setCartList(cartData)
  }, [cartData])  

  const increaseProductQuantity = async (productId: number): Promise<void> => {
    const updateLocalCart = cartList?.map((cartItem) => {
      return cartItem.productId === productId ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem
    });    
    setCartList(updateLocalCart);
  }

  const decreaseProductQuantity = async (productId: number): Promise<void> => {
    const updateLocalCart = cartList?.map((cartItem) => {
      return cartItem.productId === productId ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem
    });
    setCartList(updateLocalCart);    
  }

  const updateCart = async (): Promise<void> => {
    //for single item
    // const itemToUpdate = cartList?.find(
    //   (item) => item.quantity !== cartData.find((cartItem) => cartItem.productId === item.productId)?.quantity
    // )!;
    // if (!itemToUpdate){
    //   successAlert("Nothing To Update.");
    //   return;
    // }
    // try {
    //   const response = await api.patch(`/cart/updateCart/${userData.id}`,
    //     {
    //       productId: itemToUpdate.productId, 
    //       quantity: itemToUpdate.quantity
    //     }, 
    //     {
    //       headers: {"Authorization" : `Bearer ${userData.accessToken}`}
    //     }
    //   )
    //   if (response.statusText === STATUS_TEXT){
    //     successAlert("Cart Updated.")
    //     fetchCartProducts(userData.accessToken!, userData.id!);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    //for multiple items
    const itemsToUpdate = cartList?.filter(
      (item) => item.quantity !== cartData.find((cartItem) => cartItem.productId === item.productId)?.quantity
    )!;

    if (!itemsToUpdate.length){
      successAlert("Nothing To Update.")
      return;
    }

    try {
      let responseArray =  await Promise.all(
        itemsToUpdate.map(async (item) => (
          await api.patch(`/cart/updateCart/${userData?.id}`,
            {
              productId: item.productId, 
              quantity: item.quantity
            }, 
            {
              headers: {"Authorization" : `Bearer ${userData?.accessToken}`}
            }
          )
        ))
      )
      successAlert("Cart Updated.")
      fetchCartProducts(userData?.accessToken, userData.id);
      console.log(responseArray);
    } catch (err) {
      console.log(err);
    }
  };

  const removeProductFromCart = async (productId: number): Promise<void> => {    
    try {
      const response = await api.delete(`cart/${productId}/removeFromCart/${userData.id}`,
      {headers: {"Authorization" : `Bearer ${userData.accessToken}`}
    })
    if (response.statusText === STATUS_TEXT){
      fetchCartProducts(userData.accessToken, userData.id)
    }
    } catch (err){
      console.log(err);
    }
  }

  const handleCouponField = () => {
    setIsCoupon(!isCoupon)
  } 

  const couponHandler = (data?: CouponDetail): void => {
    setCouponDetail(data);
  }

  const subTotal = (): number => {
    const total_price = cartList?.reduce((acc: number, curr: CartList) => {
      return acc = acc + (curr.product.price * curr.quantity)
    },0)
    return total_price || 0;
  }

  return (
    <>
    <div className='bloowatch-cart-product__wrapper'>
      <div className='bloowatch-cart-table__wrapper'>
        <table className='bloowatch-cart-product__table'>
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Title</th>
              <th>Price ($)</th>
              <th>Quantity</th>
              <th className='description'>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              cartData.length > 0 ?
              cartList?.map((cartProduct: any) => {
                return (
                  <tr
                    key={cartProduct.id}>
                    <td className='bloowatch-cart-product__remove-item'>
                      <CloseOutlined style={{color: "gray"}} onClick={() => removeProductFromCart(cartProduct.productId)}/>
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
              :<tr className='bloowatch-cart-product__empty'>                
                <td>empty cart...</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      {
        cartData.length > 0 &&
        <React.Fragment>
          <div className='bloowatch-cart-coupon__button-wrapper'>
            <div className='bloowatch-cart-button__wrapper'>
              <CustomButton
                text='apply coupon'
                clickHandler = {handleCouponField}
              />
              <CustomButton
                text='update cart'
                clickHandler = {updateCart}
              />
            </div>
            {
              isCoupon &&
              <div className='bloowatch-cart-coupon__form'>
                <Coupon
                  couponHandler = {couponHandler}
                />
              </div>
            }
          </div>
          <CartTotal
            total = {subTotal()}
            couponDetail = {couponDetail}
          />
        </React.Fragment>
      }
    </div>
    </>
  )
}

export default Cart
