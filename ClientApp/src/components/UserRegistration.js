import React, { Component } from 'react'
import NavigationHome from './NavigationHome'
class UserRegistration extends Component {
  render() {
    return (
      <div>
        <NavigationHome title="Sign Up" />
        <div className="volunteer-registration-section">
          <h2>Sign Up</h2>
          <form action="">
            <div className="form-row">
              <label htmlFor="name">Name:</label>
              <input type="text" placeholder="Full name" />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone:</label>
              <input type="text" placeholder="111-222-3333" />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input type="text" placeholder="myemail@gmail.com" />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder="......" />
            </div>
          </form>
          <button>Save it!</button>
        </div>
      </div>
    )
  }
}

export default UserRegistration
