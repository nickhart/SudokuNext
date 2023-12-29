

type Cell = { value: number; annotations: number; };
type CellArray = Array<Cell>;

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
            throw new Error(`Sudoku index must be between 0 and ${this.size}, not ${index}`);
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
            this.cells[i] = { value: 0, annotations: 0 };
        }

        switch (size) {
            case 4: this.side = 2; break;
            case 9: this.side = 3; break;
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

        this.stats = new Array<number>(maxNumber);
        for (let i = 0; i != maxNumber; i++) {
            this.stats[i] = 0;
        }

        // iterate through the cells, map them to rows, columns, and squares, and record stats for each number
        let row = 0;
        let column = 0;
        let square = 0;
        let squareIndex = 0;
        for (let i = 0; i != bufferSize; i++) {
            const cell = this.cells[i];

            this.rows[row][column] = cell;
            this.columns[column][row] = cell;
            this.squares[square][squareIndex] = cell;
            // console.log(`square [${square}][${squareIndex}] = ${cell.value}`);
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
                    square = Math.floor(column / this.side) + Math.floor(row / this.side) * this.side;
                }
            }
        }
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
};
