import React, { Component } from 'react';

class GameBoard extends Component {
  constructor () {
    super()

  }

  renderBoard(input = new Array(100).fill("n")) {
    let b = []
    for(var tile in this.props.board) {
      b.push(<div className="GameTile" id={tile} style={{top:this.props.board[tile].pos[0]*50, left: this.props.board[tile].pos[1]*50}} />)
    }
    return b
  }

  render() {
    return (
      <div className="GameBoard">
        {this.renderBoard()}
      </div>
    );
  }
}

export default GameBoard;
