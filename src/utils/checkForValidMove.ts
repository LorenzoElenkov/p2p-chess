type Props = {
  newPosition: number[];
  legalMoves: number[][];
};

export const checkForValidMove = ({ newPosition, legalMoves }: Props) => {
  const [newRow, newColumn] = newPosition;
  const validMove = legalMoves.find(([r, c]) => r === newRow && c === newColumn);
  return Boolean(validMove);
};
