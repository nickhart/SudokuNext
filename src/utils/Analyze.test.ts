import { render, screen } from '@testing-library/react';
import { analyzeGameState } from './Analyze';
import { GameState } from 'src/model/GameState';
import { newGameForDegree } from './SudokuUtils';

describe('analyzeGameState', () => {
  it('expands into rows, cols, squares', () => {
    const gameState = newGameForDegree(2)

    const result = analyzeGameState(gameState)
    expect(result).not.toBeUndefined()
    if (result) {
        const { rows, cols, squares } = result
        console.log(`rows: ${rows}`)
        console.log(`cols: ${cols}`)
        console.log(`squares: ${squares}`)
    }
  });
});
