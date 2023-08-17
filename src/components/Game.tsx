import React, { MouseEvent } from "react";
import { GameProps } from "../model/GameProps";
import {
  newGameForDegree,
  isGameOver,
  isLegalPlay,
} from "../utils/SudokuUtils";
import { Board } from "./Board";

export class Game extends React.Component<GameProps, any> {
  constructor(props: any) {
    const degree = 2;
    super(props);
    this.state = {
      history: [
        {
          cells: newGameForDegree(degree),
        },
      ],
      degree: degree,
      stepNumber: 0,
      currentNumber: 0,
    };
  }

  handleChoiceClick(i: number) {
    this.setState({
      currentNumber: i,
    });
  }

  handleCellClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const cells = current.cells.slice();
    const degree = this.state.degree;
    if (isGameOver(cells)) {
      console.log("ignoring: game is over");
      return;
    }
    const currentNumber = this.state.currentNumber;
    if (cells[i] === currentNumber) {
      console.log("ignoring: input is unchanged");
      return;
    }
    if (!isLegalPlay(cells, i, currentNumber, degree)) {
      console.log("ignoring: not a legal play");
      return;
    }
    cells[i] = this.state.currentNumber;
    this.setState({
      history: history.concat([
        {
          cells: cells,
        },
      ]),
      stepNumber: history.length,
      currentNumber: this.state.currentNumber,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      currentNumber: 0, // reset the selected number when jumping steps
    });
  }

  render() {
    const degree = this.state.degree;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const gameOver = isGameOver(current.cells);

    const moves = history.map((step: any, move: React.Key) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(Number(move))}>{desc}</button>
        </li>
      );
    });

    let status;
    if (gameOver) {
      status = "Winner!";
    } else {
      status = "current number: " + this.state.currentNumber;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            cells={current.cells}
            degree={degree}
            onCellClick={(i) => this.handleCellClick(i)}
            onChoiceClick={(i) => this.handleChoiceClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
