export const chess = {
  columns: 8,
  rows: 8
};
export const columns = new Array(chess.columns).fill('');

export const whiteBoard = columns.map((_, index) => {
  const tiles = columns.map((_, xIndex) => {
    const charFromCode = String.fromCharCode(index + 65 + xIndex);
    return charFromCode + (index + 1);
  });
  return tiles;
});

export const blackBoard = columns.map((_, index) => {
  const tiles = columns.map((_, xIndex) => {
    const charFromCode = String.fromCharCode(72 - index - xIndex);
    return charFromCode + (8 - index + 1);
  });
  return tiles;
});
