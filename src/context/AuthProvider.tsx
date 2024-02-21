import { createContext, useState, useEffect, useContext } from "react";
import api from "../axios/api";
import { AxiosResponse } from "axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { Decoded_Token, UserDetail, Children, AuthContexType } from "../types/types";

const AuthContext = createContext<AuthContexType | undefined>(undefined);

export const AuthProvider = ({children}: Children) => {

  const [userData, setUserData] = useState<UserDetail>({
    accessToken: localStorage.getItem("access_token") || null,
    email: "",
    id: undefined,
    name: ""
  })

  useEffect(() => {  
    if (userData?.accessToken){
      const { userId }: Decoded_Token = jwtDecode(userData.accessToken);
      if ( userId ) {
        getUserData(userData.accessToken, userId);
      }
    }
  }, [userData?.accessToken])

  const getUserData = async (accessToken: string, userId: number): Promise<UserDetail|void> => {
    try {
      const response: AxiosResponse = await api.get(`http://localhost:3500/user-detail/${userId}`,
        { 
          headers: {
            "Authorization" : `Bearer ${accessToken}`
          }
        }
      )      
      setUserData({...userData, ...response.data});
    } catch (err){
      console.log(err);
    }
  }

  return(
    <AuthContext.Provider value={{ getUserData, userData, setUserData}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthData = () => {
  const context = useContext(AuthContext)
  console.log('context', context)
  if(!context) {
    throw new Error('AuthData must in the AuthProvider')
  }

  return context;
}

export default AuthData