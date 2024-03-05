import React from 'react';
import { blackBoard, whiteBoard } from '../../utils/constants';
import Row from './Row';
import { PiecesPositions } from '../../types/common';
import { getStartingPiecePositions } from '../../utils/utils';

type ChessboardProps = {
  playerColor: 'WHITE' | 'BLACK';
};

const Chessboard = ({ playerColor }: ChessboardProps) => {
  const board = playerColor === 'WHITE' ? whiteBoard : blackBoard;
  const isWhiteBoard = board[0][0] === 'A8';

  const startingPositions = React.useMemo(() => {
    return getStartingPiecePositions(isWhiteBoard);
    // I do not want to wrap isWhiteBoard also in useMemo - that's why I omit it here
    // eslint-disable-next-line
  }, []);

  const [piecesPositions, setPiecesPositions] = React.useState<PiecesPositions>(startingPositions);
  console.log(piecesPositions);
  return (
    <div className="relative aspect-square h-[80svh] mx-auto mt-[10svh] flex flex-col">
      {board.map((row, rowIndex) => {
        return <Row key={rowIndex} index={rowIndex} content={row} isWhiteBoard={isWhiteBoard} />;
      })}
    </div>
  );
};

export default Chessboard;
