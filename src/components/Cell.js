import React, { Component } from "react";

class Cell extends Component {
  render() {
    return (
      <div
        className={this.props.cellClass}
        onClick={() => this.props.colorizeCell(this.props.i, this.props.k)}
      />
    );
  }
}

export default Cell;
