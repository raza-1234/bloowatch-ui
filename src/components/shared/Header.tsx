import React, { useState, useContext, useEffect } from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import "../../css/Header.css"
import useAuth from '../../hooks/useAuth'
import logOut from '../../utils/logout'
import { Avatar, Badge } from 'antd';
import { Icon } from '@iconify/react';
import { CartList } from '../../types/types'
import { FaAngleDown } from "react-icons/fa6";

type ParentProp = {
  cartList: CartList[]
}

const Header = ({cartList}: ParentProp) => {
  const { auth, setAuth }:any = useAuth();  
  const [showDropDown, setShowDropDown] = useState(false);
  
  const LogOut = (): void => {
    logOut();
    setAuth();
    setShowDropDown(!showDropDown)
  }

  return (
    <header className='bloowatch-header__wrapper'>
      <div className='bloowatch-header__content'>
        <img src={logo} alt='logo'/>
        <div className='bloowatch-header__nav-list'>
          <li>
            <Link className = "bloowatch-header__nav-list-item" to = "/shop">Shop</Link>
          </li>          
          { auth?.userEmail ? 
            <React.Fragment>
              <li className='bloowatch-header__cart-item'>
                <Link className = "bloowatch-header__nav-list-item" to = "/cart">
                  <Badge showZero count = {cartList.length}>
                    <Avatar style={{backgroundColor: 'transparent', border: "1px solid black" }} shape="square" size={35}>
                      <h4>
                        <Icon icon="ant-design:shopping-cart-outlined" />
                        Cart
                      </h4>
                    </Avatar>
                  </Badge>
                </Link>
              </li>
              <li className='bloowatch-header__dropdown'>
                <div className='bloowatch-header__dropdown-name'  onClick={() => setShowDropDown(!showDropDown)}>
                  {auth?.userName}
                  <FaAngleDown />
                </div>
                {
                  showDropDown &&
                  <div className="bloowatch-header__dropdown-content">
                    <Link to = "/edit-user" onClick={() => setShowDropDown(!showDropDown)}>Edit Profile</Link>
                    <Link to = "/" onClick={LogOut}>Log Out</Link>
                  </div>
                }
              </li>
              {
                showDropDown &&
                <div onClick={() => setShowDropDown(!showDropDown)} className='bloowatch-screen__wrapper'/>
              }
            </React.Fragment>
            :
            <React.Fragment>
              <li>
                <Link className = "bloowatch-header__nav-list-item" to = "/register">Register</Link>
              </li>
              <li>
                <Link className = "bloowatch-header__nav-list-item" to = "/">Login</Link>
              </li>
            </React.Fragment>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
