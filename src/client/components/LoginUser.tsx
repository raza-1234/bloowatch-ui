import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from "axios"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useForm } from 'react-hook-form';

import api from '../axios/api';
import { ModalName, STATUS_TEXT, RegisterLoginForm } from '../types/types';
import { errorAlert } from '../utils/toast';
import { validationError } from '../utils/validationError';
import useAuthData from '../context/AuthProvider';

const LoginUser = () => {
  const { userData, setUserData } = useAuthData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userData?.accessToken){
      navigate("/shop")
    }
  },[])

  const form = useForm<RegisterLoginForm>({defaultValues: {email: "", password: ""}})
  const { register, handleSubmit, formState, reset, } = form;
  const {errors} = formState;
  const [showPassword, setShowPassword] = useState(false);

  async function submitHandler(data: RegisterLoginForm): Promise<void> {    
    
    const {email, password} = data
    try {
      const response: AxiosResponse = await api.post("/login", {email, password});
      if (response?.statusText === STATUS_TEXT){                                
        const token: string = response?.data?.accessToken;
        localStorage.setItem("access_token", token);   
        setUserData({...userData, accessToken: token})
        reset();
        navigate("/shop");
      }      
    } catch (err){
      console.log(err)
      errorAlert(err.response?.data?.message  || "Something went wrong. Make sure server is running.");
    }
  }

  return (
    <div data-testid = "login_wrapper" className='bloowatch-register-login__wrapper'>
      <form data-testid = "login_form" className='bloowatch-register-login__form' onSubmit={handleSubmit(submitHandler)} noValidate>
        <h3>{ModalName.LOGIN_USER}</h3>

        <div data-testid = "email_input_wrapper" className='bloowatch-register-login__user-email'>
          <MdEmail data-testid = "email_icon" className='bloowatch-register-login__email-icon'/>
          <input
            aria-label='userEmail'
            type='email'
            placeholder='Email'
            {
              ...register("email", 
                {
                  required: "email is required.", 
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  }
                }
              )
            }
          />
        </div>
        {validationError(errors.email?.message)}

        <div data-testid = "password_input_wrapper" className='bloowatch-register-login__user-password'>
          <IoMdLock data-testid = "password_icon" className='bloowatch-register-login__password-icon'/>
          <input
            aria-label='userPassword'
            type= { showPassword ? "text" : "password"}
            placeholder='Password'
            {
              ...register("password",
                {
                  required: "password is required."
                }
              )
            }
          />
          <p data-testid = "control_password_visibilty" onClick={() => setShowPassword(!showPassword)}>{showPassword? "Hide": "Show"}</p>          
        </div>
        {validationError(errors.password?.message)}
        
        <div data-testid = "login_button" className='bloowatch-login-register__button'>
          <button>{ModalName.LOGIN_USER}</button>
        </div>

        <div data-testid = "register_link_wrapper" className='bloowatch-login-register__text'>
          <p>Don't have an account? <span data-testid = "register_link" className='bloowatch-login-register__link'><Link to="/register">{ModalName.REGISTER_USER}</Link></span></p>
        </div>
        
      </form>
    </div>
  )
  
}

export default LoginUser
