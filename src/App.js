import React, { Component } from 'react';
import Navigation from './Navigation'
import GameBoard from './GameBoard'
import PlayerView from './PlayerView'
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      board: (() => {
        let newBoard = {}
        let l = 0
        for(let m = 0; m < 10; m++) {
          for(let n = 0; n < 10; n++) {
            newBoard[l] = {pos: [m,n], fill: "none", owner: "none"};
            l++;
          }
        }
        return newBoard
      })()
    }
  }


  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="GameWrapper">
          <GameBoard board={this.state.board}/>
        </div>
        <PlayerView />
      </div>
    );
  }
}

export default App;
