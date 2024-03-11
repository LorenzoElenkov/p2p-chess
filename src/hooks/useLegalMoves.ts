import React from 'react';
import { ClickedPiece, MovesList, PiecesPositions } from '../types/common';
import { getLegalMovesFromPossible, getMovesWithinBoard } from '../utils/possibleMoves';

type Props = {
  isWhiteBoard: boolean;
  piecesPositions: PiecesPositions;
  clickedPiece: ClickedPiece | null;
  moves: MovesList;
};

const useLegalMoves = ({ isWhiteBoard, piecesPositions, clickedPiece, moves }: Props) => {
  const [legalMoves, setLegalMoves] = React.useState<[number, number][]>([]);
  React.useEffect(() => {
    const getLegalMoves = () => {
      const possibleMoves = getMovesWithinBoard(isWhiteBoard, clickedPiece, piecesPositions, moves);
      return getLegalMovesFromPossible(possibleMoves, piecesPositions, clickedPiece?.piece);
    };
    setLegalMoves(getLegalMoves());
  }, [piecesPositions, isWhiteBoard, clickedPiece, moves]);

  return legalMoves;
};

export default useLegalMoves;
