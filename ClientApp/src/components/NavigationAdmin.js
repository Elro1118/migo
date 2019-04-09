import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class NavigationAdmin extends Component {
  render() {
    return (
      <div>
        <h5>
          <Link to={`/`}>Home</Link> /{' '}
          <Link to={`/Admin/${localStorage.getItem('myUserId')}`}> Admin</Link>
        </h5>
      </div>
    )
  }
}

export default NavigationAdmin
