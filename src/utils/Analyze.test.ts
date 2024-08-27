// import { render, screen } from '@testing-library/react';
import { analyzeGameState, canPlay, findLegalPlays } from './Analyze';
// import { GameState } from 'src/model/GameState';
import { testGameForDegree } from './SudokuUtils';

describe('analyzeGameState', () => {
  it('expands into rows, cols, squares', () => {
    const gameState = testGameForDegree(2, 0)

    const result = analyzeGameState(gameState)
    expect(result).not.toBeUndefined()
    if (result) {
        const { rows, cols, squares } = result
        console.log(`rows: [${rows.join("], [")}]`)
        console.log(`cols: [${cols.join("], [")}]`)
        console.log(`squares: [${squares.join("], [")}]`)
    }
  });

  it('can check legal plays', () => {
    const gameState = testGameForDegree(2, 0)

    const result = analyzeGameState(gameState)
    expect(result).not.toBeUndefined()

    const { rows, cols, squares } = result
    console.log(`rows: [${rows.join("],\n      [")}]`)

    const expectedData = [ 
        { value: 1, row: 0, col:0, square: 0, expected: true },
        { value: 1, row: 0, col:1, square: 0, expected: true },
        { value: 1, row: 1, col:0, square: 0, expected: true },
        { value: 1, row: 1, col:1, square: 0, expected: true },
        { value: 1, row: 0, col:2, square: 1, expected: true },
        { value: 1, row: 0, col:3, square: 1, expected: true },
        { value: 1, row: 1, col:2, square: 1, expected: true },
        { value: 1, row: 1, col:3, square: 1, expected: true },
        { value: 1, row: 2, col:0, square: 2, expected: true },
        { value: 1, row: 2, col:1, square: 2, expected: true },
        { value: 1, row: 3, col:0, square: 2, expected: true },
        { value: 1, row: 3, col:1, square: 2, expected: true },
        { value: 1, row: 2, col:2, square: 3, expected: true },
        { value: 1, row: 2, col:3, square: 3, expected: true },
        { value: 1, row: 3, col:2, square: 3, expected: true },
        { value: 1, row: 3, col:3, square: 3, expected: true },

        { value: 2, row: 0, col:0, square: 0, expected: true },
        { value: 2, row: 0, col:1, square: 0, expected: true },
        { value: 2, row: 1, col:0, square: 0, expected: false },
        { value: 2, row: 1, col:1, square: 0, expected: false },
        { value: 2, row: 0, col:2, square: 1, expected: false },
        { value: 2, row: 0, col:3, square: 1, expected: false },
        { value: 2, row: 1, col:2, square: 1, expected: false },
        { value: 2, row: 1, col:3, square: 1, expected: false },
        { value: 2, row: 2, col:0, square: 2, expected: true },
        { value: 2, row: 2, col:1, square: 2, expected: true },
        { value: 2, row: 3, col:0, square: 2, expected: false },
        { value: 2, row: 3, col:1, square: 2, expected: false },
        { value: 2, row: 2, col:2, square: 3, expected: false },
        { value: 2, row: 2, col:3, square: 3, expected: false },
        { value: 2, row: 3, col:2, square: 3, expected: false },
        { value: 2, row: 3, col:3, square: 3, expected: false },

        { value: 3, row: 0, col:0, square: 0, expected: true },
        { value: 3, row: 0, col:1, square: 0, expected: true },
        { value: 3, row: 1, col:0, square: 0, expected: true },
        { value: 3, row: 1, col:1, square: 0, expected: true },
        { value: 3, row: 0, col:2, square: 1, expected: true },
        { value: 3, row: 0, col:3, square: 1, expected: true },
        { value: 3, row: 1, col:2, square: 1, expected: true },
        { value: 3, row: 1, col:3, square: 1, expected: true },
        { value: 3, row: 2, col:0, square: 2, expected: true },
        { value: 3, row: 2, col:1, square: 2, expected: true },
        { value: 3, row: 3, col:0, square: 2, expected: true },
        { value: 3, row: 3, col:1, square: 2, expected: true },
        { value: 3, row: 2, col:2, square: 3, expected: true },
        { value: 3, row: 2, col:3, square: 3, expected: true },
        { value: 3, row: 3, col:2, square: 3, expected: true },
        { value: 3, row: 3, col:3, square: 3, expected: true },

        { value: 4, row: 0, col:0, square: 0, expected: false },
        { value: 4, row: 0, col:1, square: 0, expected: false },
        { value: 4, row: 1, col:0, square: 0, expected: false },
        { value: 4, row: 1, col:1, square: 0, expected: false },
        { value: 4, row: 0, col:2, square: 1, expected: true },
        { value: 4, row: 0, col:3, square: 1, expected: false },
        { value: 4, row: 1, col:2, square: 1, expected: false },
        { value: 4, row: 1, col:3, square: 1, expected: false },
        { value: 4, row: 2, col:0, square: 2, expected: false },
        { value: 4, row: 2, col:1, square: 2, expected: false },
        { value: 4, row: 3, col:0, square: 2, expected: false },
        { value: 4, row: 3, col:1, square: 2, expected: false },
        { value: 4, row: 2, col:2, square: 3, expected: false },
        { value: 4, row: 2, col:3, square: 3, expected: false },
        { value: 4, row: 3, col:2, square: 3, expected: false },
        { value: 4, row: 3, col:3, square: 3, expected: false }

    ]
    expectedData.forEach(({value, row, col, square, expected}, _) => {
        if (canPlay(value, rows[row], cols[col], squares[square]) != expected) {
            console.log(`value: ${value} row: ${row} col: ${col} square: ${square} expected: ${expected}`)
        }
        expect(canPlay(value, rows[row], cols[col], squares[square])).toBe(expected)
    })
  })

  it('can find the legal plays', () => {
    const gameState = testGameForDegree(2, 0)

    const result = analyzeGameState(gameState)
    expect(result).not.toBeUndefined()

    const { rows, cols, squares } = result
    console.log(`rows: [${rows.join("],\n      [")}]`)

    let legalPlays = findLegalPlays(1, rows, cols, squares)
    // console.log(`legalPlays(1): ${JSON.stringify(legalPlays)}`)
    let expectedData = [ 
        { row: 0, col:0, square: 0 },
        { row: 0, col:1, square: 0 },
        { row: 1, col:0, square: 0 },
        { row: 1, col:1, square: 0 },
        { row: 0, col:2, square: 1 },
        { row: 0, col:3, square: 1 },
        { row: 1, col:2, square: 1 },
        { row: 1, col:3, square: 1 },
        { row: 2, col:0, square: 2 },
        { row: 2, col:1, square: 2 },
        { row: 3, col:0, square: 2 },
        { row: 3, col:1, square: 2 },
        { row: 2, col:2, square: 3 },
        { row: 2, col:3, square: 3 },
        { row: 3, col:2, square: 3 },
        { row: 3, col:3, square: 3 } ]
    expect(legalPlays.length).toBe(expectedData.length)
    legalPlays.forEach((play, index) => {
        const expected = expectedData[index]
        expect(play).toEqual(expected)
    })

    legalPlays = findLegalPlays(2, rows, cols, squares)
    // console.log(`legalPlays(2): ${JSON.stringify(legalPlays)}`)
    expectedData = [ 
        { row: 0, col:0, square: 0 },
        { row: 0, col:1, square: 0 },
        { row: 2, col:0, square: 2 },
        { row: 2, col:1, square: 2 } ]
    expect(legalPlays.length).toBe(expectedData.length)
    legalPlays.forEach((play, index) => {
        const expected = expectedData[index]
        expect(play).toEqual(expected)
    })
    
    legalPlays = findLegalPlays(3, rows, cols, squares)
    // console.log(`legalPlays(3): ${JSON.stringify(legalPlays)}`)
    expectedData = [ 
        { row: 0, col:0, square: 0 },
        { row: 0, col:1, square: 0 },
        { row: 1, col:0, square: 0 },
        { row: 1, col:1, square: 0 },
        { row: 0, col:2, square: 1 },
        { row: 0, col:3, square: 1 },
        { row: 1, col:2, square: 1 },
        { row: 1, col:3, square: 1 },
        { row: 2, col:0, square: 2 },
        { row: 2, col:1, square: 2 },
        { row: 3, col:0, square: 2 },
        { row: 3, col:1, square: 2 },
        { row: 2, col:2, square: 3 },
        { row: 2, col:3, square: 3 },
        { row: 3, col:2, square: 3 },
        { row: 3, col:3, square: 3 } ]
    expect(legalPlays.length).toBe(expectedData.length)
    legalPlays.forEach((play, index) => {
        const expected = expectedData[index]
        expect(play).toEqual(expected)
    })
    

    legalPlays = findLegalPlays(4, rows, cols, squares)
    // console.log(`legalPlays(4): ${JSON.stringify(legalPlays)}`)
    expectedData = [ 
        { row: 0, col:2, square: 1 } ]
    expect(legalPlays.length).toBe(expectedData.length)
    legalPlays.forEach((play, index) => {
        const expected = expectedData[index]
        expect(play).toEqual(expected)
    })
    
    })
});
