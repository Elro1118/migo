import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class RegistrationLocal extends Component {
  state = {
    name: '',
    address: '',
    city: '',
    zipcode: '',
    schedule: '',
    local: []
  }
  saveLocal = () => {
    axios
      .post('https://localhost:5001//api/Local', {
        Name: this.state.name,
        Address: this.state.address,
        City: this.state.city,
        Zipcode: this.state.zipcode,
        Schedule: this.state.schedule
      })
      .then(resp => {
        this.setState({
          local: resp.data
        })
      })
  }

  handleChange = event => {
    if (event.target.placeholder == 'Name') {
      this.setState({
        name: event.target.value
      })
    } else if (event.target.placeholder == 'Address') {
      this.setState({
        address: event.target.value
      })
    }
  }

  render() {
    return (
      <>
        <h4>
          <Link to={`/`}>Home</Link> / Local Registration
        </h4>
        <div className="local-registration-section">
          <h2>Local Registration</h2>
          <form onSubmit={this.saveLocal}>
            <div className="form-row">
              <label htmlFor="local">Name:</label>
              <input
                type="text"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="location">Address:</label>
              <input
                type="text"
                placeholder="Address"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="location">City:</label>
              <input
                type="text"
                placeholder="City"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="location">Zip code:</label>
              <input
                type="text"
                placeholder="Zip code"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="schedule">Schedule:</label>
              <input
                type="text"
                placeholder="Schedule"
                onChange={this.handleChange}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </>
    )
  }
}

export default RegistrationLocal
