import React, { MouseEvent } from "react";

function Cell(props: any) {
  return (
    <button className="cell" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

type GameState = Array<number>;

interface BoardProps {
  cells: GameState;
  onCellClick: (index: number) => void;
  onChoiceClick: (index: number) => void;
}

class Board extends React.Component<BoardProps, any> {
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
    // todo: dynamically configure this
    const choiceValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const rowValues = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    return (
      <div>
        <div className="board-row">
          {choiceValues.map((value: number) => this.renderChoice(value))}
        </div>
        <br />
        <div className="board-row">
          {rowValues[0].map((value: number) => this.renderCell(value))}
        </div>
        <div className="board-row">
          {rowValues[1].map((value: number) => this.renderCell(value))}
        </div>
        <div className="board-row">
          {rowValues[2].map((value: number) => this.renderCell(value))}
        </div>
      </div>
    );
  }
}

interface GameProps {
  history?: GameState[];
  stepNumber?: number;
  currentNumber?: number;
}

function numberForStep(step: number): number {
  return 0;
}

function isLegalPlay(cells: Array<number>, i: number, choice: number): boolean {
  return choice ? !cells[i] && !cells.includes(choice) : true;
}

function isGameOver(cells: Array<number>): boolean {
  return !cells.includes(0);
}

function newGame(): number[] {
  return Array(9).fill(0);
}

class Game extends React.Component<GameProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          cells: newGame(),
        },
      ],
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
    if (isGameOver(cells)) {
      console.log("ignoring: game is over");
      return;
    }
    const currentNumber = this.state.currentNumber;
    if (cells[i] === currentNumber) {
      console.log("ignoring: input is unchanged");
      return;
    }
    if (!isLegalPlay(cells, i, currentNumber)) {
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
      currentNumber: numberForStep(step),
    });
  }

  render() {
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

// ========================================

function App() {
  return <Game />;
}

export default App;
