import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Arrow from "./Arrow";
import "./App.css";

class App extends Component {
  state = {
    screenSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    accWithGrav: {
      x: 1,
      quadrant: 1,
      xR: 1,
      yR: 1,
      zR: 1,
      xSm: 1,
      ySm: 1,
      zSm: 1
    }
  };

  render() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Switch>
          <Route path="/arrow" render={() => <Arrow {...this.state} />} />
          <Redirect to="/arrow" />
        </Switch>
        <div>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "black",
              opacity: ".1",
              top: "0%",
              left: "0%",
              transform: "translateZ(-10px)"
            }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("devicemotion", this.deviceMotionListener);
      window.addEventListener(
        "deviceorientation",
        this.deviceOrientationListener
      );
    } else {
      alert("Sorry, your browser doesn't support Device Orientation");
    }
  }

  deviceMotionListener = event => {
    let ax = event.accelerationIncludingGravity.x;
    let ay = event.accelerationIncludingGravity.y;

    let xGr = event.accelerationIncludingGravity.x / 9.8 * 90;
    let yGr = event.accelerationIncludingGravity.y / 9.8 * 90;
    let zGr = event.accelerationIncludingGravity.z / 9.8 * 90;
    let xRot;
    let quad;

    //counterclockwise from upper right
    //necessary for flipped orientation
    if (ay < 0 && ax > 0) {
      quad = 1;
    }
    if (ay < 0 && ax < 0) {
      quad = 2;
    }
    if (ay > 0 && ax < 0) {
      quad = 3;
    }
    if (ay > 0 && ax > 0) {
      quad = 4;
    }

    switch (quad) {
      case 1:
        xRot = xGr;
        break;
      case 2:
        xRot = xGr;
        break;
      case 3:
        xRot = -90 - (90 + xGr);
        break;
      case 4:
        xRot = 90 + (90 - xGr);
        break;
      default:
        xRot = xGr;
    }

    this.setState(pState => {
      return {
        accWithGrav: {
          x: xGr,
          quadrant: quad,
          xR: xRot,
          yR: yGr,
          zR: zGr
        }
      };
    });
  };
}

export default App;
