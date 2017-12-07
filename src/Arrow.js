import React, { Component } from "react";

class Arrow extends Component {
  render() {
    console.log(this.props);
    return (
      <div
        className="GameBoard"
        style={{
          width: "338px",
          height: "338px",
          absolute: "position",
          margin: "auto",
          top: "20vh"
        }}
      >
        <div
          className="BoardLayer"
          style={{
            background: "url(./arrow.png)",
            transform: `rotateZ(${Math.round(-this.props.accWithGrav.xR) +
              180}deg) rotateX(${Math.round(
              -this.props.accWithGrav.zR
            )}deg) rotateY(-60deg) `
          }}
        />
        <div
          className="BoardLayer"
          style={{
            background: "url(./arrow.png)",
            transform: `rotateZ(${Math.round(-this.props.accWithGrav.xR) +
              180}deg) rotateX(${Math.round(
              -this.props.accWithGrav.zR
            )}deg) rotateY(60deg) `
          }}
        />
        <div
          className="BoardLayer"
          style={{
            background: "url(./arrow.png)",
            transform: `rotateZ(${Math.round(-this.props.accWithGrav.xR) +
              180}deg) rotateX(${Math.round(-this.props.accWithGrav.zR)}deg) `
          }}
        />
      </div>
    );
  }
}

export default Arrow;
