import React, { useState } from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import "../../css/Header.css"
import useAuth from '../../hooks/useAuth'
import logOut from '../../utils/logout'
import { Avatar, Badge } from 'antd';
import { Icon } from '@iconify/react';
import { CartList } from '../../types/types'
import { FaAngleDown } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

type ParentProp = {
  cartList: CartList[]
}

const Header = ({cartList}: ParentProp) => {
  const { auth, setAuth }:any = useAuth();  
  const [showDropDown, setShowDropDown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const LogOut = (): void => {
    logOut();
    setAuth();
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
        <div className='bloowatch-header__nav-list'>
          <li>
            <Link className = "bloowatch-header__nav-list-item" to = "/shop">Shop</Link>
          </li>          
          { auth?.userEmail ? 
            <React.Fragment>
              <li className='bloowatch-header__cart-item'>
                <Link className = "bloowatch-header__nav-list-item" to = "/cart">
                  <Badge showZero count = {cartList.length}>
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
                  {auth?.userName}
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
                <Link className = "bloowatch-header__nav-list-item" to = "/register">Register</Link>
              </li>
              <li>
                <Link className = "bloowatch-header__nav-list-item" to = "/">Login</Link>
              </li>
            </React.Fragment>
          }
        </div>
        {
          mobileMenu &&
          <div className='bloowatch-header__mobile-menu'>
            <li>
              <Link className = "bloowatch-header__nav-list-item" to = "/shop" onClick={() => setMobileMenu(!mobileMenu)}>Shop</Link>
            </li>          
            { auth?.userEmail ? 
              <React.Fragment>
                <li className='bloowatch-header__cart-item'>
                  <Link className = "bloowatch-header__nav-list-item" to = "/cart" onClick={() => setMobileMenu(!mobileMenu)}>
                    Cart
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
                  <Link className = "bloowatch-header__nav-list-item" to = "/register" onClick={() => setMobileMenu(!mobileMenu)}>Register</Link>
                </li>
                <li>
                  <Link className = "bloowatch-header__nav-list-item" to = "/" onClick={() => setMobileMenu(!mobileMenu)}>Login</Link>
                </li>
              </React.Fragment>
            }
          </div>
        }
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
