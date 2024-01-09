import React, {FC} from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import "../../css/Header.css"

type ParentProp = {
  isLogIn: boolean
}

const Header = ({isLogIn}: ParentProp) => {
  return (
    <header className='bloowatch-header__wrapper'>
      <div className='bloowatch-header__content'>
        <img src={logo} alt='logo'></img>
        <div className='bloowatch-header__nav-list'>
          <li>
            <Link className = "bloowatch-header__nav-list-item" to = "">Shop</Link>
          </li>          
          <li>
            <Link className = "bloowatch-header__nav-list-item" to = "">Cart</Link>
          </li>
          <li>
            <Link className = "bloowatch-header__nav-list-item" to = "/register">Register</Link>
          </li>
          { isLogIn ? 
            <li>
              <Link className = "bloowatch-header__nav-list-item" to = "/">Log Out</Link>
            </li>
            :<li>
              <Link className = "bloowatch-header__nav-list-item" to = "/">Login</Link>
            </li>
          }
          
        </div>
      </div>
    </header>
  )
}

export default Header
