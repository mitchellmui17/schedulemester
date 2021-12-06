import React, { Component, useState } from 'react'
import logo from "../../assets/images/ScheduleMester-logo/default.png"
import background from "../../assets/images/wallhaven-0jp1j5_trim2.png"
import {Link} from 'react-router-dom'
import {useAuth} from "../../context/AuthContext"
import Fire from "../../firebase"
import './NavBar.css'
import "./../../assets/fonts/font.css"
import { Navbar } from 'react-bootstrap'

export default function NavigationBar(){
  const { currentUser } = useAuth()  
  let database = Fire.db
  const [position, setPosition] = useState("");

  // handleClick = () => {
  //     this.setState({ clicked: !this.state.clicked })
  // }

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