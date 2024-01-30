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
import AuthData from '../context/AuthProvider';

const LoginUser = () => {
  const { userData, setUserData } = AuthData();
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
      if (response.statusText === STATUS_TEXT){                             
        const token: string = response.data.accessToken;
        localStorage.setItem("access_token", token);             
        setUserData({...userData, accessToken: token})
        reset();
        navigate("/shop");
      }      
    } catch (err){
      console.log(err)
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
        {validationError(errors.email?.message)}

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
          <p onClick={() => setShowPassword(!showPassword)}>{showPassword? "Hide": "Show"}</p>          
        </div>
        {validationError(errors.password?.message)}
        
        <div className='bloowatch-login-register__button'>
          <button>{ModalName.LOGIN_USER}</button>
        </div>

        <div className='bloowatch-login-register__text'>
          <p>Don't have an account? <span className='bloowatch-login-register__link'><Link to="/register">{ModalName.REGISTER_USER}</Link></span></p>
        </div>
        
      </form>
    </div>
  )
  
}

export default LoginUser
