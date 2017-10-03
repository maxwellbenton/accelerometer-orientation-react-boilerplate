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
        b.push({shape:[[0,0],[0,-1],[-1,0],[0,1],[1,0],[2,0]], towers: [[0,0]], player: 0, type: "duomo", colors: ['#C0C0C0','#949292','#EEE','#FFF']})
        //light pieces
        b.push({shape:[[0,0]], towers: [], player: 1, type: "house", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0]], towers: [], player: 1, type: "house2", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[1,0]], towers: [], player: 1, type: "rowhouse", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[1,0]], towers: [], player: 1, type: "rowhouse2", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[1,0],[1,1]], towers: [], player: 1, type: "tenement", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[1,0],[1,1]], towers: [], player: 1, type: "tenement2", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[-1,0],[1,0]], towers: [], player: 1, type: "footbridge", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[0,1],[1,0],[1,1]], towers: [], player: 1, type: "plaza", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[1,0],[0,-1],[-1,-1]], towers: [], player: 1, type: "school", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[0,-1],[1,0],[0,1]], towers: [[0,0]], player: 1, type: "courthouse", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[0,-1],[1,-1],[0,1],[1,1]], towers: [[0,-1],[0,1]], player: 1, type: "museum", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[0,-1],[-1,0],[1,0],[0,1]], towers: [[0,0]], player: 1, type: "hospital", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[1,-1],[1,0],[0,1],[-1,1]], towers: [[1,0],[0,1]], player: 1, type: "mall", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        b.push({shape:[[0,0],[0,-1],[-1,0],[0,1],[1,-1]], towers: [[1,-1]], player: 1, type: "university", colors: ['#580B0E','#1A0001','#7D2226','#A14045']})
        //dark pieces
        b.push({shape:[[0,0]], towers: [], player: 2, type: "workshop", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0]], towers: [], player: 2, type: "workshop2", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[1,0]], towers: [], player: 2, type: "forge", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[1,0]], towers: [], player: 2, type: "forge2", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[1,0],[1,-1]], towers: [], player: 2, type: "sawmill", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[1,0],[1,-1]], towers: [], player: 2, type: "sawmill2", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[-1,0],[1,0]], towers: [], player: 2, type: "railbridge", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[0,1],[1,0],[1,1]], towers: [], player: 2, type: "lumberyard", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[1,0],[0,1],[-1,1]], towers: [], player: 2, type: "warehouse", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[0,-1],[1,0],[0,1]], towers: [[0,0]], player: 2, type: "foundry", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[0,-1],[1,-1],[0,1],[1,1]], towers: [[0,-1],[0,1]], player: 2, type: "factory", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[0,-1],[-1,0],[1,0],[0,1]], towers: [[0,0]], player: 2, type: "coalplant", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[-1,-1],[0,-1],[1,0],[1,1]], towers: [[0,-1],[1,0]], player: 2, type: "ironworks", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        b.push({shape:[[0,0],[0,-1],[-1,0],[0,1],[1,1]], towers: [[1,1]], player: 2, type: "refinery", colors: ['#252B30','#0E1923', '#434D55', '#5E6972']})
        return b
      })(),
      overlayDivs: null,
      pieceLayer: [],
      hoverState: 'PieceLayer',
      leftSideLayer: [],
      selectedPiece: null,
      orientation: 0
    }
    this.handleKey = this.handleKey.bind(this)
    this.selectPiece = this.selectPiece.bind(this)
    this.prieviewPlacement = this.prieviewPlacement.bind(this)
    this.rotatePiece = this.rotatePiece.bind(this)
    this.placePiece = this.placePiece.bind(this)
    this.orientPiece = this.orientPiece.bind(this)
  }

  componentDidMount() {
    //creates and transforms all piece divs and assigns IDs for later.  
    let angle = '30deg'
    let allDivs = []
      this.state.boardData.forEach((row,m) => {
        row.forEach((tile,n) => {
          //base cube
          allDivs.push(<div className="PieceDiv" key={`tile-${n},${m}`} ref={(div) => this[`tile-${n},${m}`] = div} style={{transform: `rotateX(${angle}) translateX(${m*50}px) translateY(${n*50}px)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`facade-${n},${m}`} ref={(div) => this[`facade-${n},${m}`] = div} style={{transform: `rotateX(${angle}) translateX(${(m*50)}px) translateY(${(n*50)+25}px) translateZ(25px) rotateX(-90deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`leftSide-${n},${m}`} ref={(div) => this[`leftSide-${n},${m}`] = div} style={{transform: `rotateX(${angle}) rotateY(90deg) translateX(-25px) translateY(${n*50}px) translateZ(${(m*50)-25}px) rotateZ(-90deg) rotateY(180deg)`}}></div>) 
          allDivs.push(<div className="PieceDiv" key={`rightSide-${n},${m}`} ref={(div) => this[`rightSide-${n},${m}`] = div} style={{transform: `rotateX(${angle}) rotateY(90deg) translateX(-25px) translateY(${n*50}px) translateZ(${(m*50)+25}px) rotateZ(-90deg)`}}></div>) 
          //street level divs
          allDivs.push(<div className="PieceDiv" key={`streetFront-${n},${m}`} ref={(div) => this[`streetFront-${n},${m}`] = div} style={{height: '25px', transform: `rotateX(${angle}) translateX(${(m*50)}px) translateY(${(n*50)+25}px) rotateX(-90deg) translateY(10px)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`streetLeftSide-${n},${m}`} ref={(div) => this[`streetLeftSide-${n},${m}`] = div} style={{height: '25px', transform: `rotateX(${angle}) rotateY(90deg) translateY(${n*50}px) translateZ(${(m*50)-25}px) rotateZ(-90deg) rotateY(180deg) translateY(10px)`}}></div>) 
          allDivs.push(<div className="PieceDiv" key={`streetRightSide-${n},${m}`} ref={(div) => this[`streetRightSide-${n},${m}`] = div} style={{height: '25px', transform: `rotateX(${angle}) rotateY(90deg) translateY(${n*50}px) translateZ(${(m*50)+25}px) rotateZ(-90deg) translateY(10px)`}}></div>) 
          allDivs.push(<div className="PieceDiv" key={`streetLevel-${n},${m}`} ref={(div) => this[`streetLevel-${n},${m}`] = div} style={{transform: `rotateX(${angle}) translateX(${m*50}px) translateY(${n*50}px) translateZ(10px) translateY(-10px)`}}></div>)
          //roof divs
          allDivs.push(<div className="PieceDiv" key={`leftRoof0-${n},${m}`} ref={(div) => this[`leftRoof0-${n},${m}`] = div} style={{ width: '33px', transform: `rotateX(${angle}) translateX(${m*50}px) translateY(${n*50}px) translateZ(60px) translateX(-4px) rotateY(-38.65deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`rightRoof0-${n},${m}`} ref={(div) => this[`rightRoof0-${n},${m}`] = div} style={{width: '33px', transform: `rotateX(${angle}) translateX(${m*50}px) translateY(${n*50}px) translateZ(60px) translateX(21px) rotateY(38.65deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`leftRoof1-${n},${m}`} ref={(div) => this[`leftRoof1-${n},${m}`] = div} style={{height: '33px', transform: `rotateX(${angle}) translateX(${m*50}px) translateY(${n*50}px) translateZ(56px) translateY(-4px) rotateX(38.65deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`rightRoof1-${n},${m}`} ref={(div) => this[`rightRoof1-${n},${m}`] = div} style={{height: '33px', transform: `rotateX(${angle}) translateX(${m*50}px) translateY(${n*50}px) translateZ(56px) translateY(21px) rotateX(-38.65deg)`}}></div>)
          //tower divs
          allDivs.push(<div className="PieceDiv" key={`towerFacade-${n},${m}`} ref={(div) => this[`towerFacade-${n},${m}`] = div} style={{transform: `rotateX(${angle}) translateX(${(m*50)}px) translateY(${(n*50)+25}px) translateZ(75px) rotateX(-90deg)`}}></div>)
          allDivs.push(<div className="PieceDiv" key={`towerLeftSide-${n},${m}`} ref={(div) => this[`towerLeftSide-${n},${m}`] = div} style={{transform: `rotateX(${angle}) rotateY(90deg) translateX(-75px) translateY(${n*50}px) translateZ(${(m*50)-25}px) rotateZ(-90deg) rotateY(180deg)`}}></div>) 
          allDivs.push(<div className="PieceDiv" key={`towerRightSide-${n},${m}`} ref={(div) => this[`towerRightSide-${n},${m}`] = div} style={{transform: `rotateX(${angle}) rotateY(90deg) translateX(-75px) translateY(${n*50}px) translateZ(${(m*50)+25}px) rotateZ(-90deg)`}}></div>) 
          allDivs.push(<div className="PieceDiv" key={`towerRoof-${n},${m}`} ref={(div) => this[`towerRoof-${n},${m}`] = div} style={{transform: `rotateX(${angle}) translateX(${m*50}px) translateY(${n*50}px) translateZ(100px)`}}></div>)
        })
      })

    this.setState((pState, cProps)=> {
      return {boardDivs: allDivs}
    })
  }

  render() {
    return (
      <div className="App" >
        <Navigation />
        <div onKeyPress={this.handleKey} tabIndex="0">
        
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
                      hoverState={this.state.hoverState}
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

  handleKey(e) {
    if(e.key === 'r' || e.key === 'R') {
      this.rotatePiece()
    } 
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
    	orientedPiece = {shape: orientedPiece.shape.map(spot => [spot[1],-1*spot[0]]), towers: orientedPiece.towers.length > 0 ? orientedPiece.towers.map(spot => [spot[1],-1*spot[0]]) : orientedPiece.towers, type: this.state.selectedPiece.type, player: this.state.selectedPiece.player, colors: this.state.selectedPiece.colors}
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
        return {overlayDivs: {tiles: newOverlay, validMove: true},  hoverState: 'PieceLayerHover'}
      })
    } else {
      this.setState(() => {
        return {overlayDivs: {tiles: newOverlay, validMove: false},  hoverState: 'PieceLayerHover'}
      })
    }
  }

  placePiece(piece, position) {
    let b = this.state.boardData
    let bd = this.state.boardDivs
    let errors = false;
    if(this.state.overlayDivs.validMove) {
      for(let p = 0; p < piece.shape.length; p++) {
          if(b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]] && b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill === "#DDD") {
            continue;
          } else {
            errors = true;
            break;
          }
      }
    } else {
      errors = true;
    }
    if(!errors) {
      if(piece.type === "plaza" || piece.type === "footbridge" || piece.type === "lumberyard" || piece.type === "railbridge") {
        for(let p = 0; p < piece.shape.length; p++) {
            b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill = piece.colors[3]
            this[`streetFront-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(${piece.colors[3]}, ${piece.colors[0]})`
            this[`streetLeftSide-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(${piece.colors[3]}, ${piece.colors[0]})`
            this[`streetRightSide-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(${piece.colors[3]}, ${piece.colors[0]})`
            this[`streetLevel-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[3]}, ${piece.colors[0]})`
        }
      } else {
        for(let p = 0; p < piece.shape.length; p++) {
          b[position[0]+piece.shape[p][0]][position[1]+piece.shape[p][1]].fill = piece.colors[3]
          this[`facade-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[1]})`
          this[`leftSide-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[1]})`
          this[`rightSide-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[1]})`
          
          if(this.state.orientation % 2 === 0) {
            this[`leftRoof0-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(to right, ${piece.colors[0]}, ${piece.colors[2]})`
            this[`rightRoof0-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(to right, ${piece.colors[3]}, ${piece.colors[2]})`
          } else {
            this[`leftRoof1-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(to right, ${piece.colors[0]}, ${piece.colors[2]})`
            this[`rightRoof1-${position[0]+piece.shape[p][0]},${position[1]+piece.shape[p][1]}`].style.background = `linear-gradient(to right, ${piece.colors[2]}, ${piece.colors[3]})`
          }
        }
      }
      
      if(piece.towers.length > 0){
        for(let p = 0; p < piece.towers.length; p++) {
            this[`towerFacade-${position[0]+piece.towers[p][0]},${position[1]+piece.towers[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[1]})`
            this[`towerLeftSide-${position[0]+piece.towers[p][0]},${position[1]+piece.towers[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[1]})`
            this[`towerRightSide-${position[0]+piece.towers[p][0]},${position[1]+piece.towers[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[1]})`
            this[`towerRoof-${position[0]+piece.towers[p][0]},${position[1]+piece.towers[p][1]}`].style.background = `linear-gradient(${piece.colors[0]}, ${piece.colors[1]})`
          }
      }
      this.setState((prevState, curProps) => {
        return {
          board: b,
          pieces: prevState.pieces.filter((p) => p !== piece),
          orientation: 0,
          selectedPiece: null,
          hoverState: 'PieceLayer'
        }
      })
    }


  }
}

export default App;
