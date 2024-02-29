import "../css/Coupon.css"
import React from 'react'
import { AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'

import CustomButton from './shared/CustomButton'
import api from '../axios/api'
import { validationError } from '../utils/validationError'
import { STATUS_TEXT, INVALID_COUPON, CouponDetail, CouponFormValue, COUPON_APPLIED } from '../types/types'
import { errorAlert, successAlert } from '../utils/toast'
import useAuthData from '../context/AuthProvider'

type ParentProp = {
  couponHandler: (value: CouponDetail) => void
}

const Coupon = ({couponHandler}: ParentProp) => {
  const { userData } = useAuthData();
  const form = useForm<CouponFormValue>({defaultValues: {coupon: ""}})
  const { register, handleSubmit, formState, reset } = form;
  const {errors} = formState;

  const submitHandler = async (data: CouponFormValue): Promise<void> => {
    
    try {
      const response: AxiosResponse = await api.get(`http://localhost:3500/coupon/${data.coupon}`, 
        {
          headers: { 'Authorization': `Bearer ${userData?.accessToken}`}
        });

      if (response.statusText === STATUS_TEXT){        
        couponHandler(response.data);
        successAlert(COUPON_APPLIED);
      }
    } catch (err){
      console.log(err);
      if (err.response.data.message === INVALID_COUPON){
        errorAlert(INVALID_COUPON)
      }
    }
  }

  return (
    <div data-testid = "coupon_wrapper" className='bloowatch-coupon__wrapper'>
      <form data-testid = "coupon_form" className='bloowatch-coupon__form' onSubmit={handleSubmit(submitHandler)} noValidate>
        <input
          aria-label="coupon"
          type='text'
          placeholder='Coupon Code'
          {
            ...register("coupon",
            {
              required: "coupon is required.",
              validate: (val: string) => {
                if (!(val.trim())){
                  return "coupon can not be empty"
                }
              }
            }
            )
          }
        />
        {validationError(errors.coupon?.message)}
        <CustomButton
          text = 'Apply'
        />
      </form>
    </div>
  )
}

export default Coupon
