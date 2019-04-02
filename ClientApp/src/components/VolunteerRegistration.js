import React, { Component } from 'react'
import NavigationList from './NavigationList'
class VolunteerRegistration extends Component {
  render() {
    return (
      <div>
        <NavigationList title="Volunteer Registration" />
        <div className="volunteer-registration-section">
          <h2>Volunteer for Pasadena Church</h2>
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
          </form>
          <button>Save it!</button>
        </div>
      </div>
    )
  }
}

export default VolunteerRegistration
