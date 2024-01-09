export enum ModalName {
  REGISTER_USER = "Register",
  LOGIN_USER = "Login"
}

export const STATUS_TEXT = "OK"

// type for form 
export type FormValues = {
  name?: string,
  email: string,
  password: string,
  confirmPassword?: string
}

//type for product 
export type Product = {
  id: number,
  image: string,
  price: string, 
  title: string,
  category: string[]
}