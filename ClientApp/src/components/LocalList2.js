import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavigationHome from './NavigationHome'
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl'
import pin from '../images/pin.png'

class LocalList extends Component {
  state = {
    searchingWord: this.props.match.params.searchingWord,
    requestStatus: 0,
    locals: [],
    userLocation: null,
    popupInfo: null,
    viewport: {
      latitude: 27.7700989,
      longitude: -82.6364093,
      zoom: 12.5,
      bearing: 0,
      pitch: 0
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords

      this.setState({
        userLocation: { lat: latitude, lng: longitude }
      })
    })
    this.getLocals()
  }

  _updateViewport = viewport => {
    this.setState({ viewport })
  }

  navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  }

  getLocals = () => {
    axios
      .get(`/api/Search/locals?query=${this.state.searchingWord}`)
      .then(resp => {
        this.setState({
          requestStatus: resp.status,
          locals: resp.data.results
        })
        localStorage.setItem('myWord', this.state.searchingWord)
      })
  }
  handleChanged = event => {
    this.setState({ searchingWord: event.target.value })
  }

  renderPopup = () => {
    const { popupInfo } = this.state

    if (!popupInfo) {
      return
    }

    return (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => {
          this.setState({ popupInfo: null })
        }}
      >
        <div className="infobox">
          <p>{popupInfo.name}</p>
          <p>{popupInfo.address}</p>
          <p>{popupInfo.website}</p>
        </div>
      </Popup>
    )
  }

  render() {
    return (
      <div className="main-LocalList">
        <NavigationHome />
        <h1>List of Places Teach English</h1>
        <div className="search-city-section-2">
          <input
            className="text-section"
            type="text"
            placeholder="Enter city or zip code"
            value={this.state.searchingWord}
            onChange={this.handleChanged}
          />
          <button className="button-section" onClick={this.getLocals}>
            Search
          </button>
        </div>
        {this.state.locals.length > 0 && this.state.requestStatus === 200 ? (
          // <ul>
          //   {this.state.locals.map((m, i) => {
          //     return <li key={i}>{m.name.toUpperCase()}</li>
          //   })}
          // </ul>
          <div className="map">
            <ReactMapGL
              {...this.state.viewport}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxApiAccessToken="pk.eyJ1IjoianVhbjIzc2FsYXphciIsImEiOiJjanUyaW0xMWIwY3QxNDRvN3ZnMW91N3BxIn0._YtrtrN7f2ba2F4S3HVL2Q"
              onViewportChange={this._updateViewport}
            >
              {this.renderPopup()}
              {this.state.locals(business => (
                <Marker
                  latitude={business.latitude}
                  longitude={business.longitude}
                  offsetTop={-64}
                  offsetLeft={-32}
                >
                  <img
                    src={pin}
                    height={64}
                    width={64}
                    alt="Pin"
                    onClick={() => {
                      this.setState({ popupInfo: business })
                    }}
                  />
                </Marker>
              ))}
              {this.state.userLocation && (
                <Marker
                  latitude={this.state.userLocation.lat}
                  longitude={this.state.userLocation.lng}
                  offsetTop={-64}
                  offsetLeft={-32}
                >
                  <img width={64} height={64} src={pin} alt="Pin" />
                </Marker>
              )}
              <div className="nav" style={this.navStyle}>
                <NavigationControl onViewportChange={this._updateViewport} />
              </div>
            </ReactMapGL>
          </div>
        ) : this.state.requestStatus === 0 ? (
          <div className="alert alert-info" role="alert">
            Migo is loading results...
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            Migo couldn't find results for you. Click <Link to={`/`}>here</Link>{' '}
            if you would like to go home.
          </div>
        )}
      </div>
    )
  }
}

export default LocalList
