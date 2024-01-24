import { jwtDecode } from "jwt-decode";
import { Decoded_Token } from "../types/types";

export const tokenInfo = () => {
  const access_token: string = localStorage.getItem("access_token")!;
  const decoded_token: Decoded_Token = jwtDecode(access_token);
  return {access_token, decoded_token}
}