import { Cell } from "./Cell";

function ascendingIntegers(size: number): number[] {
  return Array.from({ length: size }, (_, index) => index + 1);
}

export class CellArray {
  cells: Array<Cell>;
  // TODO, stats for row, col, square? eg: number of 0's
  unusedValues: Array<number>;
  usedValues: Array<number>;
  emptyCells: Array<Cell>;
  nonEmptyCells: Array<Cell>;

  constructor(size: number) {
    this.cells = new Array<Cell>(size);
    this.unusedValues = [];
    this.usedValues = [];
    this.emptyCells = [];
    this.nonEmptyCells = [];
  }

  updateDerivedData() {
    // TODO this could all be rewritten and optimized to run in one pass
    this.emptyCells = this.cells.filter(cell => cell.value === 0);
    this.nonEmptyCells = this.cells.filter(cell => cell.value !== 0);
    this.usedValues = this.nonEmptyCells.map(cell => cell.value);
    const allValues = ascendingIntegers(this.cells.length);
    this.unusedValues = allValues.filter(value => !this.usedValues.includes(value));
  }
}
