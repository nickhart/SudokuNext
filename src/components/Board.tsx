import React from "react";
import { Cell } from "./Cell";
import { rowValuesForDegree } from "../utils/BoardUtils";
import { GameState } from "../model/GameState";

export const Board: React.FC<{
  degree: number;
  cells: GameState;
  onClick: (index: number) => void;
}> = ({ degree, cells, onClick }) => {
  function renderCell(index: number) {
    const key = `cell.${index}`;
    return (
      <Cell value={cells[index]} key={key} onClick={() => onClick(index)} />
    );
  }

  const rowValues = rowValuesForDegree(degree);
  const size = degree * degree;
  return (
    <div className={`grid grid-cols-${size} gap-1 max-w-fit`}>
      {Array.from({ length: size * size }).map((_, index) => renderCell(index))}
    </div>
  );
};
