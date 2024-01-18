import React from "react"

export const handleError = (errorMessage?: string) => {
  return( <p className='bloowatch-login-register__error'>{errorMessage}</p>)
}