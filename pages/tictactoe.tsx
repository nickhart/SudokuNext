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
  degree: number;
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
    const degree = this.state ? this.state.degree : 2; // todo: fix this
    const choiceValues = choicesForDegree(degree);
    const rowValues = rowValuesForDegree(degree);
    return (
      <div>
        <div className="board-row">
          {choiceValues.map((value: number) => this.renderChoice(value))}
        </div>
        <br />
        { rowValues.map((row: Array<number>) => (
        <div className="board-row">
        {row.map((value: number) => this.renderCell(value))}
      </div>
        ))}
      </div>
    );
  }
}

interface GameProps {
  history?: GameState[];
  stepNumber?: number;
  currentNumber?: number;
}

function rowAndColumnFromIndex(index: number, degree: number) {
  const size = degree*degree;
  let col = index % size;
  let row = (index - col) / size;
  return { row:row, col:col };
}

function numberForStep(step: number): number {
  return 0;
}

function isLegalPlay(cells: Array<number>, i: number, choice: number, degree: number): boolean {
  if (!choice) {
    // can always clear?
    return true;
  }
  if (cells[i]) {
    // can never overwrite
    return false;
  }

  const { row, col } = rowAndColumnFromIndex(i, degree);
  const rowValues = cellValuesForRow(row, degree);
  const rowNumbers = rowValues.map((value) => cells[value]);
  if (rowNumbers.includes(choice)) {
    console.log(`number ${choice} is already in row ${row} (${rowNumbers})`);
    return false;
  }
  const colValues = cellValuesForColumn(col, degree);
  const colNumbers = colValues.map((value) => cells[value]);
  if (colNumbers.includes(choice)) {
    console.log(`number ${choice} is already in column ${col} (${colNumbers})`);
    return false;
  }

  // eg: for degree 2...
  // [0, 1, 2, 3]
  // [4, 5, 6, 7]
  // [8, 9, 10, 11]
  // [12, 13, 14, 15]
  // square 0,0 x 1,1 = [0, 1, 4, 5]
  // square 0,2 x 1,3 = [2, 3, 6, 7]
  // square 2,0 x 3,1 = [8, 9, 12, 13]
  // square 2,2 x 3,3 = [10, 11, 14, 15] 
  const squareValues = cellValuesForSquare(row, col, degree);
  const squareNumbers = squareValues.map((value) => cells[value]);
  if (squareNumbers.includes(choice)) {
    console.log(`number ${choice} is already in sqaure containing cell ${row},${col} (${squareNumbers})`);
    return false;
  }

  return true;
}

function isGameOver(cells: Array<number>): boolean {
  return !cells.includes(0);
}

function newGameForDegree(degree: number): number[] {
  return Array(degree*degree*degree*degree).fill(0);
}

function generateAscendingArray(start: number, length: number, multiple: number = 1): number[] {
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    result.push(start + i * multiple);
  }
  return result;
}

function choicesForDegree(degree: number): Array<number> {
  const length = degree*degree+1;
  return Array.from({ length }, (_, index) => index);
}

// function rowSliceForDegree(start: number, degree: number) {
//   return generateAscendingArray(start, degree*degree);
// }

// todo: refactor this
function rowValuesForDegree(degree: number) {
  let result = [];
  const size = degree*degree;
  for (let i = 0; i < size; i++) {
    result.push(generateAscendingArray(i * size, size));
  }
  console.log(`rowValues: ${result}`);
  return result;
}

function cellValuesForRow(row: number, degree: number) {
  const size = degree*degree;
  return generateAscendingArray(size * row, size);
}

function cellValuesForColumn(column: number, degree: number) {
  const size = degree*degree;
  return generateAscendingArray(column, size, size);
}

function cellValuesForSquare(row: number, col: number, degree: number) {
  const size = degree*degree;
  let result = [];

  // convert the row and column to the starting row and column for whichever square it lies within
  const rowStart = row - row%degree;
  const colStart = col - col%degree;

  // instead of a row or column we want to concat N rows, where N is the degree
  for (let index = 0; index != degree; ++index) {
    const start = (rowStart + index) * size + colStart;
    const array = generateAscendingArray(start, degree);
    result = result.concat(array);
  }
  return result;
}

class Game extends React.Component<GameProps, any> {
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
      currentNumber: numberForStep(step),
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

// ========================================

function App() {
  return <Game />;
}

export default App;
