import React, { Component } from 'react';

class GameBoard extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.renderOverlay = this.renderOverlay.bind(this)
  }

  handleClick(e) {
    if(this.props.selectedPiece !== null) {
      let pos = e.target.id.split(',').map(p => parseInt(p))
      this.props.placePiece(this.props.selectedPiece, pos)
    }
  }

  handleMouseOver(e) {
    if(this.props.selectedPiece !== null) {
      let pos = e.target.id.split(',').map(p => parseInt(p))
      let posArray = this.props.selectedPiece.shape.map(spot => [pos[0]+spot[0],pos[1]+spot[1]])
      this.props.prieviewPlacement(posArray, pos)
    }
  }

  renderBoard() {
    let nb = []
    this.props.board.forEach((row,m) => {
      row.forEach((tile,n) => {
        nb.push(<div className="GameTile" key={`${m},${n}`} id={`${m},${n}`} style={{top:m*50, left: n*50, backgroundColor: tile.fill }} onClick={this.handleClick} onMouseOver={this.handleMouseOver}/>)
      })
    })
    return nb
  }

  renderOverlay() {
    if(this.props.selectedPiece !== null && this.props.overlayDivs !== null) {
      var newOverlay = []
      if(this.props.overlayDivs.validMove) {
        this.props.overlayDivs.tiles.forEach((div) => {
        newOverlay.push(<div className="OverlayTile" key={`o${div[0]},${div[1]}`} id={`${div[0]},${div[1]}`} style={{top:div[0]*50, left: div[1]*50, backgroundColor: 'white' }} onClick={this.handleClick} onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver}/>)
        })
      }
      return newOverlay
    }
  }

  render() {
     if(this.props.selectedPiece !== null) {
       console.log(this.props.selectedPiece)
     }
   
    return (
        <div className="GameBoard">
          {this.renderBoard()}
          {this.renderOverlay()}
        </div>
    );
  }
}

export default GameBoard;
