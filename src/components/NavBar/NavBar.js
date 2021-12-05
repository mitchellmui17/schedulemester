import React from 'react'
import logo from "../../assets/images/ScheduleMester-logo/default.png"
import background from "../../assets/images/wallhaven-nkexld-2.png"
import {useAuth} from "../../context/AuthContext"
import './NavBar.css'
import "./../../assets/fonts/font.css"
export default function NavigationBar(){
  const { currentUser } = useAuth();  

    return (

      <nav className="NavbarItems font-style-Alice" style = {{backgroundImage: `url(${background})`}}>
        <h1 className="navbar-logo"><img className="image_1" src={logo} alt="Logo" /></h1>
        <ul className= 'nav-menu'>
        <li>
            <a className={'nav-links'} href={'/'}>
              {'Home'}
            </a>
          </li>
          {currentUser ? <li>
            <a className={'nav-links'} href={'/Calendar'}>
              {'Calendar'}
            </a>
          </li>:''}
          <li>
            <a className={'nav-links'} href={'/ContactUs'}>
              {'About Us'}
            </a>
          </li>
          {currentUser ? <li>
            <a className={'nav-links'} href={'/Profile'}>
              {'Profile'}
            </a>
          </li>:''}
          {currentUser ? '':<li>
            <a className={'nav-links'} href={'/Login'}>
              {'Login'}
            </a></li>}
        </ul>
      </nav>
    )
}

// export default Navbar