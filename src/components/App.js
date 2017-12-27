import React, { Component } from "react";
import TableGrid from "./TableGrid";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.cols = 50;

    this.state = {
      grid: Array(this.rows).fill(Array(this.cols).fill(false)),
      generations: 0
    };
  }

  componentDidMount() {
    this.randomizeBoard();
    this.play();
  }

  // creates an alive cell on the selected spot
  colorizeCell = (i, k) => {
    let newGrid = this.deepCopy(this.state.grid);
    newGrid[i][k] = !newGrid[i][k];
    this.setState({ grid: newGrid });
  };

  // makes a deep copy of the array
  deepCopy = arr => {
    return JSON.parse(JSON.stringify(arr));
  };

  // populates the board (randomly)
  randomizeBoard = () => {
    clearInterval(this.cycle);
    let newGrid = this.deepCopy(this.state.grid);
    for (let i = 0; i < this.rows; i++) {
      for (let k = 0; k < this.cols; k++) {
        if (Math.floor(Math.random() * 5) === 0) newGrid[i][k] = true;
      }
    }
    this.setState({
      grid: newGrid,
      generations: 0
    });
  };

  clear = () => {
    clearInterval(this.cycle);
    let newGrid = Array(this.rows).fill(Array(this.cols).fill(false));
    this.setState({
       grid: newGrid,
       generations: 0
     });
  };

  play = () => {
    clearInterval(this.cycle);
		this.cycle = setInterval(this.game, 500);
  };

  stop = () => {
    clearInterval(this.cycle);
  };

  // defines rules and starts the game
  game = () => {
    let currentGrid = this.state.grid;
    let newGrid = this.deepCopy(this.state.grid);
    let sum = 0;
    /*RULES:*/

    // iterate through every cell
    for (let i = 0; i < this.rows; i++) {
      for (let k = 0; k < this.cols; k++) {

        // check the grid aroud you, if it's not undefined and alive
        // sum one live neighbour
        // else if it's undefined => go to the next

        // error handling method
        try{if (currentGrid[i+1][k]) sum++} catch(e){};
        try{if (currentGrid[i-1][k]) sum++} catch(e){};
        try{if (currentGrid[i][k+1]) sum++} catch(e){};
        try{if (currentGrid[i][k-1]) sum++} catch(e){};
        try{if (currentGrid[i-1][k-1]) sum++} catch(e){};
        try{if (currentGrid[i+1][k+1]) sum++} catch(e){};
        try{if (currentGrid[i-1][k+1]) sum++} catch(e){};
        try{if (currentGrid[i+1][k-1]) sum++} catch(e){};

        /*
        // nested if's method, prevents undefined errors
        if(i<this.rows-1) {if(currentGrid[i+1][k]) sum++}
        if(i>0) {if (currentGrid[i-1][k]) sum++}//}
        if(k<this.cols-1) {if (currentGrid[i][k+1]) sum++}
        if(k>0) {if (currentGrid[i][k-1]) sum++}
        if(i>0 && k>0) {if (currentGrid[i-1][k-1]) sum++}
        if(i<this.rows-1 && k<this.cols-1) {if (currentGrid[i+1][k+1]) sum++}
        if(i>0 && k<this.cols-1) {if (currentGrid[i-1][k+1]) sum++}
        if(i<this.rows-1 && k>0) {if (currentGrid[i+1][k-1]) sum++}
        */

        // cell is alive
        if (currentGrid[i][k]){
          if (sum>1 && sum <4){
            newGrid[i][k] = true;
          } else {
            newGrid[i][k] = false;
          }
        //cell is dead
        } else {
          if(sum===3) newGrid[i][k] = true;
        }
        sum = 0;
      }
    }
    /*RULES END*/

    // set the new board for the next generation
    this.setState({
      grid: newGrid,
      generations: this.state.generations + 1});
  };


  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <div className="buttons">
          <div className="playButtons">
            <button className="myButton" onClick={this.play}>Play</button>
            <button className="myButton" onClick={this.stop}>Stop</button>
          </div>
          <div className="otherButtons">
            <button className="myButton" onClick={this.randomizeBoard}>Randomize</button>
            <button className="myButton" onClick={this.clear}>Clear</button>
          </div>
          <h3>
            Generations:
            <span className="counter">{` ${this.state.generations}`}</span>
          </h3>
        </div>
        <TableGrid
          colorizeCell={this.colorizeCell}
          grid={this.state.grid}
          rows={this.rows}
          cols={this.cols}
        />
      </div>
    );
  }
}

export default App;
