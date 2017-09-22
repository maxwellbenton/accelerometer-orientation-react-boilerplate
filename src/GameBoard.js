import React, { Component } from 'react';

class GameBoard extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // e.target.style.backgroundColor === "red" ? e.target.style.backgroundColor = "grey" : e.target.style.backgroundColor = "red"
    if(this.props.selectedPiece !== null) {
      let p = this.props.pieces.filter(piece => piece.type === this.props.selectedPiece)[0]
      let pos = e.target.id.split(',').map(p => parseInt(p))
      this.props.placePiece(p, pos)
    }
  }


  renderBoard() {
    let nb = []
    this.props.board.forEach((row,m) => {
      row.forEach((tile,n) => {
        nb.push(<div className="GameTile" id={`${m},${n}`} style={{top:m*50, left: n*50, backgroundColor: tile.fill }} onClick={this.handleClick}/>)
      })
    })
    return nb
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
