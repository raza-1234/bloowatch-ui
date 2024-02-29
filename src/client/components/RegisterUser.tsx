import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from "axios"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { useForm } from "react-hook-form"

import api from '../axios/api';
import { ModalName, STATUS_TEXT, RegisterLoginForm } from '../types/types';
import { successAlert, errorAlert } from '../utils/toast';
import Loader from './shared/Loader';
import { validationError } from '../utils/validationError';
import useAuthData from '../context/AuthProvider';

const RegisterUser = () => {
  const { userData } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.accessToken){
      navigate("/shop")
    }
  },[])
  
  const form = useForm<RegisterLoginForm>({defaultValues: {name: "", email: "", password: "", confirmPassword: ""}});
  const { register, handleSubmit, formState , reset, watch } = form;
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function submitHandler(data: RegisterLoginForm): Promise<void> {
    const {name, email, password} = data

    try {
      setIsLoading(!isLoading)
      let response: AxiosResponse = await api.post("/register", {name: name?.trim(), email, password});
      if (response.statusText === STATUS_TEXT){
        successAlert(response.data.message)
        reset();
      }
      setIsLoading(false);
    } catch (err){
      console.log(err)
      errorAlert(err.response?.data?.message || 'Please Try again. Something went wrong')
      setIsLoading(false);
    }
  }

  return (
    <div data-testid = "register_wrapper" className='bloowatch-register-login__wrapper'>
      <form data-testid = "register_form" className='bloowatch-register-login__form' onSubmit={handleSubmit(submitHandler)} noValidate>
        <h3>{ModalName.REGISTER_USER}</h3>
        
        <div data-testid = "user_name_wrapper" className='bloowatch-register-login__user-name'>
          <FaUser data-testid = "user_name_icon" className='bloowatch-register-login__name-icon'/>
          <input 
            aria-label='userName'
            type='text'
            placeholder='Name'
            {
              ...register("name", 
                {
                  required: "name is required.",
                  validate: (val: string) => {
                    if (!val.trim()) {
                      return "name can not be empty.";
                    }
                  }
                }
              )
            }
          />
        </div>
        {validationError(errors.name?.message)}
        
        <div data-testid = "user_email_wrapper" className='bloowatch-register-login__user-email'>
          <MdEmail data-testid = "user_email_icon" className='bloowatch-register-login__email-icon'/>
          <input
            aria-label='userEmail'
            required
            type='email'
            placeholder='Email'
            {
              ...register("email", 
                {
                  required: "email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'invalid email address',
                  }          
                }
              )
            }
            />
        </div>
        {validationError(errors.email?.message)}
        
        <div data-testid = "user_password_wrapper" className='bloowatch-register-login__user-password'>
          <IoMdLock data-testid = "user_password_icon" className='bloowatch-register-login__password-icon'/>
          <input 
            aria-label='userPassword'
            required
            type= { showPassword ? "text" : "password"}
            placeholder='Password'
            {
              ...register("password",
                {
                  required: "password is required.",
                  validate: (val: string) => {
                    if (!val.trim()) {
                      return "password can not be empty.";
                    }
                  }
                }
              )
            }
          />
          <p data-testid = "control_password_visibility" onClick={() => setShowPassword(!showPassword)}>{showPassword? "Hide": "Show"}</p>
        </div>
        {validationError(errors.password?.message)}


        <div data-testid = "confirm_password_wrapper" className='bloowatch-register-login__user-password'>
          <IoMdLock data-testid = "confirm_password_icon" className='bloowatch-register-login__password-icon'/>
          <input 
            aria-label='confirmPassword'
            required
            type= { showConfirmPassword ? "text" : "password"}
            placeholder='Confirm Password'
            {
              ...register("confirmPassword", 
                {
                  required: "confirm password is required.",
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return "Your passwords do no match";
                    }
                  }
                }
              )
            }
          />
          <p data-testid = "control_confirm_password_visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword? "Hide": "Show"}</p>
        </div>
        {validationError(errors.confirmPassword?.message)}
        
        <div data-testid = "confirmation_text" className='bloowatch-login-register__text'>
          <p>By registering up, you confirm that you have read and <br/> accepted our <span data-testid = "user_notice_link" className='bloowatch-login-register__link'>User Notice</span> and <span data-testid = "privacy_policy_wrapper" className='auth-form-link'>Privacy Policy.</span></p>
        </div>

        <div data-testid = "register_button_wrapper" className='bloowatch-login-register__button'>
          <button disabled={isLoading}>
            {ModalName.REGISTER_USER}
            {isLoading && <Loader/>}
          </button>
        </div>

        <div data-testid = "login_link_wrapper" className='bloowatch-login-register__text'>
          <p>Already have an account? <span data-testid = "login_link" className='bloowatch-login-register__link'><Link to = "/">{ModalName.LOGIN_USER}</Link></span></p>
        </div>

      </form>
    </div>
  )
}

export default RegisterUser
