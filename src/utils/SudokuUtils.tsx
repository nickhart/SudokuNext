import { generateAscendingArray } from "./BoardUtils";

export const countMatchingElements = (arr: number[], target: number): number => {
  return arr.reduce((count, currentElement) => {
    if (currentElement === target) {
      return count + 1;
    }
    return count;
  }, 0);
};

export function choicesForDegree(degree: number): Array<number> {
  const length = degree * degree;
  return Array.from({ length }, (_, index) => index+1);
}

function rowAndColumnFromIndex(index: number, degree: number) {
  const size = degree * degree;
  let col = index % size;
  let row = (index - col) / size;
  return { row: row, col: col };
}

export function isLegalPlay(
  cells: Array<number>,
  i: number,
  choice: number,
  degree: number
): boolean {
  if (!choice) {
    // can always clear?
    return true;
  }
  if (cells[i]) {
    // can never overwrite
    return false;
  }

  const { row, col } = rowAndColumnFromIndex(i, degree);
  const rowValues = cellValuesForRow(row, degree);
  const rowNumbers = rowValues.map((value) => cells[value]);
  if (rowNumbers.includes(choice)) {
    console.log(`number ${choice} is already in row ${row} (${rowNumbers})`);
    return false;
  }
  const colValues = cellValuesForColumn(col, degree);
  const colNumbers = colValues.map((value) => cells[value]);
  if (colNumbers.includes(choice)) {
    console.log(`number ${choice} is already in column ${col} (${colNumbers})`);
    return false;
  }

  // eg: for degree 2...
  // [0, 1, 2, 3]
  // [4, 5, 6, 7]
  // [8, 9, 10, 11]
  // [12, 13, 14, 15]
  // square 0,0 x 1,1 = [0, 1, 4, 5]
  // square 0,2 x 1,3 = [2, 3, 6, 7]
  // square 2,0 x 3,1 = [8, 9, 12, 13]
  // square 2,2 x 3,3 = [10, 11, 14, 15]
  const squareValues = cellValuesForSquare(row, col, degree);
  const squareNumbers = squareValues.map((value) => cells[value]);
  if (squareNumbers.includes(choice)) {
    console.log(
      `number ${choice} is already in sqaure containing cell ${row},${col} (${squareNumbers})`
    );
    return false;
  }

  return true;
}

export function isGameOver(cells: Array<number>): boolean {
  return !cells.includes(0);
}

export function newGameForDegree(degree: number): number[] {
  return Array(degree * degree * degree * degree).fill(0);
}

function cellValuesForRow(row: number, degree: number) {
  const size = degree * degree;
  return generateAscendingArray(size * row, size);
}

function cellValuesForColumn(column: number, degree: number) {
  const size = degree * degree;
  return generateAscendingArray(column, size, size);
}

function cellValuesForSquare(row: number, col: number, degree: number) {
  const size = degree * degree;
  let result = [];

  // convert the row and column to the starting row and column for whichever square it lies within
  const rowStart = row - (row % degree);
  const colStart = col - (col % degree);

  // instead of a row or column we want to concat N rows, where N is the degree
  for (let index = 0; index != degree; ++index) {
    const start = (rowStart + index) * size + colStart;
    const array = generateAscendingArray(start, degree);
    result = result.concat(array);
  }
  return result;
}
