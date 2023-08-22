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
      <Cell
        value={cells[index]}
        key={key}
        onClick={() => onClick(index)}
      />
    );
  }

  const rowValues = rowValuesForDegree(degree);
  return (
    <div>
      {rowValues.map((row: Array<number>, index: number) => (
        <div className="board-row" key={`row.${index}`}>
          {row.map((value: number) => renderCell(value))}
        </div>
      ))}
    </div>
  );
};
