import React, { Component } from 'react';

class GameBoard extends Component {
  constructor () {
    super()
    this.state = {
      overlayDivs: null,
      validMove: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
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
      let newOverlay = []
      for(let p = 0; p < posArray.length; p++) {
        if(pos[0]+this.props.selectedPiece.shape[p][0] < 10 && pos[0]+this.props.selectedPiece.shape[p][0] > -1 && pos[1]+this.props.selectedPiece.shape[p][1] < 10 && pos[1]+this.props.selectedPiece.shape[p][1] > -1) {
          newOverlay.push([pos[0]+this.props.selectedPiece.shape[p][0], pos[1]+this.props.selectedPiece.shape[p][1]])
        } else {
          continue;
        }
      }
      if(newOverlay.length === posArray.length) {
        this.setState(() => {
          return {overlayDivs: {tiles: newOverlay, validMove: true}}
        })
      } else {
        this.setState(() => {
          return {overlayDivs: {tiles: newOverlay, validMove: false}}
        })
      }
    }
  }
  handleMouseOut(e) {
    debugger
    this.handleMouseOver(e)
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
    if(this.props.selectedPiece !== null && this.state.overlayDivs !== null) {
      
      var newOverlay = []
      if(this.state.overlayDivs.validMove) {
        this.state.overlayDivs.tiles.forEach((div) => {
        newOverlay.push(<div className="OverlayTile" key={`o${div[0]},${div[1]}`} id={`o${div[0]},${div[1]}`} style={{top:div[0]*50, left: div[1]*50, backgroundColor: 'white' }} onMouseLeave={this.handleMouseOver}/>)
        })
      } else {
        debugger
        newOverlay.push(<div className="OverlayTile" key={`o${this.state.overlayDivs.tiles[0][0]},${this.state.overlayDivs.tiles[0][1]}`} id={`o${this.state.overlayDivs.tiles[0][0]},${this.state.overlayDivs.tiles[0][1]}`} style={{top:this.state.overlayDivs.tiles[0][0]*50, left: this.state.overlayDivs.tiles[0][1]*50, backgroundColor: 'red' }} onMouseLeave={this.handleMouseOver}/>)
      }
      console.log(newOverlay)
      return newOverlay
    }
  }

  render() {
    return (
      //<div className="boardWrapper">
        <div className="GameBoard">
          {this.renderBoard()}
          {this.renderOverlay()}
        </div>
      //</div>
    );
  }
}

export default GameBoard;
