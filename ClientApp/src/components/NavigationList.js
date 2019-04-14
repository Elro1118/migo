import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class NavigationList extends Component {
  render() {
    return (
      <nav className="list-nav">
        <h1>
          <Link to={`/`} className="link">
            MIGO!
          </Link>
        </h1>
        <p>
          <Link to={`/List/${localStorage.getItem('myWord')}`} className="link">
            Place List
          </Link>
        </p>
      </nav>
    )
  }
}

export default NavigationList
