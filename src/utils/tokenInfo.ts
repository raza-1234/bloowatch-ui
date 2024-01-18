import { jwtDecode } from "jwt-decode";

export const tokenInfo = () => {
  const access_token: any = JSON.parse(localStorage.getItem("access_token")!);
  const decoded_token: any = jwtDecode(access_token.token)
  return {access_token, decoded_token}
}