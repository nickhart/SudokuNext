

type Cell = { value: number; annotations: number; };

function subArrayFromBuffer<T>(buffer: Array<T>, start: number, stride: number, size: number) {
    let result = new Array<T>(size);
    const bufferSize = size * size;
    let index = 0;
    for (let cursor = start; cursor < bufferSize; cursor += stride) {
        result[index++] = buffer[cursor];
    }
    return result;
}



export class Sudoku {
    size: number;
    cells: Array<Cell> | undefined;

    private side: number;

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

    getRow(row: number) {
        this.validateIndex(row);
        return subArrayFromBuffer(this.cells, row * this.size, 1, this.size);
    }

    getColumn(column: number) {
        this.validateIndex(column);
        return subArrayFromBuffer(this.cells, column, this.size, this.size);
    }

    getSquare(square: number) {
        this.validateIndex(square);

        // const squareStride = this.side * this.size;
        const stride = this.size - this.side;
        const start = (square % this.side) * this.side + (square / this.side) * (this.side * this.size);

        let result = new Array<Cell>(this.size);
        const bufferSize = this.size * this.size;
        let index = 0;
        for (let cursor = start; cursor < bufferSize; cursor += stride) {
            for (let n = 0; n != this.side; n++) {
                result[index++] = this.cells[cursor++];
            }
        }
        return result;
    

    }
};
