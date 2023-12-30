import { setBit, resetBit, testBit } from "../utils/BitUtils";

type Cell = {
  value: number;
  annotations: number;
  // this is derived data, but convenient to cache in each Cell
  row: number;
  column: number;
  // exclusions: number;
};

type CellArray = Array<Cell>; // TODO, stats for row, col, square? eg: number of 0's

function findNonEmptyCells(array: CellArray) {
  return array.filter((cell) => cell.value !== 0);
}

function findEmptyCells(array: CellArray) {
    return array.filter((cell) => cell.value === 0);
}

function findUsedValues(array: CellArray) {
    return findNonEmptyCells(array).map(cell => cell.value);
}

function ascendingIntegers(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
}

function findMissingValues(array: CellArray, size: number) {
    let result = ascendingIntegers(size);
    let used = findUsedValues(array);
    return result.filter(value => !used.includes(value));
}

export class Sudoku {
  size: number;
  cells: CellArray | undefined;

  private side: number;
  private rows: Array<CellArray> | undefined;
  private columns: Array<CellArray> | undefined;
  private squares: Array<CellArray> | undefined;
  private stats: Array<number> | undefined;

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

    this.rows = new Array<CellArray>(this.size);
    this.columns = new Array<CellArray>(this.size);
    this.squares = new Array<CellArray>(this.size);
    for (let i = 0; i != this.size; i++) {
      this.rows[i] = new Array<Cell>(this.size);
      this.columns[i] = new Array<Cell>(this.size);
      this.squares[i] = new Array<Cell>(this.size);
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
      this.rows[row][column] = cell;
      this.columns[column][row] = cell;
      this.squares[square][squareIndex] = cell;
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
      let emptyCells = findEmptyCells(row);
      if (emptyCells.length === 1) {
        const cell = emptyCells[0];
        const missingValues = findMissingValues(row, this.size);
        cell.annotations = setBit(cell.annotations, missingValues[0]);
        console.log(`single found in row ${i}, column: ${cell.column}, value: ${missingValues[0]} => bitflags ${cell.annotations}`);
      }

      const column = this.columns[i];
      emptyCells = findEmptyCells(column);
      if (emptyCells.length === 1) {
        const cell = emptyCells[0];
        const missingValues = findMissingValues(column, this.size);
        cell.annotations = setBit(cell.annotations, missingValues[0]);
        console.log(`single found in column ${i}, row: ${cell.row}, value: ${missingValues[0]} => bitflags ${cell.annotations}`);
      }

      const square = this.squares[i];
      emptyCells = findEmptyCells(square);
      if (emptyCells.length === 1) {
        const cell = emptyCells[0];
        const missingValues = findMissingValues(square, this.size);
        cell.annotations = setBit(cell.annotations, missingValues[0]);
        console.log(`single found in square ${i}, row: ${cell.row}, column ${cell.column}, value: ${missingValues[0]} => bitflags ${cell.annotations}`);
      }
    }
  }

  setValue(row: number, column: number, value: number) {
    const cell = this.rows[row][column];
    cell.value = value;
    cell.annotations = 0; // clear for this cell
    // TODO flag that annotations need to be updated, eg: row, column, square
  }

  setAnnotation(row: number, column: number, value: number) {
    const cell = this.rows[row][column];
    cell.annotations = setBit(cell.annotations, value);
  }

  clearAnnotation(row: number, column: number, value: number) {
    const cell = this.rows[row][column];
    cell.annotations = resetBit(cell.annotations, value);
  }

  getAnnotations(row: number, column: number) {
    const cell = this.rows[row][column];
    let result = [];
    const max = this.size + 1;
    for (let i = 1; i != max; i++) {
      if (testBit(cell.annotations, i) !== 0) {
        result.push(i);
      }
    }
    return result;
  }

  getRow(row: number) {
    this.validateIndex(row);
    return this.rows[row];
  }

  getColumn(column: number) {
    this.validateIndex(column);
    return this.columns[column];
  }

  getSquare(square: number) {
    this.validateIndex(square);
    return this.squares[square];
  }

  getStats() {
    return this.stats;
  }
}
