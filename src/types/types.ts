export enum ModalName {
  REGISTER_USER = "Register",
  LOGIN_USER = "Login",
  EDIT_USER = "Edit User"
}

export const STATUS_TEXT = "OK"
export const RESPONSE_TEXT = "token expire"
export const ERROR_TEXT = "Session Expire! Please Login Again."//
export const PRODUCT_STATUS = "No Product Exist."
export const INCORRECT_PASSWORD = "old password is not correct."
export const INVALID_COUPON = "Invalid coupan."


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

//type for auth state
//types for auth state

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

//user data
export type UserFormValue = {
  name: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

//dashboard context type
export type DashboardContextValue = {
  products: Product[], 
  pagingInfo?: Paging,
  search: string,
  setSearch: any,
  category: string,
  setCategory: any,
  page?: number,
  setPage: any,
  fetchProducts: () => void
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