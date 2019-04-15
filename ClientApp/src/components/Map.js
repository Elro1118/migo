import React, { Component } from 'react'
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'
import pin from '../images/pin.png'

class Map extends Component {
  state = {
    userLocation: null,
    popupInfo: null,
    viewport: {
      latitude: 27.7700989,
      longitude: -82.6364093,
      zoom: 9,
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
          <Link to={`/List/Detail/${popupInfo.id}`} className="link2">
            {' '}
            <p>{popupInfo.name}</p>
          </Link>
          <p>{popupInfo.address}</p>
          <label>
            <Link to={`Volunteer/${popupInfo.id}`} className="link2">
              Apply for volunteer
            </Link>{' '}
            |{' '}
            <Link to={`Comment/${popupInfo.id}`} className="link2">
              Write a comment
            </Link>
          </label>
        </div>
      </Popup>
    )
  }

  render() {
    return (
      <div className="map">
        <ReactMapGL
          {...this.state.viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1IjoiZWxybzExMTgiLCJhIjoiY2p1Y3g5NXplMHQyMTQzcGJqdmtheTJxMiJ9.0evH-ml03aBE3cuwK-O0jQ"
          onViewportChange={this._updateViewport}
        >
          {this.renderPopup()}

          <Marker
            latitude={this.props.local.latitude}
            longitude={this.props.local.longitude}
            offsetTop={-64}
            offsetLeft={-32}
          >
            <img
              src={pin}
              height={32}
              width={32}
              alt="Pin"
              onClick={() => {
                this.setState({ popupInfo: this.props.local })
              }}
            />
          </Marker>

          {this.state.userLocation && (
            <Marker
              latitude={this.state.userLocation.lat}
              longitude={this.state.userLocation.lng}
              offsetTop={-64}
              offsetLeft={-32}
            >
              <i className="fas fa-male" />
            </Marker>
          )}
          <div className="nav" style={this.navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>
        </ReactMapGL>
      </div>
    )
  }
}

export default Map
