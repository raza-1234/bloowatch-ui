import "../css/CartTotal.css"
import React, { useEffect, useState } from 'react'
import { CouponDetail } from '../types/types'

type ParentProp = {
  total: number,
  couponDetail?: CouponDetail
}

const CartTotal = ({total, couponDetail}: ParentProp) => {
  const [newTotal, setNewtotal] = useState<number>()

  useEffect(() => {
    if (couponDetail?.discountPercentage){
      setNewtotal(total - (couponDetail?.discountPercentage * total)/100 || 0);
    }
  }, [couponDetail, total])  

  return (
    <div data-testid = "cart_wrapper" className='bloowatch-cart-total__wrapper'>
      <h1>cart total</h1>
      <div className='bloowatch-cart-total__detail'>
        <h4>Total</h4>
        <h4>{total}$</h4>
      </div>
      {
        couponDetail?.name &&
        <div className='bloowatch-cart-total__detail'>
          <h4>Coupon</h4>
          <h4>{couponDetail?.name}</h4>
        </div>
      }
      <div className='bloowatch-cart-total__detail'>
        <h4>New Total</h4>
        <h4 data-testid = "new_total">{ newTotal ? newTotal: total}$</h4>
      </div>
    </div>
  )
}

export default CartTotal
