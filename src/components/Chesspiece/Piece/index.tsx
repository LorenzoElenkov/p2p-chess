import React, { useContext } from 'react';
import { BoardChars, PieceType } from '../../../types/common';
import ChessboardContext from '../../../context/Board';
import useIsClickedPiece from '../../../hooks/useIsClickedPiece';

type PieceProps = {
  type: PieceType | null;
  position: { [k in BoardChars]?: number };
  isEnemy: boolean;
  moveCount: number;
};

const Piece = ({ type, position, isEnemy, moveCount }: PieceProps) => {
  const chessboard = useContext(ChessboardContext);
  const isPieceClicked = useIsClickedPiece({ position, type });
  const color = chessboard.isWhiteBoard
    ? isEnemy
      ? 'black'
      : 'white'
    : isEnemy
    ? 'white'
    : 'black';
  const handleClick = () => {
    if (!isEnemy && type && !isPieceClicked) {
      chessboard.setClickedPiece({ piece: type as PieceType, position, enemy: false, moveCount });
    } else if (chessboard.clickedPiece && !isPieceClicked) {
      chessboard.handlePieceMove(position);
    } else if (chessboard.clickedPiece && isPieceClicked) {
      chessboard.setClickedPiece(null);
    } else if (!type || isEnemy) {
      chessboard.setClickedPiece(null);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`piece ${type} ${color} ${
        isPieceClicked ? 'opacity-50' : 'opacity-100'
      } absolute bg-transparent hover:border-transparent focus:outline-none w-full h-full flex justify-center items-center rounded-none`}
    />
  );
};

export default Piece;
