import React, { Component } from 'react'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import pin from '../images/pin.png'

class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 27.7707516,
      longitude: -82.7471989,
      zoom: 12.5
    }
  }

  render() {
    return (
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoiZWxybzExMTgiLCJhIjoiY2p1Y3g5NXplMHQyMTQzcGJqdmtheTJxMiJ9.0evH-ml03aBE3cuwK-O0jQ"
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl
            onViewportChange={viewport => this.setState({ viewport })}
          />
        </div>
        <Marker
          latitude={this.state.viewport.latitude}
          longitude={this.state.viewport.longitude}
          offsetTop={-64}
          offsetLeft={-32}
        >
          <img src={pin} height={64} width={64} alt="Pin" />
        </Marker>
      </ReactMapGL>
    )
  }
}

export default Map
