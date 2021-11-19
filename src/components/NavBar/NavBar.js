import React, { Component } from 'react'
import { MenuItems } from "./MenuItems"
import logo from "../../assets/images/ScheduleMester-logo/default.png"
import background from "../../assets/images/wallhaven-nkexld-2.png"
import { Button } from "../Button/Button"
import './NavBar.css'
import "./../../assets/fonts/font.css"

class Navbar extends Component {
  state = { clicked: false }

  handleClick = () => {
      this.setState({ clicked: !this.state.clicked })
  }

  render () {
    return (
      <nav className="NavbarItems font-style-Alice" style = {{backgroundImage: `url(${background})`}}>
        <h1 className="navbar-logo"><img className="image_1" src={logo} alt="Logo" /></h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
        <li>
            <a className={'nav-links'} href={'/'}>
              {'Home'}
            </a>
          </li>
          <li>
            <a className={'nav-links'} href={'/ContactUs'}>
              {'About Us'}
            </a>
          </li>
          <li>
            <a className={'nav-links'} href={'/Calendar'}>
              {'Calendar'}
            </a>
          </li>
          <li>
            <a className={'nav-links'} href={'/Profile'}>
              {'Profile'}
            </a>
          </li>
          <li>
            <a className={'nav-links'} href={'/Login'}>
              {'Login'}
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar