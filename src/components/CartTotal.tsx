import React, { useEffect, useState } from 'react'
import { CouponDetail } from '../types/types'
import "../css/CartTotal.css"

type ParentProp = {
  total: number,
  couponDetail: CouponDetail
}

const CartTotal = ({total, couponDetail}: ParentProp) => {

  const [newTotal, setNewtotal] = useState<number>()

  useEffect(() => {
    if (couponDetail?.discountPercentage){
      setNewtotal(total - (couponDetail?.discountPercentage * total)/100);
    }
  }, [couponDetail, total])  

  return (
    <div className='bloowatch-cart-total__wrapper'>
      <h1>cart total</h1>
      <div className='bloowatch-cart-total__detail'>
        <h4>Total</h4>
        <p>{total}$</p>
      </div>
      {
        couponDetail?.name &&
        <div className='bloowatch-cart-total__detail'>
          <h4>Coupon</h4>
          <p>{couponDetail?.name}</p>
        </div>
      }
      <div className='bloowatch-cart-total__detail'>
        <h4>New Total</h4>
        <p>{ newTotal ? newTotal: total}$</p>
      </div>
    </div>
  )
}

export default CartTotal
