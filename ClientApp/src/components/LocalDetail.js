import React, { Component } from 'react'
import axios from 'axios'
import NavigationList from './NavigationList'

class LocalDetail extends Component {
  state = {
    requestStatus: 0,
    local: { address: '', state: '', city: '', name: '', schedule: '' },
    volunteers: [],
    comments: []
  }
  componentDidMount() {
    this.getLocal()
    this.getVolunteers()
    this.getComments()
  }

  getLocal = () => {
    axios.get(`/api/Local/${this.props.match.params.idLocal}`).then(resp => {
      this.setState({ requestStatus: resp.status, local: resp.data })
    })
  }
  getComments = () => {
    axios
      .get(`/api/Comment/LocalId/${this.props.match.params.idLocal}`)
      .then(resp => {
        this.setState({ requestStatus: resp.status, comments: resp.data })
      })
  }
  getVolunteers = () => {
    axios
      .get(`/api/Volunteer/LocalId/${this.props.match.params.idLocal}`)
      .then(resp => {
        this.setState({ requestStatus: resp.status, volunteers: resp.data })
      })
  }

  render() {
    return (
      <div>
        <NavigationList />
        <div className="main-section">
          <div className="detail-volunteer">
            <div className="detail-section">
              <h2>Detail</h2>
              <div className="label-detail">
                <label htmlFor="local">
                  Local: {this.state.local.name.toUpperCase()}
                </label>
                <label htmlFor="location">
                  Location:
                  {this.state.local.address.toUpperCase() +
                    ' ' +
                    this.state.local.city.toUpperCase() +
                    ' ' +
                    this.state.local.state.toUpperCase() +
                    '-' +
                    this.state.local.zipcode}
                </label>
                <label htmlFor="schedule">
                  Schedule:{this.state.local.schedule.toUpperCase()}
                </label>
              </div>
            </div>
            <div className="volunteer-list">
              <h2>Volunteers</h2>
              <div className="frame-picture">
                {this.state.volunteers.map((m, i) => {
                  return (
                    <figure key={i}>
                      <img src={m.photo} alt={m.name} />
                      <figcaption>{m.name}</figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="comment-list">
            <h2>Comments</h2>
            <ul>
              {this.state.comments.map((m, i) => {
                return <li key={i}> {m.description} </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default LocalDetail
