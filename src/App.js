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
    north: {
      alpha: 0,
      beta: 0,
      gamma: 0
    },
    score: 0,
    timer: 60,
    point: { a: 0, b: 0, g: 0 },
    loading: null,
    gameStarted: false
  };

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("devicemotion", this.deviceMotionListener);
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }
  }

  deviceMotionListener = event => {
    this.setState({
      rotation: {
        alpha: 50, //Math.round(event.rotationRate.alpha),
        beta: 60, //Math.round(event.rotationRate.beta),
        gamma: 0 //Math.round(event.rotationRate.gamma)
      }
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
