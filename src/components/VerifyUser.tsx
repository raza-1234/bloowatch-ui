import { useState } from "react"
import React from 'react'
import api from "../axios/api"
import { AxiosResponse } from "axios"
import { useParams } from "react-router-dom"
import { STATUS_TEXT } from "../types/types"
import "../css/VerifyUser.css"
import { MdOutlineDomainVerification } from "react-icons/md";
import { successAlert, errorAlert } from '../utils/toast';

const VerifyUser = () => {
  const params = useParams();
  const [emailToken, setEmailToken] = useState("")
  
  async function submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      const response: AxiosResponse = await api.put(`/verification/verify_email/${params.id}`, {emailToken});
      if (response.statusText = STATUS_TEXT){
        successAlert(response.data.message);
        setEmailToken("");
      }
    } catch (err){
      console.log(err);
      errorAlert(err.response.data.message)
    }
  }

  return (
    <div className="bloowatch-user-verification__wrapper">
      <form className="bloowatch-user-verification__form" onSubmit={submitHandler}>
        <h3>Verification Code: </h3>
        <div className="bloowatch-user-verification__token">
          <MdOutlineDomainVerification className="bloowatch-user-verification__token-icon" />
          <input
            required
            type='text'
            placeholder='Enter Verification-Token (e.g xxxxxx)'
            value={emailToken}
            onChange={(e) => setEmailToken(e.target.value)}
          />
        </div>
        <button>Verify Email</button>
      </form>
    </div>
  )
}

export default VerifyUser;
