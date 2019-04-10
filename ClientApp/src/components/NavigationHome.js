import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavigationHome extends Component {
  render() {
    return (
      <div>
        <h5>
          <Link to={`/`} className="link">
            Home
          </Link>
        </h5>
      </div>
    )
  }
}

export default NavigationHome
