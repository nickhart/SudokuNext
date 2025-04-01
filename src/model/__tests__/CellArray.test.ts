import { CellArray } from '../CellArray';

describe('CellArray', () => {
  it('allocates a CellArray with values', () => {
    const cellArray = new CellArray(9);
    expect(cellArray.cells.length).toStrictEqual(9);
  });
});
