import React, { Component } from 'react'
import axios from 'axios'

class LocalDetailVolunteers extends Component {
  state = {
    volunteers: []
  }

  componentDidMount() {
    this.getVolunteers()
  }

  getVolunteers = () => {
    axios.get(`/api/Volunteer/LocalId/${this.props.idLocal}`).then(resp => {
      this.setState({ volunteers: resp.data })
    })
  }
  render() {
    return (
      <div className="volunteer-list">
        <h2>Volunteers</h2>
        <div className="frame-picture">
          {this.state.volunteers.map((m, i) => {
            return (
              <figure key={i}>
                <img src={m.photo} alt={m.name} />
                <figcaption>{m.name.split(' ', 1)}</figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    )
  }
}

export default LocalDetailVolunteers
