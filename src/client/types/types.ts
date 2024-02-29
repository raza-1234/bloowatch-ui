export enum ModalName {
  REGISTER_USER = "Register",
  LOGIN_USER = "Login",
  EDIT_USER = "Edit User"
}

export const STATUS_TEXT = "OK"
export const EXPIRED_TOKEN = "token expire" 
export const PRODUCT_NOT_FOUND = "No Product Exist."
export const INCORRECT_PASSWORD = "Wrong Password."
export const INVALID_COUPON = "Invalid coupon."
export const COUPON_APPLIED = "Coupon Applied"


// type for form 
export type RegisterLoginForm = {
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
  price: number, 
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

//user data 
export type EditUserFormValue = {
  name: string,
  email: string,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

//coupon detail
export type CouponDetail = {
  name: string,
  discountPercentage: number
}

//CouponFormValue
export type CouponFormValue = {
  coupon: string
}

//types for children component in context
export type Children = {
  children: JSX.Element | JSX.Element[]
}

//types for cart context
export type CartContextType = {
  cartData: CartList[]
  cartCount?: number
}

//types for cart context provider
export type CartContextProvider = {
  cart: CartContextType
  fetchCartProducts: (accessToken?: string | null, userId?: number) => Promise<void>
}

// type for decode token
export type Decoded_Token = {
  userId: number
}

//type for user detail
export type UserDetail = {
  name?: string,
  email?: string,
  id?: number
  accessToken: string | null
}

//type for auth context
export type AuthContexType = {
  getUserData: (authToken: string | null, userId?: number) => Promise<UserDetail|void>, 
  userData: UserDetail
  setUserData: (value: UserDetail) => void
}

//types for parameter of fetchproduct function
export type QueryParam = {
  page?: string
  price?: string[]
  category?: string
  search?: string
}

//return type for fetchproduct function
export type DataDetail = {
  data: Product[],
  paging: Paging
}