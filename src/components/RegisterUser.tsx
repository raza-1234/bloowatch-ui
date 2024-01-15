import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { AxiosResponse } from "axios"
import { ModalName, STATUS_TEXT, FormValues } from '../types/types';
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { successAlert, errorAlert } from '../utils/toast';
import Loader from './shared/Loader';
import { useForm } from "react-hook-form"
import { handleError } from '../utils/ErrorHandler';
import useAuth from '../hooks/useAuth';


const RegisterUser = () => {
  const { auth }: any = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (auth){
      navigate("/shop")
    }
  },[])
  
  const form = useForm<FormValues>({defaultValues: {name: "", email: "", password: "", confirmPassword: ""}});
  const { register, handleSubmit, formState , reset, watch } = form;
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function submitHandler(data: FormValues): Promise<void> {
    const {name, email, password} = data

    try {
      setIsLoading(!isLoading)
      let response: AxiosResponse = await api.post("/register", {name, email, password});
      if (response.statusText === STATUS_TEXT){
        successAlert(response.data.message)
        reset();
      }
      setIsLoading(false);
    } catch (err){
      console.log(err)
      errorAlert(err.response.data.message)
    }
  }

  return (
    <div className='bloowatch-register-login__wrapper'>
      <form className='bloowatch-register-login__form' onSubmit={handleSubmit(submitHandler)} noValidate>
        <h3>{ModalName.REGISTER_USER}</h3>
        
        <div className='bloowatch-register-login__user-name'>
          <FaUser className='bloowatch-register-login__name-icon'/>
          <input 
            type='text'
            placeholder='Name'
            {
              ...register("name", 
                {
                  required: "name is required."
                }
              )
            }
          />
        </div>
        {handleError(errors.name?.message)}
        
        <div className='bloowatch-register-login__user-email'>
          <MdEmail className='bloowatch-register-login__email-icon'/>
          <input
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
        {handleError(errors.email?.message)}
        
        <div className='bloowatch-register-login__user-password'>
          <IoMdLock className='bloowatch-register-login__password-icon'/>
          <input 
            required
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


        <div className='bloowatch-register-login__user-password'>
          <IoMdLock className='bloowatch-register-login__password-icon'/>
          <input 
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
          <p onClick={() => setShowConfirmPassword(!showConfirmPassword)}>show</p>
        </div>
        {handleError(errors.confirmPassword?.message)}
        
        <div className='bloowatch-login-register__text'>
          <p>By registering up, you confirm that you have read and <br/> accepted our <span className='bloowatch-login-register__link'>User Notice</span> and <span className='auth-form-link'>Privacy Policy.</span></p>
        </div>

        <div className='bloowatch-login-register__button'>
          <button disabled={isLoading}>
            {ModalName.REGISTER_USER}  
            {isLoading && <Loader/>}
          </button>
        </div>

        <div className='bloowatch-login-register__text'>
          <p>Already have an account? <span className='bloowatch-login-register__link'><Link to = "/">{ModalName.LOGIN_USER}</Link></span></p>
        </div>

      </form>
    </div>
  )
}

export default RegisterUser
