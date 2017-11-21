import React, { Component } from "react";

class GameBoard extends Component {
  render() {
    return (
      <div className="GameBoard" style={{ width: "100vw", height: "100vh" }}>
        <div
          className="BoardLayer"
          style={{
            backgroundColor: "#E33",
            transform: `translateX(${this.props.origin.x}px) translateY(${
              this.props.origin.y
            }px) translateZ(${this.props.origin.z}px) rotateX(${
              this.props.origin.b
            }deg) rotateY(${this.props.origin.g}deg) rotateZ(${
              this.props.origin.a
            }deg)`
          }}
        >
          <div
            style={{
              width: "50%",
              height: "50%",
              position: "absolute",
              top: 0,
              left: 0
            }}
          >
            <h3>A: {this.props.rotation.alpha}</h3>
            <h3>B: {this.props.rotation.beta}</h3>
            <h3>G: {this.props.rotation.gamma}</h3>
          </div>
          <div
            style={{
              width: "50%",
              height: "50%",
              position: "absolute",
              top: 0,
              left: "50%"
            }}
          >
            <h3>A: {this.props.rotationInMotion.alpha}</h3>
            <h3>B: {this.props.rotationInMotion.beta}</h3>
            <h3>G: {this.props.rotationInMotion.gamma}</h3>
          </div>
          <div
            style={{
              width: "50%",
              height: "50%",
              position: "absolute",
              top: "50%",
              left: 0
            }}
          >
            <h3>X: {Math.round(this.props.acceleration.x)}</h3>
            <h3>Y: {Math.round(this.props.acceleration.y)}</h3>
            <h3>Z: {Math.round(this.props.acceleration.z)}</h3>
          </div>
          <div
            style={{
              width: "50%",
              height: "50%",
              position: "absolute",
              top: "50%",
              left: "50%"
            }}
          >
            <h3>X: {this.props.accelerationWithGravity.x}</h3>
            <h3>Y: {this.props.accelerationWithGravity.y}</h3>
            <h3>Z: {this.props.accelerationWithGravity.z}</h3>
          </div>
          <div
            style={{
              width: "50%",
              height: "50%",
              position: "absolute",
              top: "25%",
              left: "25%"
            }}
          >
            <h3>X: {Math.round(this.props.origin.x)}</h3>
            <h3>Y: {Math.round(this.props.origin.y)}</h3>
            <h3>Z: {Math.round(this.props.origin.z)}</h3>
          </div>
        </div>
      </div>
    );
  }
}

// style={{
//   width: "100%",
//   height: "100%",
//   backgroundColor: "#eee",
//   transform: `rotateX(${
//     this.props.rotation.beta
//   }deg) translateZ(-50px)`
// }}

export default GameBoard;
