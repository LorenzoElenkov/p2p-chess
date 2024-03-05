export const chess = {
  columns: 8,
  rows: 8
};
export const columns = new Array(chess.columns).fill('');

export const whiteBoard = columns
  .map((_, index) => {
    const tiles = columns.map((_, xIndex) => {
      const charFromCode = String.fromCharCode(65 + xIndex);
      return charFromCode + (index + 1);
    });
    return tiles;
  })
  .reverse();

export const blackBoard = columns
  .map((_, index) => {
    const tiles = columns.map((_, xIndex) => {
      const charFromCode = String.fromCharCode(72 - xIndex);
      return charFromCode + (8 - index);
    });
    return tiles;
  })
  .reverse();
