export enum ModalName {
  REGISTER_USER = "Register",
  LOGIN_USER = "Login"
}

export const STATUS_TEXT = "OK"
export const RESPONSE_TEXT = "token expire"
export const ERROR_TEXT = "Session Expire! Please Login Again."
export const PRODUCT_STATUS = "No Product Exist."


// type for form 
export type FormValues = {
  name?: string,
  email: string,
  password: string,
  confirmPassword?: string
}

//type for product 
export type Product = {
  cartProducts: CartList[]
  id: number,
  image: string,
  price: string, 
  title: string,
  quantity: number,
  category: string[]
}

//type for paging data object
export type Paging = {
  currentDataCount: number,
  currentPage: number,
  limit: number,
  moreData: boolean,
  nextPage: number,
  totalCount: number,
  totalPage: number
}

//type for auth state
export type AuthInfo = {
  token: string,
  email: string,
  password: string
}


//type for cartList
export type CartList = {
  id: number,
  productId: number,
  quantity: number,
  userId: number,
  createdAt: string,
  updatedAt: string,
  product: Product
}
