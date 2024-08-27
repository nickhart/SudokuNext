import { assert } from "console";
import { GameState } from "src/model/GameState";

const rows4x4 = [ 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3 ]
const cols4x4 = [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3 ]
const squares4x4 = [ 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 3, 3 ]

const rows9x9 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                1, 1, 1, 1, 1, 1, 1, 1, 1,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 
                3, 3, 3, 3, 3, 3, 3, 3, 3, 
                4, 4, 4, 4, 4, 4, 4, 4, 4, 
                5, 5, 5, 5, 5, 5, 5, 5, 5, 
                6, 6, 6, 6, 6, 6, 6, 6, 6,
                7, 7, 7, 7, 7, 7, 7, 7, 7, 
                8, 8, 8, 8, 8, 8, 8, 8, 8 ]
const cols9x9 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8, 
                0, 1, 2, 3, 4, 5, 6, 7, 8 ]
const squares9x9 = [ 0, 0, 0, 1, 1, 1, 2, 2, 2,
                0, 0, 0, 1, 1, 1, 2, 2, 2,
                0, 0, 0, 1, 1, 1, 2, 2, 2,
                3, 3, 3, 4, 4, 4, 5, 5, 5,
                3, 3, 3, 4, 4, 4, 5, 5, 5,
                3, 3, 3, 4, 4, 4, 5, 5, 5,
                6, 6, 6, 7, 7, 7, 8, 8, 8,
                6, 6, 6, 7, 7, 7, 8, 8, 8,
                6, 6, 6, 7, 7, 7, 8, 8, 8 ]

export function analyzeGameState(gameState: GameState) {

    const size = gameState.length === 16 ? 4 : gameState.length === 81 ? 9 : 0
    assert(size !== 0)
    if (!size) return undefined

    const rowMap = size === 4 ? rows4x4 : rows9x9
    const colMap = size === 4 ? cols4x4 : cols9x9
    const squareMap = size === 4 ? squares4x4 : squares9x9

    // break the board down by row, column, and squares
    let rows: number[][] = Array.from({ length: size }, () => [])
    let cols: number[][] = Array.from({ length: size }, () => [])
    let squares: number[][] = Array.from({ length: size }, () => [])

    gameState.forEach((value, index) => {
        const row = rowMap[index]
        const col = colMap[index]
        const square = squareMap[index]
        if (value) {
            assert(canPlay(value, rows[row], cols[col], squares[square]))
        }
        rows[row].push(value)
        cols[col].push(value)
        squares[square].push(value)
    })

    return { rows, cols, squares }
}

export function canPlay(value, row, col, square) {
    return !(row.includes(value) || col.includes(value) || square.includes(value))
}

export function findLegalPlays(value, rows, cols, squares) {
    const possiblePlays = [
        { row: 0, col: 0, square: 0 },
        { row: 0, col: 1, square: 0 },
        { row: 1, col: 0, square: 0 },
        { row: 1, col: 1, square: 0 },
        { row: 0, col: 2, square: 1 },
        { row: 0, col: 3, square: 1 },
        { row: 1, col: 2, square: 1 },
        { row: 1, col: 3, square: 1 },
        { row: 2, col: 0, square: 2 },
        { row: 2, col: 1, square: 2 },
        { row: 3, col: 0, square: 2 },
        { row: 3, col: 1, square: 2 },
        { row: 2, col: 2, square: 3 },
        { row: 2, col: 3, square: 3 },
        { row: 3, col: 2, square: 3 },
        { row: 3, col: 3, square: 3 }
    ]
    let result = []
    possiblePlays.forEach((play, _) => {
        const {row, col, square} = play
        if (canPlay(value, rows[row], cols[col], squares[square])) {
            result.push(play)
        }
    })
    return result
}