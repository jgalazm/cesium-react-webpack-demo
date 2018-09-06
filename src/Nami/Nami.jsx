import React, { Component } from 'react';
import logo from './logo.svg';
import './Nami.css';
import {app} from './lib/Nami.js';

class NamiView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulationIsReady: false
    }

    // this.simulationCanvas = React.createRef();

    this.niterations = -1;

    this.app;

    

  }
  componentDidMount() {

    this.data = {
      bathymetry: '/bathymetry.png',
      bathymetryMetadata: {
        zmin: -6709,
        zmax: 10684
      },
      earthquake: [{
        depth: 22900,
        strike: 17,
        dip: 13.0,
        rake: 108.0,
        U3: 0.0,
        cn: -36.122,   //centroid N coordinate, e
        ce: -72.898,
        Mw: 9,
        reference: 'mid bottom'
      }],
      coordinates: 'spherical',
      waveWidth: parseInt(2159),
      waveHeight: parseInt(960),
      displayWidth: parseInt(2159),
      displayHeight: parseInt(960),
      xmin: -179.99166666666667,
      xmax: 179.67499999999998,
      ymin: -79.991666666666646,
      ymax: 79.841666666666654,
      isPeriodic: true,
      canvas : this.simulationCanvas
    }
    this.output = {
      stopTime: 30 * 60 * 60,
      displayOption: 'heights',
      loop: true
  };
    this.lifeCycle = {
      dataWasLoaded: (model) => {
        /* simulation */
        console.log('data was loaded');

      },
      modelStepDidFinish: (model, controller) => {
        // videoLayer.rectangle.material = model.canvas;

        if (model.discretization.stepNumber % 1000 == 0) {
          // console.log(model.currentTime/60/60, controller.stopTime/60/60);
        }
        this.niterations = this.niterations + 1;

        if (this.niterations % 10 == 0) {
          this.niterations = 0;
          return false;
        }
        else {
          return true;
        }

      },

      modelSimulationWillStart: (model, controller) => {
        console.log('modelSimulationWillStart');
      },

      iterationDidFinish: (model, controller, animate) => {
        requestAnimationFrame(animate);
      }
    }
    this.app = new app(this.data, this.output, this.lifeCycle);
  }

  render() {
    return (
          <canvas ref={ element => this.simulationCanvas = element }></canvas>
    );
  }
}

export default NamiView;
