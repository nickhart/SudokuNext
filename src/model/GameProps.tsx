import { GameState } from "./GameState";

export interface GameProps {
  history?: GameState[];
  stepNumber?: number;
  currentNumber?: number;
}
