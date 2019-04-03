import React, { Component } from 'react'
import axios from 'axios'
import NavigationList from './NavigationList'

import imageMarlene from '../images/Marlenes.jpg'
import imageTeresa from '../images/Teresas.jpg'
import imageSilvana from '../images/Silvanas.jpg'

class LocalDetail extends Component {
  state = {
    requestStatus: 0,
    local: {},
    volunteers: [],
    comments: []
  }
  componentDidMount() {
    this.getLocal()
    // this.getVolunteers()
    // this.getComments()
  }

  getLocal = () => {
    axios.get(`https://localhost:5001/api/Local/1`).then(resp => {
      if (resp.status === 200) {
        this.setState({ requestStatus: resp.status, local: resp.data })
      }
    })
  }
  // getComments = () => {
  //   axios.get(`https://localhost:5001/api/Local${1}`).then(resp => {
  //     if (resp.status === 200) {
  //       this.setState({ requestStatus: resp.status, comments: resp.data })
  //     }
  //   })
  // }
  // getVolunteers = () => {
  //   axios.get(`https://localhost:5001/api/Local${1}`).then(resp => {
  //     if (resp.status === 200) {
  //       this.setState({ requestStatus: resp.status, volunteers: resp.data })
  //     }
  //   })
  // }

  render() {
    return (
      <div>
        <NavigationList title="Detail" />
        <div className="main-section">
          <div className="detail-volunteer">
            <div className="detail-section">
              <h2>Detail</h2>
              <div className="label-detail">
                <label htmlFor="local">Local: {this.state.local.name}</label>
                <label htmlFor="location">
                  Location:
                  {this.state.local.address +
                    ' ' +
                    this.state.local.city +
                    ' ' +
                    this.state.local.state +
                    '-' +
                    this.state.local.zipcode}
                </label>
                <label htmlFor="schedule">
                  Schedule:{this.state.local.address}
                </label>
              </div>
            </div>
            <div className="volunteer-list">
              <h2>Volunteers</h2>
              <div className="frame-picture">
                <img src={imageMarlene} alt="Marlene" />
                <img src={imageMarlene} alt="Marlene" />
                <img src={imageMarlene} alt="Marlene" />
                <img src={imageTeresa} alt="Teresa" />
                <img src={imageTeresa} alt="Teresa" />
                <img src={imageTeresa} alt="Teresa" />
                <img src={imageSilvana} alt="Silvana" />
                <img src={imageSilvana} alt="Silvana" />
                <img src={imageSilvana} alt="Silvana" />
              </div>
            </div>
          </div>
          <div className="comment-list">
            <h2>Comments</h2>
            <ul>
              <li>
                Maritza: Las clases son gratis, las profesoras son un amor y
                siempre estan compartiendo snacks con los alumnos.
              </li>
              <li>
                Odoris: Me encanta este lugar porque las pesonas que enseñan
                aquí son amables y acojedores. Además de hay cafe gratis todos
                los refrigerios.
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default LocalDetail
