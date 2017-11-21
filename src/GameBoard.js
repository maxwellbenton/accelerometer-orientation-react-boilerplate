import React, { Component } from "react";

class GameBoard extends Component {
  render() {
    return (
      <div className="GameBoard" style={{ width: "100vw", height: "100vh" }}>
        <div
          className="BoardLayer"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#eee",
            transform: `rotateX(${
              this.props.rotation.beta
            }deg) translateZ(-50px)`
          }}
        >
          Hey
        </div>
      </div>
    );
  }
}

export default GameBoard;
