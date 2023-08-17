import React, { MouseEvent } from 'react';
// import { assert } from 'console'

function Cell(props: any) {
  return (
    <button className="cell" onClick={props.onClick}>
      { props.value }
    </button>
  );
}

type GameState = Array<number>;

interface BoardProps {
  cells: GameState;
  onClick: (index: number) => void;
}

class Board extends React.Component<BoardProps, any> {
  renderCell(i: number) {
    return (
      <Cell
        value={this.props.cells[i]} 
        key={i}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rowValues = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    return (
      <div>
        <div className="board-row">
          { 
            rowValues[0].map((value: number) => this.renderCell(value))
          }
        </div>
        <div className="board-row">
          { 
            rowValues[1].map((value: number) => this.renderCell(value))
          }
        </div>
        <div className="board-row">
          { 
            rowValues[2].map((value: number) => this.renderCell(value))
          }
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

function calculateWinner(cells: Array<number>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function newGame(): number[] {
  return Array(9).fill(0);
}

class Game extends React.Component<GameProps, any> {
  constructor(props: any) {
      super(props);
      this.state = {
        history: [{
          cells: newGame(),
        }],
        stepNumber: 0,
        currentNumber: 1,
      };
    }

    handleClick(i: number) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const cells = current.cells.slice();
          if (calculateWinner(cells) || cells[i]) {
        return;
      }
      cells[i] = this.state.currentNumber;
      this.setState({
          history: history.concat([{
              cells: cells,
            }]),
            stepNumber: history.length,
            currentNumber: this.state.currentNumber,
      });
    }

    jumpTo(step: number) {
      this.setState({
        stepNumber: step,
        currentNumber: numberForStep(step)
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.cells);

      const moves = history.map((step: any, move: React.Key) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
              <li key={move}>
              <button onClick={() => this.jumpTo(Number(move))}>{desc}</button>
            </li>
          );
        });
    
      let status;
      if (winner) {
        status = 'Winner!';
      } else {
        status = 'current number: ' + this.state.currentNumber;
      }

      return (
      <div className="game">
        <div className="game-board">
          <Board
              cells={current.cells}
              onClick={(i) => this.handleClick(i)}
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
  return <Game />
}

export default App
