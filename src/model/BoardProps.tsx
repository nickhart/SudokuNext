import { GameState } from "./GameState";

export interface BoardProps {
  cells: GameState;
  degree: number;
  onCellClick: (index: number) => void;
  onChoiceClick: (index: number) => void;
}
