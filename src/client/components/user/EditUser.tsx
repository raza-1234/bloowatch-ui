import "../../css/EditUser.css"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from 'react-icons/md';

import { ModalName, EditUserFormValue, INCORRECT_PASSWORD, STATUS_TEXT } from '../../types/types';
import { validationError } from '../../utils/validationError';
import { AxiosResponse } from 'axios';
import api from '../../axios/api';
import { successAlert, errorAlert } from '../../utils/toast';
import useAuthData from '../../context/AuthProvider';

const EditUser = () => {

  const { getUserData, userData } = useAuthData();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [changePassword, setChangePassword] = useState(false);

  const form = useForm<EditUserFormValue>()
  const { register, handleSubmit, formState, resetField, watch } = form;
  const {errors} = formState; 

  const submitHandler = async (data: EditUserFormValue): Promise<void> =>{    
    
    try {
      const response: AxiosResponse = await api.put("http://localhost:3500/edit-user", 
      {
        ...data, confirmPassword: undefined 
      }, 
      {
        headers: {
          "Authorization" : `Bearer ${userData?.accessToken}`
        }
      })

      if (response.statusText === STATUS_TEXT){
        successAlert(response.data.message)

        await getUserData(userData.accessToken, userData?.id) 

        resetField("currentPassword")
        resetField("newPassword")
        resetField("confirmPassword")
      }
    } catch (err){
      console.log(err);
      if (err.response.data.message === INCORRECT_PASSWORD){        
        return errorAlert(INCORRECT_PASSWORD)
      }
    }
  }

  return (
    <div data-testid = "form__wrapper" className='bloowatch-edit-user__wrapper'>
    <form data-testid = "form" className='bloowatch-edit-user__form' onSubmit={handleSubmit(submitHandler)} noValidate>
    <h3>{ModalName.EDIT_USER}</h3>

    <div className='bloowatch-edit-user__user-name'>
    <FaUser className='bloowatch-edit-user__name-icon'/>
      <input
        aria-label="userName"
        type='text'
        placeholder='Name'
        defaultValue={userData?.name}
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

    <div className='bloowatch-register-login__user-email'>
      <MdEmail className='bloowatch-register-login__email-icon'/>
      <input
        aria-label="userEmail"
        readOnly
        type='email'
        placeholder='Email'
        defaultValue={userData?.email}
        {
          ...register("email",
          )
        }       
      />
      </div>

      <div className='bloowatch-edit-user__user-password'>
        <IoMdLock className='bloowatch-edit-user__password-icon'/>
        <input 
          aria-label="userPassword"
          type= { showOldPassword ? "text" : "password"}
          placeholder='Current Password'
          defaultValue=""
          {
            ...register("currentPassword",
              {
                required: "current password is required.",
                validate: (val: string) => {
                  if (!val.trim()) {
                    return "current password can not be empty.";
                  }
                }
              }
            )
          }
        />
        <p onClick={() => setShowOldPassword(!showOldPassword)}>{showOldPassword? "Hide": "Show"}</p>          
      </div>
      {validationError(errors.currentPassword?.message)}

      {
        changePassword && 
        <React.Fragment>
          <div className='bloowatch-edit-user__user-password'>
          <IoMdLock className='bloowatch-edit-user__password-icon'/>
          <input 
            aria-label="newPassword"
            type= { showNewPassword ? "text" : "password"}
            placeholder='New Password'
            defaultValue=""
            {
              ...register("newPassword",
              {
                required: "new password is required.",
                validate: (val: string) => {
                  if (!val.trim()) {
                    return "new password can not be empty.";
                  }
                }
              }
              )
            }
          />
          <p data-testid = "newPasswordVisibility" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword? "Hide": "Show"}</p>          
          </div>
          {validationError(errors.newPassword?.message)}

          <div className='bloowatch-edit-user__user-password'>
          <IoMdLock className='bloowatch-edit-user__password-icon'/>
          <input 
            aria-label= "confirmPassword"
            type= { showConfirmPassword ? "text" : "password"}
            placeholder='Confirm Password'
            defaultValue=""
            {
              ...register("confirmPassword",
                {
                  required: "confirm password is required.",
                  validate: (val: string) => {
                    if (watch('newPassword') !== val) {
                      return "Your new-password and confirm-password do no match";
                    }
                  }
                }
              )
            }
          />
          <p data-testid = "confirmPasswordVisibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword? "Hide": "Show"}</p>          
          </div>
          {validationError(errors.confirmPassword?.message)}
        </React.Fragment>
      }
      
      <div className='bloowatch-edit-user__button'>
        <button>Save Changes</button>
        
        <button type='button' onClick={() => setChangePassword(!changePassword)}>
          {changePassword ? "Hide Password": "Change Password"}
        </button>
        
      </div>
    </form>
    </div>
      
  )
}

export default EditUser

