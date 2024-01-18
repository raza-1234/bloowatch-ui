import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../axios/api';
import { AxiosResponse } from "axios"
import { ModalName, STATUS_TEXT, FormValues } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { successAlert, errorAlert } from '../utils/toast';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { handleError } from '../utils/ErrorHandler';
import Cookies from 'js-cookie';

const LoginUser = () => {
  const { setAuth }: any = useAuth()

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
        const token: string = Cookies.get("jwt")!; 
        localStorage.setItem("authInfo", JSON.stringify({token, email, password}));
        setAuth({token, email, password});
        successAlert(response.data.message);
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
        {handleError(errors.email?.message)}

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
        {handleError(errors.password?.message)}
        
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
