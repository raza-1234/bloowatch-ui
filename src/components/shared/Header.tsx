import React from 'react'
import { useState } from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import "../../css/Header.css"
import useAuth from '../../hooks/useAuth'
import logOut from '../../utils/logout'

const Header = () => {
  const { auth, setAuth }:any = useAuth();
  const [ showDropDown, setShowDropDown ] = useState(false);

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
          <li>
            <Link className = "bloowatch-header__nav-list-item" to = "/cart">Cart</Link>
          </li>
          { auth?.userEmail ? 
            <div className='bloowatch-header__user' onClick={() => setShowDropDown(!showDropDown)}>
              <li> 
                <h4>{auth?.userName}</h4> 
              </li>
              {
                showDropDown && 
                <div className='bloowatch-header__user-drop-down'>
                  <div className='bloowatch-header__edit-profile'>
                    <Link className = "bloowatch-header__nav-list-item" to = "/edit-user">Edit Profile</Link>
                  </div>
                  <hr/>
                  <div className='bloowatch-header__logout'>
                    <Link className = "bloowatch-header__nav-list-item" to = "/" onClick={LogOut}>Log Out</Link>
                  </div>
                </div>
              }
            </div>

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
