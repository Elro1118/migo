import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import NavigationAdmin from './NavigationAdmin'

class UserAdminComments extends Component {
  state = {
    requestStatus: 0,
    comments: []
  }

  componentDidMount() {
    this.getComments()
  }

  getComments = () => {
    axios
      .get(`/api/Comment/LocalId/${this.props.match.params.idLocal}`)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            requestStatus: resp.status,
            comments: resp.data
          })
        }
      })
  }

  deleteComment = event => {
    axios.delete(`/api/Comment/${event.target.value}`).then(resp => {
      if (resp.status === 200) {
        this.getComments()
      }
    })
  }

  render() {
    return (
      <div className="main-LocalList">
        <NavigationAdmin />
        <h1>Manage Comments</h1>
        {this.state.comments.length > 0 && this.state.requestStatus === 200 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.comments.map((m, i) => {
                  return (
                    <tr key={i}>
                      <td>{m.description.toUpperCase()}</td>

                      <td>
                        <button
                          className="btn btn-danger"
                          value={m.id}
                          onClick={this.deleteComment}
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
            <Link to={`/Admin/${localStorage.getItem('myUserId')}`}>Admin</Link>
            .
          </div>
        )}
      </div>
    )
  }
}

export default UserAdminComments
