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
    return (
      <Cell
        value={cells[index]}
        key={index}
        onClick={() => onClick(index)}
      />
    );
  }

  const rowValues = rowValuesForDegree(degree);
  return (
    <div>
      {rowValues.map((row: Array<number>) => (
        <div className="board-row">
          {row.map((value: number) => renderCell(value))}
        </div>
      ))}
    </div>
  );
};
