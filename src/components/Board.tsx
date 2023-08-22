import React from "react";
import { Cell } from "./Cell";
import { rowValuesForDegree } from "../utils/BoardUtils";
import { GameState } from "../model/GameState";

export const Board: React.FC<{
  degree: number;
  cells: GameState;
  onCellClick: (index: number) => void;
  onChoiceClick: (index: number) => void;
}> = ({ degree, cells, onCellClick, onChoiceClick }) => {

  function renderCell(index: number) {
    const key = `cell.${index}`;
    return (
      <Cell value={cells[index]} key={key} onClick={() => onCellClick(index)} />
    );
  }

  function renderChoice(index: number) {
    const key = `choice.${index}`;
    return (
      <Cell value={index} key={key} customCss="my-2 bg-gray-400" onClick={() => onChoiceClick(index)} />
    );
  }

  const rowValues = rowValuesForDegree(degree);
  const size = degree * degree;
  // todo: fix the variable grid sizing... this was totally breaking when trying to format the css string
  const gridCss = `grid ${size === 4 ? "grid-cols-4" : "grid-cols-9"} gap-1 max-w-fit`;
  return (
    <div className={gridCss}>
      {Array.from({ length: size * size }).map((_, index) => renderCell(index))}
      {Array.from({ length: size }).map((_, index) => renderChoice(index+1))}
    </div>
  );
};
