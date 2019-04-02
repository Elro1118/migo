import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavigationHome from './NavigationHome'
class LocalList extends Component {
  render() {
    return (
      <div className="main-LocalList">
        <NavigationHome title="List" />
        <h1>Local List</h1>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Local</th>
                <th>Location</th>
                <th>Volunteer</th>
                <th>Comment</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pasadena Church</td>
                <td>227 70th St S, St Petersburg, FL 33707</td>
                <td>
                  <Link to={`Volunteer/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Comment/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Detail/1`} className="link">
                    <i className="fas fa-info-circle" />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Pasadena Church</td>
                <td>227 70th St S, St Petersburg, FL 33707</td>
                <td>
                  <Link to={`Volunteer/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Comment/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Detail/1`} className="link">
                    <i className="fas fa-info-circle" />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Pasadena Church</td>
                <td>227 70th St S, St Petersburg, FL 33707</td>
                <td>
                  <Link to={`Volunteer/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Comment/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Detail/1`} className="link">
                    <i className="fas fa-info-circle" />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Pasadena Church</td>
                <td>227 70th St S, St Petersburg, FL 33707</td>
                <td>
                  <Link to={`Volunteer/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Comment/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Detail/1`} className="link">
                    <i className="fas fa-info-circle" />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Pasadena Church</td>
                <td>227 70th St S, St Petersburg, FL 33707</td>
                <td>
                  <Link to={`Volunteer/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Comment/1`} className="link">
                    Add
                  </Link>
                </td>
                <td>
                  <Link to={`Detail/1`} className="link">
                    <i className="fas fa-info-circle" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default LocalList
