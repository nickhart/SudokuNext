export type GameState = Array<number>;

type AnnotationState = Array<number>;

export class GameData {
  degree: number;
  dimension: number;
  state: GameState | undefined;
  annotations: AnnotationState | undefined;

  GameData(degree: number) {
    if (degree >= 2 || degree <= 3) {
      this.degree = degree;
      this.dimension = degree * degree;
      let bufferSize = this.dimension * this.dimension;
      this.state = new Array<number>(bufferSize);
      this.annotations = new Array<number>(bufferSize);
    } else {
      throw new Error('GameData degree must be 2 or 3');
    }
  }

  stateRow(row: number) {
    if (row >= 0 && row < this.dimension) {
    } else {
      throw new Error(`GameData row must be between 0 and ${this.dimension}`);
    }
  }

  stateColumn(column: number) {
    if (column >= 0 && column < this.dimension) {
    } else {
      throw new Error(`GameData column must be between 0 and ${this.dimension}`);
    }
  }

  stateSquare(square: number) {
    if (square >= 0 && square < this.dimension) {
    } else {
      throw new Error(`GameData column must be between 0 and ${this.dimension}`);
    }
  }
}
