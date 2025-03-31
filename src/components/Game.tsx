import React, { useState } from "react";

import {
  newGameForDegree,
  isGameOver,
  isLegalPlay,
} from "../utils/SudokuUtils";
import { Board } from "./Board";
import { Difficulty } from "../model/GameTemplate";

export const Game: React.FC<{ startDegree: number }> = ({ startDegree }) => {
  // replace history with a game tree
  const [history, setHistory] = useState([
    { cells: newGameForDegree(startDegree) },
  ]);
  // replace with a pointer to the current place in the tree
  const [stepNumber, setStepNumber] = useState(0);
  // this is specific to Sudoku--and also is configuration data so not something that needs useState
  const [degree, setDegree] = useState(startDegree);
  // this is also specific to Sudoku, and really the board, so refactor into there
  const [currentNumber, setCurrentNumber] = useState(0);

  // rename this--placeNumberInCell()? Also at some point we'll need a function to mark a number
  function handleCellClick(index: number) {
    // this stuff is going to look more like traversing part of the 
    const localHistory = history.slice(0, stepNumber + 1);
    const current = localHistory[stepNumber]; //  history.length - 1
    const cells = current.cells.slice(); // making a copy of cells

    // if (isGameOver(cells)) {
    //   console.log("ignoring: game is over");
    //   return;
    // }

    if (cells[index] === currentNumber) {
      console.log("ignoring: input is unchanged");
      return;
    }

    if (!isLegalPlay(cells, index, currentNumber, degree)) {
      console.log("ignoring: not a legal play");
      return;
    }

    cells[index] = currentNumber;
    setHistory(localHistory.concat([{ cells: cells }]));
    setStepNumber(localHistory.length);
  }

  // instead of a number pass a pointer to a node in the tree
  function jumpTo(step: number) {
    setStepNumber(step);
    setCurrentNumber(0); // reset the selected number when jumping steps
  }

  function changeDegree(newDegree: number) {
    // don't change if a game is in progress or is already set accordingly
    if (stepNumber === 0 && degree != newDegree) {
      setHistory([{ cells: newGameForDegree(newDegree) }]);
      setDegree(newDegree);
    }
  }

  const current = history[stepNumber];
  const gameOver = isGameOver(current.cells);

  const moves = history.map((step: any, move: React.Key) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button className="bg-gray-400 m-1 p-2" onClick={() => jumpTo(Number(move))}>{desc}</button>
      </li>
    );
  });

  const degrees =
    stepNumber === 0 ? (
      <div className="m-2">
        change board:
        <button className="w-10 h-10 bg-gray-400 m-1 p-2" key="degree.2" onClick={() => changeDegree(2)}>4x4</button>
        <button className="w-10 h-10 bg-gray-400 m-1 p-2" key="degree.3" onClick={() => changeDegree(3)}>9x9</button>
      </div>
    ) : (
      ""
    );

  let status;
  if (gameOver) {
    status = "Winner!";
  } else {
    status = "current number: " + currentNumber;
  }

  return (
    <div className="m-10">
        <Board
          cells={current.cells}
          degree={degree}
          currentNumber={currentNumber}
          onCellClick={(i) => handleCellClick(i)}
          onChoiceClick={(i) => setCurrentNumber(i)}
        />
      <div>
        {degrees}
      </div>
      <div>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
