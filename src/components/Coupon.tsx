import React from 'react'
import "../css/Coupon.css"
import CustomButton from './shared/CustomButton'
import api from '../axios/api'
import { useForm } from 'react-hook-form'
import { handleError } from '../utils/ErrorHandler'
import { AxiosResponse } from 'axios'
import { STATUS_TEXT, INVALID_COUPON, CouponDetail, CouponFormValue } from '../types/types'
import { errorAlert, successAlert } from '../utils/toast'

type ParentProp = {
  couponHandler: (value: CouponDetail) => void
}

const Coupon = ({couponHandler}: ParentProp) => {

  const form = useForm<CouponFormValue>({defaultValues: {coupon: ""}})
  const { register, handleSubmit, formState, reset } = form;
  const {errors} = formState;

  const submitHandler = async (data: CouponFormValue): Promise<void> => {
    try {
      const response: AxiosResponse = await api.get(`http://localhost:3500/coupon/${data.coupon}`);
      if (response.statusText === STATUS_TEXT){
        couponHandler(response.data);
        successAlert("Coupon Applied");
      }
    } catch (err){
      console.log(err);
      if (err.response.data.message === INVALID_COUPON){
        errorAlert(INVALID_COUPON)
      }
    }
  }

  return (
    <div className='bloowatch-coupon__wrapper'>
      <form className='bloowatch-coupon__form' onSubmit={handleSubmit(submitHandler)} noValidate>
        <input
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
        {handleError(errors.coupon?.message)}
        <CustomButton
          text = 'Apply'
        /> 
      </form>
    </div>
  )
}

export default Coupon
