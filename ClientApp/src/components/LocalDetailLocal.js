import React, { Component } from 'react'

class LocalDetailLocal extends Component {
  render() {
    return (
      <div className="detail-section">
        <h2>Detail</h2>
        <div className="label-detail">
          <label htmlFor="local">
            Place: {this.props.local.name.toUpperCase()}
          </label>
          <label htmlFor="location">
            Address:{' '}
            {this.props.local.address.toUpperCase() +
              ' ' +
              this.props.local.city.toUpperCase() +
              ' ' +
              this.props.local.state.toUpperCase() +
              ' ' +
              this.props.local.zipcode}
          </label>
          <label htmlFor="schedule">
            Schedule: {this.props.local.schedule.toUpperCase()}
          </label>
        </div>
      </div>
    )
  }
}

export default LocalDetailLocal
