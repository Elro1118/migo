import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavigationMain extends Component {
  render() {
    return (
      <nav className="main-nav">
        <h1>MIGO!</h1>
        <ul>
          <li>
            <Link className="link" to={`LogIn`}>
              Log In
            </Link>
          </li>
          <li>
            <Link to={`User`}>
              <button className="sign-up-button">Sign Up</button>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavigationMain
