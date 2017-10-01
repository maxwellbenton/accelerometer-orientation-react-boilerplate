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
      boardData: (() => {

        let b = new Array(10)
        for(let m = 0; m < 10; m++) {
          b[m] = new Array(10)
          for(let n = 0; n < 10; n++) {
            b[m][n] = {fill: "#DDD", owner: "none"}
          }
        }
        return b
      })(),
      boardDivs: null,
      pieces: (() => {
        let b = []
        b.push({shape:[[0,0]], type: "house"})
        b.push({shape:[[0,0]], type: "house2"})
        b.push({shape:[[0,0],[1,0]], type: "rowhouse"})
        b.push({shape:[[0,0],[1,0]], type: "rowhouse2"})
        b.push({shape:[[0,0],[1,0],[1,1]], type: "tenement"})
        b.push({shape:[[0,0],[1,0],[1,1]], type: "tenement2"})
        b.push({shape:[[0,0],[-1,0],[1,0]], type: "footbridge"})
        b.push({shape:[[0,0],[0,1],[1,0],[1,1]], type: "plaza"})
        b.push({shape:[[0,0],[-1,0],[1,0],[0,1]], type: "courthouse"})
        b.push({shape:[[0,0],[-1,0],[1,0],[-1,1],[1,1]], type: "mansion"})
        b.push({shape:[[0,0],[0,-1],[-1,0],[1,0],[0,1]], type: "hospital"})
        b.push({shape:[[0,0],[1,-1],[-1,0],[1,0],[-1,1]], type: "office"})
        b.push({shape:[[0,0],[0,-1],[-1,0],[1,0],[-1,1]], type: "federal"})
        b.push({shape:[[0,0],[0,-1],[1,-1],[-1,0],[-1,1]], type: "tenements"})
        return b
      })(),
      overlayDivs: null,
      pieceLayer: [],
      leftSideLayer: [],
      selectedPiece: null,
      orientation: 0
    }
    this.selectPiece = this.selectPiece.bind(this)
    this.prieviewPlacement = this.prieviewPlacement.bind(this)
    this.rotatePiece = this.rotatePiece.bind(this)
    this.placePiece = this.placePiece.bind(this)
    this.orientPiece = this.orientPiece.bind(this)
  }

  componentDidMount() {
    //creates and transforms all piece divs and assigns IDs for later.  
    let allDivs = []
      this.state.boardData.forEach((row,m) => {
        row.forEach((tile,n) => {
          //base cube
          allDivs.push(<div className="PieceDiv" key={`tile-${m},${n}`} id={`tile-${m},${n}`} style={{transform: `rotateX(45deg) translateX(${m*50}px) translateY(${n*50}px)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`facade-${m},${n}`} id={`facade-${m},${n}`} style={{transform: `rotateX(45deg) translateX(${(m*50)}px) translateY(${(n*50)+25}px) translateZ(25px) rotateX(-90deg)`}}></div>)
          if(m > 4) { allDivs.push(<div className="PieceDiv" key={`leftSide-${m},${n}`} id={`leftSide-${m},${n}`} style={{transform: `rotateX(45deg) rotateY(90deg) translateX(-25px) translateY(${n*50}px) translateZ(${(m*50)-25}px) rotateZ(-90deg) rotateY(180deg)`}}></div>) }
          if(m < 4) { allDivs.push(<div className="PieceDiv" key={`rightSide-${m},${n}`} id={`rightSide-${m},${n}`} style={{transform: `rotateX(45deg) rotateY(90deg) translateX(-25px) translateY(${n*50}px) translateZ(${(m*50)+25}px) rotateZ(-90deg)`}}></div>) }
          //street level divs
          allDivs.push(<div className="PieceDiv" key={`streetFront-${m},${n}`} id={`streetFront-${m},${n}`} style={{height: '20px', transform: `rotateX(45deg) translateX(${(m*50)}px) translateY(${(n*50)+25}px) rotateX(-90deg)`}}></div>)
          if(m > 4) { allDivs.push(<div className="PieceDiv" key={`streetLeftSide-${m},${n}`} id={`streetLeftSide-${m},${n}`} style={{height: '20px', transform: `rotateX(45deg) rotateY(90deg) translateY(${n*50}px) translateZ(${(m*50)-25}px) rotateZ(-90deg) rotateY(180deg)`}}></div>) }
          if(m < 4) { allDivs.push(<div className="PieceDiv" key={`streetRightSide-${m},${n}`} id={`streetRightSide-${m},${n}`} style={{height: '20px', transform: `rotateX(45deg) rotateY(90deg) translateY(${n*50}px) translateZ(${(m*50)+25}px) rotateZ(-90deg)`}}></div>) }
          allDivs.push(<div className="PieceDiv" key={`streetLevel-${m},${n}`} id={`streetLevel-${m},${n}`} style={{transform: `rotateX(45deg) translateX(${m*50}px) translateY(${n*50}px) translateZ(20px)`}}></div>)
          //roof divs
          allDivs.push(<div className="PieceDiv" key={`leftRoof0-${m},${n}`} id={`leftRoof0-${m},${n}`} style={{ width: '32px', transform: `rotateX(45deg) translateX(${m*50}px) translateY(${n*50}px) translateZ(60px) translateX(-3px) rotateY(-38.65deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`rightRoof0-${m},${n}`} id={`rightRoof0-${m},${n}`} style={{width: '32px', transform: `rotateX(45deg) translateX(${m*50}px) translateY(${n*50}px) translateZ(60px) translateX(22px) rotateY(38.65deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`leftRoof1-${m},${n}`} id={`leftRoof1-${m},${n}`} style={{height: '32px', transform: `rotateX(45deg) translateX(${m*50}px) translateY(${n*50}px) translateZ(60px) translateY(-3px) rotateX(38.65deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`rightRoof1-${m},${n}`} id={`rightRoof1-${m},${n}`} style={{height: '32px', transform: `rotateX(45deg) translateX(${m*50}px) translateY(${n*50}px) translateZ(60px) translateY(22px) rotateX(-38.65deg)`}}></div>)
          //tower divs
          allDivs.push(<div className="PieceDiv" key={`towerFacade-${m},${n}`} id={`towerFacade-${m},${n}`} style={{transform: `rotateX(45deg) translateX(${(m*50)}px) translateY(${(n*50)+25}px) translateZ(75px) rotateX(-90deg)`}}></div>)
          if(m > 4) { allDivs.push(<div className="PieceDiv" key={`towerLeftSide-${m},${n}`} id={`towerLeftSide-${m},${n}`} style={{transform: `rotateX(45deg) rotateY(90deg) translateX(-75px) translateY(${n*50}px) translateZ(${(m*50)-25}px) rotateZ(-90deg) rotateY(180deg)`}}></div>) }
          if(m < 4) { allDivs.push(<div className="PieceDiv" key={`towerRightSide-${m},${n}`} id={`towerRightSide-${m},${n}`} style={{transform: `rotateX(45deg) rotateY(90deg) translateX(-75px) translateY(${n*50}px) translateZ(${(m*50)+25}px) rotateZ(-90deg)`}}></div>) }
          allDivs.push(<div className="PieceDiv" key={`towerRoof-${m},${n}`} id={`towerRoof-${m},${n}`} style={{transform: `rotateX(45deg) translateX(${m*50}px) translateY(${n*50}px) translateZ(100px)`}}></div>)
        })
      })

    this.setState((pState, cProps)=> {
      return {boardDivs: allDivs}
    })
  }

  render() {
    return (
      <div className="App" onKeyDown={this.handleKeyUp}>
        <Navigation />
        <div >
        <div>
          <GameBoard  boardDivs={this.state.boardDivs} 
                      boardData={this.state.boardData}
                      pieces={this.state.pieces}
                      overlayDivs={this.state.overlayDivs}
                      pieceLayer={this.state.pieceLayer}
                      leftSideLayer={this.state.leftSideLayer}
                      selectedPiece={this.orientPiece()} 
                      placePiece={this.placePiece} 
                      prieviewPlacement={this.prieviewPlacement}
                      />
        </div>
        <PlayerView   pieces={this.state.pieces} 
                      selectPiece={this.selectPiece} 
                      rotatePiece={this.rotatePiece}
                      />
        </div>
      </div>
    );
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

  prieviewPlacement(posArray, pos) {
    let newOverlay = []
    var sPiece = this.orientPiece()
    for(let p = 0; p < posArray.length; p++) {
      if(pos[0]+sPiece.shape[p][0] < 10 && pos[0]+sPiece.shape[p][0] > -1 && pos[1]+sPiece.shape[p][1] < 10 && pos[1]+sPiece.shape[p][1] > -1) {
        newOverlay.push([pos[0]+sPiece.shape[p][0], pos[1]+sPiece.shape[p][1]])
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

  placePiece(piece, position) {
    let b = this.state.boardData
    let bd = this.state.boardDivs
    let errors = false;
    
    for(let p = 0; p < piece.shape.length; p++) {
        let tileCheck = b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]]
        if(tileCheck && tileCheck.fill === "#DDD") {
          continue;
        } else {
          errors = true;
          break;
        }
    }
    if(!errors) {
      for(let p = 0; p < piece.shape.length; p++) {
          
          console.log(piece)
          console.log(position)
          debugger
          b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill = "red"
          
      }
      this.setState((prevState, curProps) => {
        return {
          board: b,
          pieces: prevState.pieces.filter((p) => p !== piece),
          orientation: 0,
          selectedPiece: null
        }
      })
    }


  }
}

export default App;
