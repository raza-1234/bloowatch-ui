import React from "react"

export const validationError = (errorMessage?: string) => {
  return(<p className='bloowatch-login-register__error'>{errorMessage}</p>)
}