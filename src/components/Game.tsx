import React, { useState, useEffect } from "react";

import {
  choicesForDegree,
  newGameForDegree,
  isGameOver,
  isLegalPlay,
} from "../utils/SudokuUtils";
import { Board } from "./Board";

export const Game: React.FC<{ startDegree: number }> = ({ startDegree }) => {
  const [history, setHistory] = useState([
    { cells: newGameForDegree(startDegree) },
  ]);
  const [degree, setDegree] = useState(startDegree);
  const [stepNumber, setStepNumber] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    console.log(`Degree updated: ${degree}`);
  }, [degree]);

  function handleCellClick(index: number) {
    const current = history[history.length - 1];
    const cells = current.cells.slice(); // making a copy of cells

    if (isGameOver(cells)) {
      console.log("ignoring: game is over");
      return;
    }

    if (cells[index] === currentNumber) {
      console.log("ignoring: input is unchanged");
      return;
    }

    if (!isLegalPlay(cells, index, currentNumber, degree)) {
      console.log("ignoring: not a legal play");
      return;
    }

    cells[index] = currentNumber;
    setHistory(history.concat([{ cells: cells }]));
    setStepNumber(history.length);
  }

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
        <button onClick={() => jumpTo(Number(move))}>{desc}</button>
      </li>
    );
  });

  const degrees =
    stepNumber === 0 ? (
      <div>
        <button onClick={() => changeDegree(2)}>4x4</button>
        <button onClick={() => changeDegree(3)}>9x9</button>
      </div>
    ) : (
      ""
    );

  function renderChoice(index: number) {
    const key = `choice_${index}`;
    return <button onClick={() => setCurrentNumber(index)}>{index}</button>;
  }

  const choiceValues = choicesForDegree(degree);
  const choices = (
    <div className="choice-row">
      {choiceValues.map((value: number) => renderChoice(value))}
    </div>
  );

  let status;
  if (gameOver) {
    status = "Winner!";
  } else {
    status = "current number: " + currentNumber;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          cells={current.cells}
          degree={degree}
          onClick={(i) => handleCellClick(i)}
        />
      </div>
      <div className="game-controls">
        {choices}
        {degrees}
      </div>
      <div className="game-history">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
