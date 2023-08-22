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
    <div className="grid grid-cols-4 gap-4">
    {Array.from({ length: 16 }).map((_, index) => 
    (
      <div
        key={`cell.${index}`}
        className="w-16 h-16 bg-blue-500 flex items-center justify-center"
      >
        {index + 1  /** renderCell(index) */  }
      </div>
    )
    )}
  </div>    
    // <div className="grid grid-cols-4 gap-4">
    //   {rowValues.map((row: Array<number>, index: number) => (
    //     <div className="board-row" key={`row.${index}`}>
    //       {row.map((value: number) => renderCell(value))}
    //     </div>
    //   ))}
    // </div>
  );
};
