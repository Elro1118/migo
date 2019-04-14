import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavigationHome extends Component {
  render() {
    return (
      <nav className="home-nav">
        <h1>
          <Link to={`/`} className="link">
            MIGO!
          </Link>
        </h1>
      </nav>
    )
  }
}

export default NavigationHome
