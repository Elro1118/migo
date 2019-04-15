import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavigationAdmin extends Component {
  logOut = () => {
    localStorage.removeItem('myUserId')

    localStorage.removeItem('userName')

    localStorage.removeItem('myUserToken')

    localStorage.removeItem('myUserTokenExpirationTime')

    this.props.history.push(`/`)
  }

  render() {
    return (
      <nav className="admin-nav">
        <h1>
          <Link to={`/`} className="link">
            MIGO!
          </Link>
        </h1>
        <ul>
          <li>
            <label>{this.props.userName}</label>
          </li>
          <li>
            <button className="sign-up-button" onClick={this.logOut}>
              Logo Out
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavigationAdmin
