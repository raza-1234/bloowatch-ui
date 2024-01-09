import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../axios/api';
import { AxiosResponse } from "axios"
import { ModalName, STATUS_TEXT } from '../types/types';
import { useNavigate } from 'react-router-dom';

type ParentProps = {
  modalName: string
}

const AuthModal = ({modalName}: ParentProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate();

  const authValidation = (name: string, email: string, password: string, confirmPassword: string): boolean => {
    if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0){
      alert("Require Fields Can Not Be Empty.")
      return false;
    }
    else if (password !== confirmPassword){
      alert("Password And Confirm Password Should Be Same...")
      return false;
    } 
    return true
  }

  const loginValidation = (email: string, password: string ): boolean => {
    if (email.trim().length === 0 || password.trim().length === 0){
      alert("Require Fields Can Not Be Empty.")
      return false;
    } 
    return true
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      let response: AxiosResponse;

      if (modalName === ModalName.REGISTER_USER){
        if (authValidation(name, email, password, confirmPassword)){
          response = await api.post("/register", {name, email, password});
          if (response.statusText = STATUS_TEXT){
            alert(response.data.message)
          }
        }
      }
      else {
        if (loginValidation(email, password)){
          response = await api.post("/login", {email, password});
          if (response.statusText === STATUS_TEXT){
            navigate("/shop")
          }
        }
      }
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err){
      console.log(err);
      alert(err.response.data.message)
    }
  }

  return (
    <div className='sec-auth'>
      <form className='auth-form' onSubmit={submitHandler}>
        <h3>{modalName}</h3>
        {
          modalName === ModalName.REGISTER_USER && 
          <React.Fragment>
          <input 
            required
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br/>
          </React.Fragment>
        }
        <input
          required
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <div className='auth-password'>
          <input 
            required
            type= { showPassword ? "text" : "password"}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p onClick={() => setShowPassword(!showPassword)}>show</p>
        </div>
        
        {
          modalName === ModalName.REGISTER_USER && 
          <div className='auth-password'>
            <input 
              required
              type= { showConfirmPassword ? "text" : "password"}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p onClick={() => setShowConfirmPassword(!showConfirmPassword)}>show</p>
          </div>
        }
        {
          modalName === ModalName.REGISTER_USER && 
          <div className='auth-form-text'>
            <p>By registering up, you confirm that you have read and <br/> accepted our <span className='auth-form-link'>User Notice</span> and <span className='auth-form-link'>Privacy Policy.</span></p>
          </div>
        }
        <button className='modal-button'>{modalName}</button>
        {
          modalName === ModalName.REGISTER_USER ?
          <div className='auth-form-text'>
            <p>Already have an account? <span className='auth-form-link'><Link to = "/">{ModalName.LOGIN_USER}</Link></span></p>
          </div>
          :<div className='auth-form-text'>
            <p>Don't have an account? <span className='auth-form-link'><Link to="/register">{ModalName.REGISTER_USER}</Link></span></p>
          </div>
        }
      </form>
    </div>
  )
}

export default AuthModal
