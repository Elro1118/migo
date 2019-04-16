import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import NavigationAdmin from './NavigationAdmin'

class UserAdminVolunteers extends Component {
  state = {
    requestStatus: 0,
    volunteers: []
  }

  componentDidMount() {
    this.getVolunteers()
  }

  getVolunteers = () => {
    axios
      .get(`/api/Volunteer/LocalId/${this.props.match.params.idLocal}`)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            requestStatus: resp.status,
            volunteers: resp.data
          })
        }
      })
  }

  deleteVolunteer = event => {
    axios
      .delete(`/api/Volunteer/${event.target.value}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('myUserToken')
        }
      })
      .then(resp => {
        this.getVolunteers()
      })
  }

  render() {
    return (
      <div className="main-LocalList">
        <NavigationAdmin
          userName={localStorage.getItem('userName')}
          history={this.props.history}
        />

        <h1>Manage Volunteers</h1>
        <h5>
          <Link
            to={`/Admin/${localStorage.getItem('myUserId')}`}
            className="sub-link"
          >
            Go back to manage place
          </Link>
        </h5>
        {this.state.volunteers.length > 0 &&
        this.state.requestStatus === 200 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Telephone</th>
                  <th>Email</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {this.state.volunteers.map((m, i) => {
                  return (
                    <tr key={i}>
                      <td>{m.name.toUpperCase()}</td>
                      <td>{m.telephone.toUpperCase()}</td>
                      <td>{m.email.toLowerCase()}</td>
                      <td>
                        <img
                          src={m.photo.toLowerCase()}
                          alt={m.name.toUpperCase()}
                          width="70"
                          height="70"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          value={m.id}
                          onClick={this.deleteVolunteer}
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
            Migo couldn't find results for you. Click{' '}
            <Link to={`/Admin/${localStorage.getItem('myUserId')}`}>here</Link>{' '}
            if you would like to go manage places.
          </div>
        )}
      </div>
    )
  }
}

export default UserAdminVolunteers
