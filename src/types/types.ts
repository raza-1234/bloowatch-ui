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

//type for paging data object
export type Paging = {
  currentDataCount: number,
  urrentPage: number,
  limit: number,
  moreDate: boolean,
  nextPage: number,
  totalCount: number,
  totalPage: number
}

//types for auth state

export type AuthInfo = {
  token: string,
  email: string,
  password: string
}