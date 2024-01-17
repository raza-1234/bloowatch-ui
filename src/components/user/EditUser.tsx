import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalName, UserFormValue, INCORRECT_PASSWORD, STATUS_TEXT } from '../../types/types';
import { handleError } from '../../utils/ErrorHandler';
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import "../../css/EditUser.css"
import { AxiosResponse } from 'axios';
import api from '../../axios/api';
import useAuth from '../../hooks/useAuth';
import { successAlert, errorAlert } from '../../utils/toast';

const EditUser = () => {
  const form = useForm<UserFormValue>({defaultValues: {name: "", oldPassword: "", newPassword: "", confirmPassword: ""}})
  const { register, handleSubmit, formState, reset, watch } = form;
  const {errors} = formState;

  const { auth, setAuth }: any = useAuth();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = async (data: UserFormValue): Promise<void> =>{
    try {
      const response: AxiosResponse = await api.put("http://localhost:3500/edit-user", {...data, confirmPassword: undefined, email: auth.userEmail }, {headers: {"Authorization" : `Bearer ${auth.token}`}})
      if (response.statusText === STATUS_TEXT){
        successAlert(response.data.message)
        const access_token = JSON.parse(localStorage.getItem("access_token")!);
        access_token.userName = data.name;
        localStorage.setItem("access_token", JSON.stringify(access_token));         
        setAuth(access_token)
        reset();
        return ;
      }
    } catch (err){
      console.log(err);
      if (err.response.data.message === INCORRECT_PASSWORD){        
        return errorAlert(INCORRECT_PASSWORD)
      }
    }
  }

  return (
    <div className='bloowatch-edit-user__wrapper'>
      <form className='bloowatch-edit-user__form' onSubmit={handleSubmit(submitHandler)} noValidate>
      <h3>{ModalName.EDIT_USER}</h3>

      <div className='bloowatch-edit-user__user-name'>
      <FaUser className='bloowatch-edit-user__name-icon'/>
        <input
          type='text'
          placeholder='name'
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
      {handleError(errors.name?.message)}

        <div className='bloowatch-edit-user__user-password'>
          <IoMdLock className='bloowatch-edit-user__password-icon'/>
          <input 
            type= { showOldPassword ? "text" : "password"}
            placeholder='old-password'
            {
              ...register("oldPassword",
                {
                  required: "old password is required.",
                  validate: (val: string) => {
                    if (!val.trim()) {
                      return "old password can not be empty.";
                    }
                  }
                }
              )
            }
          />
          <p onClick={() => setShowOldPassword(!showOldPassword)}>{showOldPassword? "Hide": "Show"}</p>          
        </div>
        {handleError(errors.oldPassword?.message)}

        <div className='bloowatch-edit-user__user-password'>
          <IoMdLock className='bloowatch-edit-user__password-icon'/>
          <input 
            type= { showNewPassword ? "text" : "password"}
            placeholder='new-password'
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
          <p onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword? "Hide": "Show"}</p>          
        </div>
        {handleError(errors.newPassword?.message)}

        <div className='bloowatch-edit-user__user-password'>
          <IoMdLock className='bloowatch-edit-user__password-icon'/>
          <input 
            type= { showConfirmPassword ? "text" : "password"}
            placeholder='confirm-password'
            {
              ...register("confirmPassword",
                {
                  required: "confirmPassword is required.",
                  validate: (val: string) => {
                    if (watch('newPassword') !== val) {
                      return "Your new-password and confirm-password do no match";
                    }
                  }
                }
              )
            }
          />
          <p onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword? "Hide": "Show"}</p>          
        </div>
        {handleError(errors.confirmPassword?.message)}

        <div className='bloowatch-edit-user__button'>
          <button>{ModalName.EDIT_USER}</button>
        </div>
      </form>
    </div>
  )
}

export default EditUser

