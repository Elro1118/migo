import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import NavigationHome from './NavigationHome'

class LocalList extends Component {
  state = {
    requestStatus: 0,
    locals: []
  }

  componentDidMount() {
    this.getLocals()
  }

  getLocals = () => {
    axios.get(`https://localhost:5001/api/Local`).then(resp => {
      if (resp.status === 200) {
        this.setState({ requestStatus: resp.status, locals: resp.data })
      }
    })
  }
  render() {
    return (
      <div className="main-LocalList">
        <NavigationHome />
        <h1>Local List</h1>
        {this.state.requestStatus === 200 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Local</th>
                  <th>Location</th>
                  <th>Detail</th>
                  <th>Volunteer</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {this.state.locals.map((m, i) => {
                  return (
                    <tr key={i}>
                      <td>{m.name.toUpperCase()}</td>
                      <td>
                        {m.address.toUpperCase() +
                          ' ' +
                          m.city.toUpperCase() +
                          ' ' +
                          m.state.toUpperCase() +
                          '-' +
                          m.zipcode}
                      </td>
                      <td>
                        <Link
                          to={`Detail/${this.state.locals.id}`}
                          className="link"
                        >
                          <i className="fas fa-info-circle" />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`Volunteer/${this.state.locals.id}`}
                          className="link"
                        >
                          Add
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`Comment/${this.state.locals.id}`}
                          className="link"
                        >
                          Add
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            Migo couldn't fine locals for you. Click it if you would like to go{' '}
            <Link to={`/`}>Home</Link>.
          </div>
        )}
      </div>
    )
  }
}

export default LocalList
