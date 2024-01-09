import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../axios/api';
import { AxiosResponse } from "axios"
import { ModalName, STATUS_TEXT, FormValues } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { successAlert, errorAlert } from '../utils/Toast';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

type ParentProp = {
  handleLogin: (value: boolean) => void
}

const LoginUser = ({handleLogin}: ParentProp) => {
  
  const navigate = useNavigate();
  const form = useForm<FormValues>({defaultValues: {email: "", password: ""}})
  const { register, handleSubmit, formState, reset, } = form;
  const {errors} = formState;

  const [showPassword, setShowPassword] = useState(false);

  async function submitHandler(data: FormValues): Promise<void> {
    const {email, password} = data
    try {
      const response: AxiosResponse = await api.post("/login", {email, password});
      if (response.statusText === STATUS_TEXT){        
        successAlert(response.data.message);
        console.log(Cookies.get("jwt"));
        
        reset()
        handleLogin(true)
        navigate("/shop")
      }      
    } catch (err){
      errorAlert(err.response.data.message);
    }
  }

  return (
    <div className='bloowatch-register-login__wrapper'>
      <form className='bloowatch-register-login__form' onSubmit={handleSubmit(submitHandler)} noValidate>
        <h3>{ModalName.LOGIN_USER}</h3>

        <div className='bloowatch-register-login__user-email'>
          <MdEmail className='bloowatch-register-login__email-icon'/>
          <input
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
        <p className='bloowatch-login-register__error'>{errors.email?.message}</p>

        <div className='bloowatch-register-login__user-password'>
          <IoMdLock className='bloowatch-register-login__password-icon'/>
          <input 
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
          <p onClick={() => setShowPassword(!showPassword)}>show</p>          
        </div>
        <p className='bloowatch-login-register__error'>{errors.password?.message}</p>
        
        <button className='bloowatch-login-register__button'>{ModalName.LOGIN_USER}</button>
        <div className='bloowatch-login-register__text'>
          <p>Don't have an account? <span className='bloowatch-login-register__link'><Link to="/register">{ModalName.REGISTER_USER}</Link></span></p>
        </div>
        
      </form>
    </div>
  )
  
}

export default LoginUser
