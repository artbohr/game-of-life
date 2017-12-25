import React, { Component } from "react";
import Cell from "./Cell";

class TableGrid extends Component {
  render() {
    let cellClass = "";
    let arr = [];

    // creates cells on the grid
    for (let i = 0; i < this.props.rows; i++) {
      for (let k = 0; k < this.props.cols; k++) {
        cellClass = this.props.grid[i][k] ? "cell alive" : "cell dead";
        arr.push(
          <Cell
            cellClass={cellClass}
            colorizeCell={this.props.colorizeCell}
            key={`key:${i}.${k}`}
            i={i}
            k={k}
          />
        );
      }
    }

    return <div className="grid">{arr}</div>;
  }
}

export default TableGrid;
