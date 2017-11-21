import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import GameBoard from "./GameBoard";
import PlayerView from "./PlayerView";
import "./App.css";

class App extends Component {
  state = {
    screenSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0
    },
    rotationInMotion: {
      alpha: 0,
      beta: 0,
      gamma: 0
    },
    acceleration: {
      x: 0,
      y: 0,
      z: 0
    },
    accelerationWithGravity: {
      x: 0,
      y: 0,
      z: 0
    },
    north: {
      alpha: 0,
      beta: 0,
      gamma: 0
    },
    origin: {
      x: 0,
      y: 0,
      z: 0,
      a: 0,
      b: 0,
      g: 0
    },
    distanceTest: {
      list: []
    }
  };

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("devicemotion", this.deviceMotionListener);
      window.addEventListener(
        "deviceorientation",
        this.deviceOrientationListener
      );
      setInterval(() => {
        this.updateOrigin();
      }, 1000 / 30);
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }
  }

  deviceOrientationListener = event => {
    this.setState({
      rotation: {
        alpha: Math.round(event.alpha),
        beta: Math.round(event.beta),
        gamma: Math.round(event.gamma)
      }
    });
  };

  deviceMotionListener = event => {
    this.setState(pState => ({
      acceleration: {
        x: event.acceleration.x < 0.1 ? 0 : event.acceleration.x,
        y: event.acceleration.y < 0.1 ? 0 : event.acceleration.y,
        z: event.acceleration.z < 0.1 ? 0 : event.acceleration.z
      },
      accelerationWithGravity: {
        x: Math.round(event.accelerationIncludingGravity.x * 10) / 10,
        y: Math.round(event.accelerationIncludingGravity.y * 10) / 10,
        z: Math.round(event.accelerationIncludingGravity.z * 10) / 10
      },
      rotationInMotion: {
        alpha: Math.round(event.rotationRate.alpha),
        beta: Math.round(event.rotationRate.beta),
        gamma: Math.round(event.rotationRate.gamma)
      }
    }));
  };

  updateOrigin = () => {
    this.setState(pState => {
      return {
        origin: {
          ...pState.origin,
          x: 0, //pState.origin.x - pState.acceleration.x,
          y: 0, //pState.origin.y - pState.acceleration.y,
          z: 0, //pState.origin.z - pState.acceleration.z
          a: 0,
          b: 0,
          g: 0
        },
        distanceTest: {
          list: [...pState.distanceTest.list]
        }
      };
    });
  };
  render() {
    return (
      <div className="App">
        <div>
          <GameBoard {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
