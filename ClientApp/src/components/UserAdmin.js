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
        this.setState({
          requestStatus: resp.status,
          locals: resp.data
        })
      })
  }

  deleteLocal = event => {
    axios
      .delete(`/api/Local/${event.target.value}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('myUserToken')
        }
      })
      .then(resp => {
        this.getLocals()
      })
  }

  render() {
    return (
      <div>
        <NavigationAdmin
          userName={localStorage.getItem('userName')}
          history={this.props.history}
        />
        <div className="main-LocalList">
          <h5>
            <Link to={`/Admin/Local/${localStorage.getItem('myUserId')}`}>
              Add Place
            </Link>
          </h5>

          {this.state.locals.length > 0 && this.state.requestStatus === 200 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Address</th>
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
                          <Link to={`/Admin/Volunteers/${m.id}`}>
                            More detail
                          </Link>
                        </td>
                        <td>
                          <Link to={`/Admin/Comments/${m.id}`}>
                            More detail
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            value={m.id}
                            onClick={this.deleteLocal}
                          >
                            X
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
              Migo could not find places to manage. You should add a place to
              manage.
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default UserAdmin
