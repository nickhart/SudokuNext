import React from "react";
import { Cell } from "./Cell";
import { rowValuesForDegree } from "../utils/BoardUtils";
import { GameState } from "../model/GameState";
import { isLegalPlay, countMatchingElements } from "src/utils/SudokuUtils";

// todo: compute this
const weights4x4: Array<number> = [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0];
const weights9x9: Array<number> = [
  0, 0, 0, 1, 1, 1, 0, 0, 0, 
  0, 0, 0, 1, 1, 1, 0, 0, 0, 
  0, 0, 0, 1, 1, 1, 0, 0, 0, 
  1, 1, 1, 0, 0, 0, 1, 1, 1, 
  1, 1, 1, 0, 0, 0, 1, 1, 1, 
  1, 1, 1, 0, 0, 0, 1, 1, 1, 
  0, 0, 0, 1, 1, 1, 0, 0, 0, 
  0, 0, 0, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 0, 0, 0,
];

function weightForIndex(index: number, degree: number): number {
  const size = degree * degree;

  switch (degree) {
    case 2: return weights4x4[index];
    case 3: return weights9x9[index];
  }
  return 800;
}


export const Board: React.FC<{
  degree: number;
  cells: GameState;
  currentNumber: number;
  onCellClick: (index: number) => void;
  onChoiceClick: (index: number) => void;
}> = ({ degree, cells, currentNumber, onCellClick, onChoiceClick }) => {
  function renderCell(index: number) {

    const key = `cell.${index}`;
    const weight = weightForIndex(index, degree);
    const canClick = (cells[index] === 0);
    return (
      <Cell
        value={cells[index]}
        key={key}
        weight={weight}
        onClick={() => onCellClick(index)}
        canClick={canClick}
        isSelected={false}
      />
    );
  }

  function renderChoice(index: number) {
    const key = `choice.${index}`;
    const countInUse = countMatchingElements(cells, index);
    const canClick = (countInUse < size);
    return (
      <Cell
        value={index}
        key={key}
        weight={1}
        onClick={() => onChoiceClick(index)}
        canClick={canClick}
        isSelected={currentNumber===index}
      />
    );
  }

  const rowValues = rowValuesForDegree(degree);
  const size = degree * degree;
  // todo: fix the variable grid sizing... this was totally breaking when trying to format the css string
  const gridCss = `grid ${
    size === 4 ? "grid-cols-4" : "grid-cols-9"
  } gap-1 max-w-fit`;
  return (
    <div className={gridCss}>
      {Array.from({ length: size * size }).map((_, index) => renderCell(index))}
      {Array.from({ length: size }).map((_, index) => renderChoice(index + 1))}
    </div>
  );
};
