import React from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import "../../css/Header.css"
import useAuth from '../../hooks/useAuth'
import api from '../../axios/api'

const Header = () => {
  const { auth, setAuth }:any = useAuth();

  const logOut = async () => {  
    try {
      await api.get("/logOut");
      localStorage.removeItem("authInfo");
      setAuth();
    } catch (err){
      console.log(err)
    }
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
          <li>
            <Link className = "bloowatch-header__nav-list-item" to = "/register">Register</Link>
          </li>
          { auth?.email ? 
            <li>
              <Link className = "bloowatch-header__nav-list-item" to = "/" onClick={logOut}>Log Out</Link>
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
