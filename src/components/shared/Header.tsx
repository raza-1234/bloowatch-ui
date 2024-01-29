import "../../css/Header.css"
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Badge } from 'antd';
import { Icon } from '@iconify/react';
import { FaAngleDown } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

import logo from "../../assets/logo.png"
import logOut from '../../utils/logout'
import AuthData from '../../context/AuthProvider'
import CartContextData from '../../context/CartContext'

const Header = () => {
  const { userData, setUserData } = AuthData();
  const { cart } = CartContextData();
  
  const [showDropDown, setShowDropDown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const LogOut = (): void => {
    logOut();
    setUserData({ accessToken: ''})
    setShowDropDown(!showDropDown)
    setMobileMenu(false)
  }

  const EditProfile = () => {
    setShowDropDown(!showDropDown);
    setMobileMenu(false);
  }

  return (
    <header className='bloowatch-header__wrapper'>
      <div className='bloowatch-header__content'>
        <div className='bloowatch-header__logo'>
          <Link to="/shop">
            <img src={logo} alt='logo'/>
          </Link>
        </div>
        <div className={mobileMenu? "bloowatch-header__mobile-menu": "bloowatch-header__nav-list"}>
          <li>
            <Link
              className = "bloowatch-header__nav-list-item" 
              to = "/shop" 
              onClick={() => setMobileMenu(false)}
            >
              Shop
            </Link>
          </li> 
          { userData?.accessToken ?
            <React.Fragment>
              <li className='bloowatch-header__cart-item'>
                <Link className = "bloowatch-header__nav-list-item" to = "/cart" onClick={() => setMobileMenu(false)}>
                  <Badge showZero count = {cart?.cartCount}>
                    <Avatar style={{backgroundColor: 'transparent', border: "1px solid black" }} shape="square" size={30}>
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
                  {userData?.name}
                  <FaAngleDown />
                </div>
                {
                  showDropDown &&
                  <div className="bloowatch-header__dropdown-content">
                    <Link to = "/edit-user" onClick={EditProfile}>Edit Profile</Link>
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
                <Link 
                  className = "bloowatch-header__nav-list-item" 
                  to = "/register"
                  onClick={() => setMobileMenu(false)}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link 
                  className = "bloowatch-header__nav-list-item" 
                  to = "/"
                  onClick={() => setMobileMenu(false)}
                >
                  Login
                </Link>
              </li>
            </React.Fragment>
          }
        </div>

        {
          mobileMenu && 
          <div onClick={() => setMobileMenu(!mobileMenu)} className='bloowatch-mobile-screen__wrapper'/>
        }

        <div className='bloowatch-header__mobile-view'>
          <GiHamburgerMenu onClick={() => setMobileMenu(!mobileMenu)}/>
        </div>
      </div>
    </header>
  )
}

export default Header
