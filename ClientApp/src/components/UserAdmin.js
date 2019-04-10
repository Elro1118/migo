import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import NavigationAdmin from './NavigationAdmin'

class UserAdmin extends Component {
  state = {
    requestStatus: 0,
    locals: []
  }

  componentDidMount() {
    this.getLocals()
  }

  getLocals = () => {
    axios
      .get(`/api/Local/ClientId/${localStorage.getItem('myUserId')}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('myUserToken')
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            requestStatus: resp.status,
            locals: resp.data
          })
        }
      })
  }

  deleteLocal = event => {
    axios.delete(`/api/Local/${event.target.value}`).then(resp => {
      if (resp.status === 200) {
        this.getLocals()
      }
    })
  }
  logOut = () => {
    localStorage.removeItem('myUserId')

    localStorage.removeItem('userName')

    localStorage.removeItem('myUserToken')

    localStorage.removeItem('myUserTokenExpirationTime')

    this.props.history.push(`/`)
  }

  render() {
    return (
      <div className="main-LocalList">
        <NavigationAdmin />
        <h1>Migo Admin</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/Admin/Local/${localStorage.getItem('myUserId')}`}>
                Add Local
              </Link>
            </li>

            <li onClick={this.logOut}>
              {localStorage.getItem('userName')}(Log Out)
            </li>
          </ul>
        </nav>
        {this.state.locals.length > 0 && this.state.requestStatus === 200 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Local</th>
                  <th>Location</th>
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
                        <Link to={`/Admin/Volunteers/${m.id}`} className="link">
                          <i className="fas fa-info-circle" />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/Admin/Comments/${m.id}`} className="link">
                          <i className="fas fa-info-circle" />
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          value={m.id}
                          onClick={this.deleteLocal}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : this.state.requestStatus === 0 ? (
          <div className="alert alert-info" role="alert">
            Migo is loading results...
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            Migo couldn't fine results for you. Click it if you would like to go{' '}
            <Link to={`/`}>Home</Link>.
          </div>
        )}
      </div>
    )
  }
}

export default UserAdmin
