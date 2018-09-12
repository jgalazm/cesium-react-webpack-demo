import React, { Component } from 'react';
import CesiumGlobe from "./cesium-tsunamilab/CesiumGlobe";
import NamiView from './Nami/Nami.jsx';

class App extends Component {
  state = {
    flyToLocation: null,
    canvasIsReady: false
  }

  componentDidMount() {
    this.setState({ canvasIsReady: true });
  }

  render() {
    const containerStyle = {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'fixed',
    };

    let Nami = this.state.canvasIsReady ? <NamiView canvas={this.simulationCanvas} /> : null;

    return (
      <div style={containerStyle}>
        <CesiumGlobe
          onLeftClick={this.handleLeftClick}
          flyToLocation={flyToLocation}
          canvasIsReady={this.state.canvasIsReady}
          simulationCanvas={this.simulationCanvas}
          simulationVideo={this.simulationVideo}
        />

        {Nami}

        <video autoPlay muted ref={element => this.simulationVideo = element}
          style={{ position: 'absolute', top: 0, visibility: 'hidden' }}>
        </video>

        <canvas ref={element => this.simulationCanvas = element}></canvas>
      </div>
    );
  }
}

export default App;
