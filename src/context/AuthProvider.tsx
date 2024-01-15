import Cookies from "js-cookie";
import { createContext, useState } from "react";
import React from "react";
import { AuthInfo } from "../types/types";

  const AuthContext = createContext({});

  export const AuthProvider = ({children}: any) => {
  const [auth, setAuth] = useState<AuthInfo>(JSON.parse(localStorage.getItem("access_token")!));  
  
  return(
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
 }

 export default AuthContext;