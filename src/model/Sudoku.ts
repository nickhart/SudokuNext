import { setBit, resetBit, testBit } from "../utils/BitUtils";
import { Cell } from "./Cell";
import { CellArray } from "./CellArray";


export class Sudoku {
  readonly size: number;
  cells: Array<Cell> | undefined; // TODO make this a number array

  // derived data--we should be able to discard all this and regenerate it with our logic
  // move it into a separate class?
  readonly side: number;
  rows: Array<CellArray> | undefined;
  columns: Array<CellArray> | undefined;
  squares: Array<CellArray> | undefined;
  stats: Array<number> | undefined;

  validateIndex(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error(
        `Sudoku index must be between 0 and ${this.size}, not ${index}`
      );
    }
  }

  validateSize(size: number) {
    if (size != 4 && size != 9) {
      throw new Error(`Sudoku size must be 4 or 9, not ${size}`);
    }
  }

  constructor(size: number) {
    this.validateSize(size);
    this.size = size;
    const bufferSize = size * size;
    this.cells = new Array<Cell>(bufferSize);
    for (let i = 0; i != bufferSize; i++) {
      this.cells[i] = { value: 0, annotations: 0, row: 0, column: 0 };
    }

    switch (size) {
      case 4:
        this.side = 2;
        break;
      case 9:
        this.side = 3;
        break;
    }
  }

  // TODO: better name for this?
  updateDerivedData(strictSize: boolean = true) {
    if (!this.cells) {
      throw new Error("Sudoku not initialized!");
    }

    this.rows = [];
    this.columns = [];
    this.squares = [];
    for (let i = 0; i != this.size; i++) {
      this.rows.push(new CellArray(this.size));
      this.columns.push(new CellArray(this.size));
      this.squares.push(new CellArray(this.size));
    }
    const bufferSize = this.size * this.size;
    const maxNumber = strictSize ? this.size : bufferSize; // for testing

    this.stats = new Array<number>(maxNumber + 1).fill(0);

    // iterate through the cells, map them to rows, columns, and squares, and record stats for each number
    let row = 0;
    let column = 0;
    let square = 0;
    let squareIndex = 0;
    for (let i = 0; i != bufferSize; i++) {
      const cell = this.cells[i];
      cell.row = row;
      cell.column = column;
      this.rows[row].cells[column] = cell;
      this.columns[column].cells[row] = cell;
      this.squares[square].cells[squareIndex] = cell;
      this.stats[cell.value]++;

      column++;
      if (column === this.size) {
        column = 0;
        row++;
      }

      squareIndex++;
      if (squareIndex % this.side === 0) {
        squareIndex = (row % this.side) * this.side; // eg: start at 0, 3, 6
        square++; // next square
        if (square % this.side === 0) {
          square =
            Math.floor(column / this.side) +
            Math.floor(row / this.side) * this.side;
        }
      }
    }
  }

  annotateSingles() {
    for (let i = 0; i != this.size; i++) {
      const row = this.rows[i];
      let emptyCells = row.findEmptyCells();
      if (emptyCells.length === 1) {
        const cell = emptyCells[0];
        const missingValues = row.findMissingValues();
        cell.annotations = setBit(cell.annotations, missingValues[0]);
        console.log(`single found in row ${i}, column: ${cell.column}, value: ${missingValues[0]} => bitflags ${cell.annotations}`);
      }

      const column = this.columns[i];
      emptyCells = column.findEmptyCells();
      if (emptyCells.length === 1) {
        const cell = emptyCells[0];
        const missingValues = column.findMissingValues();
        cell.annotations = setBit(cell.annotations, missingValues[0]);
        console.log(`single found in column ${i}, row: ${cell.row}, value: ${missingValues[0]} => bitflags ${cell.annotations}`);
      }

      const square = this.squares[i];
      emptyCells = square.findEmptyCells();
      if (emptyCells.length === 1) {
        const cell = emptyCells[0];
        const missingValues = square.findMissingValues();
        cell.annotations = setBit(cell.annotations, missingValues[0]);
        console.log(`single found in square ${i}, row: ${cell.row}, column ${cell.column}, value: ${missingValues[0]} => bitflags ${cell.annotations}`);
      }
    }
  }

  setValue(row: number, column: number, value: number) {
    const cell = this.rows[row].cells[column];
    cell.value = value;
    cell.annotations = 0; // clear for this cell
    // TODO flag that annotations need to be updated, eg: row, column, square
  }

  setAnnotation(row: number, column: number, value: number) {
    const cell = this.rows[row].cells[column];
    cell.annotations = setBit(cell.annotations, value);
  }

  clearAnnotation(row: number, column: number, value: number) {
    const cell = this.rows[row].cells[column];
    cell.annotations = resetBit(cell.annotations, value);
  }

  getAnnotations(row: number, column: number) {
    const cell = this.rows[row].cells[column];
    let result = [];
    const max = this.size + 1;
    for (let i = 1; i != max; i++) {
      if (testBit(cell.annotations, i) !== 0) {
        result.push(i);
      }
    }
    return result;
  }
}
