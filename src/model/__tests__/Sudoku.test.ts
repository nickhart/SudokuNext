import '@testing-library/jest-dom'
import { Sudoku } from "../Sudoku";
import { skip } from 'node:test';

const generateSudoku = function(size) {
    let result = new Sudoku(size);
    // this is not a valid Sudoku grid, but each value is unique!
    const bufferSize = size * size;
    for (let index = 0; index != bufferSize; index++) {
        result.cells[index].value = index;
    }
    result.updateDerivedData();
    return result;
}

describe("Sudoku", () => {

    it("can get the correct row", () => {
        let sudoku = generateSudoku(4);
        let row = sudoku.getRow(0);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value).toBe(i);
        }
        
        row = sudoku.getRow(1);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value).toBe(i + 4);
        }

        row = sudoku.getRow(2);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value).toBe(i + 8);
        }

        row = sudoku.getRow(3);
        for (let i = 0; i != 4; i++) {
            expect(row[i].value).toBe(i + 12);
        }
    });

    it("can get the correct column", () => {
        let sudoku = generateSudoku(4);
        let column = sudoku.getColumn(0);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value).toBe(i * 4);
        }

        column = sudoku.getColumn(1);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value).toBe((i * 4) + 1);
        }

        column = sudoku.getColumn(2);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value).toBe((i * 4) + 2);
        }

        column = sudoku.getColumn(3);
        for (let i = 0; i != 4; i++) {
            expect(column[i].value).toBe((i * 4) + 3);
        }

    });

    it("can get the correct square", () => {
        let sudoku = generateSudoku(4);
        let square = sudoku.getSquare(0);
        const expected1 = [0, 1, 4, 5];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value).toBe(expected1[i]);
        }

        square = sudoku.getSquare(1);
        const expected2 = [2, 3, 6, 7];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value).toBe(expected2[i]);
        }

        square = sudoku.getSquare(2);
        const expected3 = [8, 9, 12, 13];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value).toBe(expected3[i]);
        }

        square = sudoku.getSquare(3);
        const expected4 = [10, 11, 14, 15];
        for (let i = 0; i != 4; i++) {
            expect(square[i].value).toBe(expected4[i]);
        }
    });
});
