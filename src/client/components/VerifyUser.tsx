import "../css/VerifyUser.css"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { AxiosResponse } from "axios"
import { MdOutlineDomainVerification } from "react-icons/md";

import api from "../axios/api"
import { STATUS_TEXT } from "../types/types"
import { successAlert, errorAlert } from '../utils/toast';

const VerifyUser = () => {
  const {id} = useParams();
  const [emailToken, setEmailToken] = useState("")
  
  async function submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      const response: AxiosResponse = await api.put(`/verification/verify_email/${id}`, {emailToken});
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
    <div data-testid = "user-verification" className="bloowatch-user-verification__wrapper">
      <form data-testid = "user-verification-form" className="bloowatch-user-verification__form" onSubmit={submitHandler}>
        <h3>Verification Code:</h3>
        <div data-testid = "token_input_wrapper" className="bloowatch-user-verification__token">
          <MdOutlineDomainVerification data-testid = "icon" className="bloowatch-user-verification__token-icon" />
          <input
            aria-label="token code"
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
