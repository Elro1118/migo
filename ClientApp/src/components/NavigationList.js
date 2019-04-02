import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class NavigationList extends Component {
  render() {
    return (
      <div>
        <h5>
          <Link to={`/`}>Home</Link> / <Link to={`/List/1`}> List</Link>
        </h5>
      </div>
    )
  }
}

export default NavigationList
