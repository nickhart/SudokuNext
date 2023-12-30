import { Cell } from "./Cell";

export class CellArray {
  cells: Array<Cell>;
  // TODO, stats for row, col, square? eg: number of 0's

  constructor(size: number) {
    this.cells = new Array<Cell>(size);
  }

  findNonEmptyCells() {
    return this.cells.filter((cell) => cell.value !== 0);
  }

  findEmptyCells() {
    return this.cells.filter((cell) => cell.value === 0);
  }
  findUsedValues() {
    return this.findNonEmptyCells().map((cell) => cell.value);
  }
  ascendingIntegers(): number[] {
    return Array.from({ length: this.cells.length }, (_, index) => index + 1);
  }

  findMissingValues() {
    let result = this.ascendingIntegers();
    let used = this.findUsedValues();
    return result.filter((value) => !used.includes(value));
  }
}
