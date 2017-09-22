import React, { Component } from 'react';

class PlayerView extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  renderPieces() {
    return(
      this.props.pieces.map((piece) => {
        return <div className="playerPiece" id={piece.type} name={piece.type} onClick={this.handleClick}>{piece.type}</div>
      })
    )
  }

  handleClick(e) {
      this.props.selectPiece(e.target.id)
  }

  render() {
    return (
      <div className="PlayerView">
        <h3 onClick={this.props.rotatePiece}>ROTATE PIECE</h3>
        {this.renderPieces()}
      </div>
    );
  }
}

export default PlayerView;
