import React, { Component } from 'react'
import NavigationHome from './NavigationHome'
import { Link } from 'react-router-dom'
class LogIn extends Component {
  render() {
    return (
      <div>
        <NavigationHome title="Log In" />
        <div className="form-log-in">
          <h1>Log In</h1>
          <form action="">
            <div className="form-row">
              <input type="text" placeholder="Email address" />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Password" />
            </div>
          </form>
          <Link to={`/LoginIn/1`}>
            <button>Log In</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default LogIn
