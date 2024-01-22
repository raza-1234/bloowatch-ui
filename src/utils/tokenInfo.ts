import { jwtDecode } from "jwt-decode";
import { AccessToken, DecodeToken } from "../types/types";

export const tokenInfo = () => {
  const access_token: AccessToken = JSON.parse(localStorage.getItem("access_token")!);
  const decoded_token: DecodeToken = jwtDecode(access_token.token)
  console.log(decoded_token);
  
  return {access_token, decoded_token}
}