import React, { MouseEvent } from "react";
import { BoardProps } from "../model/BoardProps";
import { Cell } from "./Cell";
import { choicesForDegree, rowValuesForDegree } from "../utils/BoardUtils";

export class Board extends React.Component<BoardProps, any> {
  renderCell(i: number) {
    return (
      <Cell
        value={this.props.cells[i]}
        key={`cell${i}`}
        onClick={() => this.props.onCellClick(i)}
      />
    );
  }

  renderChoice(i: number) {
    return (
      <Cell
        value={i}
        key={`choice${i}`}
        onClick={() => this.props.onChoiceClick(i)}
      />
    );
  }

  render() {
    const degree = this.state ? this.state.degree : 2; // todo: fix this
    const choiceValues = choicesForDegree(degree);
    const rowValues = rowValuesForDegree(degree);
    return (
      <div>
        <div className="board-row">
          {choiceValues.map((value: number) => this.renderChoice(value))}
        </div>
        <br />
        {rowValues.map((row: Array<number>) => (
          <div className="board-row">
            {row.map((value: number) => this.renderCell(value))}
          </div>
        ))}
      </div>
    );
  }
}
