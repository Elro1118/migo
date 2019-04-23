import React, { Component } from 'react'
import axios from 'axios'
import NavigationList from './NavigationList'
import Map from './Map'
import LocalDetailComments from './LocalDetailComments'
import LocalDetailVolunteers from './LocalDetailVolunteers'
import LocalDetailLocal from './LocalDetailLocal'

class LocalDetail extends Component {
  state = {
    local: {
      address: '',
      state: '',
      city: '',
      name: '',
      schedule: '',
      zipcode: '',
      latitude: 27.7700989,
      longitude: -82.6364093
    }
  }
  componentDidMount() {
    this.getLocal()
  }

  getLocal = () => {
    axios.get(`/api/Local/${this.props.match.params.idLocal}`).then(resp => {
      this.setState({ local: resp.data })
    })
  }

  render() {
    return (
      <div className="detail-main">
        <NavigationList />
        <div className="main-section">
          <div className="detail-volunteer">
            <LocalDetailLocal local={this.state.local} />
            <LocalDetailVolunteers idLocal={this.props.match.params.idLocal} />
          </div>
          <LocalDetailComments idLocal={this.props.match.params.idLocal} />
        </div>
        <Map local={this.state.local} />
      </div>
    )
  }
}

export default LocalDetail
