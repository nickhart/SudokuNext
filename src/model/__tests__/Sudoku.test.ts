import '@testing-library/jest-dom'
import { Sudoku } from "../Sudoku";

const generateSudoku = function(size) {
    let result = new Sudoku(size);
    // this is not a valid Sudoku grid, but each value is unique!
    const bufferSize = size * size;
    for (let index = 0; index != bufferSize; index++) {
        result.cells[index].value = index;
    }
    return result;
}

describe("Sudoku", () => {

    it("can get the correct row", () => {
        let sudoku = generateSudoku(4);
        let row = sudoku.getRow(0);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value === i);
        }
        
        row = sudoku.getRow(1);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value === i + 4);
        }

        row = sudoku.getRow(2);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value === i + 8);
        }

        row = sudoku.getRow(3);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value === i + 12);
        }
    });

    it("can get the correct column", () => {
        let sudoku = generateSudoku(4);
        let column = sudoku.getColumn(0);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value === i * 4);
        }

        column = sudoku.getColumn(1);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value === (i * 4) + 1);
        }

        column = sudoku.getColumn(2);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value === (i * 4) + 2);
        }

        column = sudoku.getColumn(3);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value === (i * 4) + 3);
        }

    });

    it("can get the correct square", () => {
        let sudoku = generateSudoku(4);
        let square = sudoku.getSquare(0);
        const expected1 = [0, 1, 4, 5];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value === expected1[i]);
        }

        const expected2 = [2, 3, 6, 7];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value === expected2[i]);
        }

        const expected3 = [8, 9, 12, 13];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value === expected3[i]);
        }

        const expected4 = [10, 11, 14, 15];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value === expected4[i]);
        }
    });
});
