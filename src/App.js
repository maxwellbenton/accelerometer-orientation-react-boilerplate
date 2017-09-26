import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Navigation from './Navigation'
import GameBoard from './GameBoard'
import PlayerView from './PlayerView'
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      board: (() => {

        let b = new Array(10)
        for(let m = 0; m < 10; m++) {
          b[m] = new Array(10)
          for(let n = 0; n < 10; n++) {
            b[m][n] = {fill: "#EEE", owner: "none"}
          }
        }
        return b
      })(),
      prevBoard: (() => {

        let b = new Array(10)
        for(let m = 0; m < 10; m++) {
          b[m] = new Array(10)
          for(let n = 0; n < 10; n++) {
            b[m][n] = {fill: "#EEE", owner: "none"}
          }
        }
        return b
      })(),
      previewDivs: null,
      pieces: (() => {
        let b = []
        b.push({shape:[[0,0]], type: "house"})
        b.push({shape:[[0,0]], type: "house2"})
        b.push({shape:[[0,0],[1,0]], type: "aparments"})
        b.push({shape:[[0,0],[1,0]], type: "aparments2"})
        b.push({shape:[[0,0],[0,1],[1,0],[1,1]], type: "square"})
        b.push({shape:[[0,0],[-1,0],[1,0]], type: "road"})
        b.push({shape:[[0,0],[-1,0],[1,0]], type: "road2"})
        b.push({shape:[[0,0],[-1,0],[1,0],[0,1]], type: "school"})
        b.push({shape:[[0,0],[-1,0],[1,0],[-1,1],[1,1]], type: "mansion"})
        b.push({shape:[[0,0],[0,-1],[-1,0],[1,0],[0,1]], type: "hospital"})
        b.push({shape:[[0,0],[1,-1],[-1,0],[1,0],[-1,1]], type: "office"})
        b.push({shape:[[0,0],[0,-1],[-1,0],[1,0],[-1,1]], type: "federal"})
        b.push({shape:[[0,0],[0,-1],[1,-1],[-1,0],[-1,1]], type: "tenements"})
        return b
      })(),
      selectedPiece: null,
      orientation: 0
    }
    this.selectPiece = this.selectPiece.bind(this)
    this.rotatePiece = this.rotatePiece.bind(this)
    this.prieviewPlacement = this.prieviewPlacement.bind(this)
    this.clearPreview = this.clearPreview.bind(this)
    this.placePiece = this.placePiece.bind(this)
    this.orientPiece = this.orientPiece.bind(this)
  }

  selectPiece(nPiece) {
    this.setState((prevState) => {
      return {selectedPiece: prevState.pieces.filter(piece => piece.type === nPiece)[0]}
    })
  }

  rotatePiece() {
    if(this.state.selectedPiece !== null) {
      this.setState((prevState) => {
        return {orientation: prevState.orientation === 3 ? 0 : prevState.orientation+1}
      })
    }
  }
  orientPiece() {
    if(this.state.selectedPiece !== null) {
    var orientedPiece = this.state.selectedPiece
    for(let k = 0; k < this.state.orientation; k++) {
    	orientedPiece = {shape: orientedPiece.shape.map(spot => [spot[1],-1*spot[0]]), type: this.state.selectedPiece.type}
    }
    return orientedPiece
    } else {
      return null
    }
  }

  prieviewPlacement(piece, position) {
    let b = this.state.board
    let pb = this.state.board
    let errors = false;
    let overlayPiece = piece
    debugger
    for(let k = 0; k < this.state.orientation; k++) {
    	piece.shape = piece.shape.map(spot => [spot[1],-1*spot[0]])
    }
    for(let p = 0; p < piece.shape.length; p++) {
        if(b[position[0]+piece.shape[p][0]] && b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]] && b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill === "#EEE") {
          continue;
        } else {
          errors = true;
        }
    }

    if(!errors) {
      for(let p = 0; p < piece.shape.length; p++) {
          b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill = "#FFF"
      }
    }

    this.setState((prevState, curProps) => {
      debugger
      return {
        board: b
      }
    })
  }

  clearPreview() {
    // let b = this.state.board
    // let pb = this.state.prevBoard
    // let errors = false;
    // for(let k = 0; k < this.state.orientation; k++) {
    // 	piece.shape = piece.shape.map(spot => [spot[1],-1*spot[0]])
    // }
    // for(let p = 0; p < piece.shape.length; p++) {
    //     if(b[position[0]+piece.shape[p][0]] && b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]] && b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill === "#EEE") {
    //       continue;
    //     } else {
    //       errors = true;
    //     }
    // }

    // if(!errors) {
    //   for(let p = 0; p < piece.shape.length; p++) {
    //       b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill = pb[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill
    //   }
    // }
    this.setState((prevState, curProps) => {
      return {
        board: prevState.prevBoard
      }
    })
  }

  placePiece(piece, position) {
    let b = this.state.board
    let errors = false;
    
    for(let p = 0; p < piece.shape.length; p++) {
        if(b[position[0]+piece.shape[p][0]] && b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]] && b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill === "#EEE") {
          continue;
        } else {
          errors = true;
        }

    }

    if(!errors) {
      for(let p = 0; p < piece.shape.length; p++) {
          b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill = "red"
      }
    }

    this.setState((prevState, curProps) => {
      return {
        board: b,
        pieces: prevState.pieces.filter((p) => p !== piece),
        orientation: 0
      }
    })
  }

  

  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="GameWrapper">
          <GameBoard board={this.state.board} pieces={this.state.pieces} selectedPiece={this.orientPiece()} placePiece={this.placePiece} prieviewPlacement={this.prieviewPlacement} clearPreview={this.clearPreview} orientation={this.state.orientation}/>
        </div>
        <PlayerView pieces={this.state.pieces} selectPiece={this.selectPiece} rotatePiece={this.rotatePiece}/>
      </div>
    );
  }
}

export default App;
