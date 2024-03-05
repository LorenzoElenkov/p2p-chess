import { PieceType } from '../types/common';
import { blackBoard, chess, whiteBoard } from './constants';

export const getRowNumberTextColor = (n: number) => {
  const isEven = n % 2 === 0;
  return isEven ? 'text-white' : 'text-gray-500';
};

const getStartingPawnPieces = (isWhiteBoard: boolean) => {
  return new Array(chess.columns).fill('').map((_, index) => ({
    piece: PieceType.PAWN,
    letter: isWhiteBoard
      ? whiteBoard[chess.rows - 1][index][0]
      : blackBoard[chess.rows - 1][index][0]
  }));
};

const getStartingBackRankPieces = (isWhiteBoard: boolean) => {
  const getPiece = (index: number) => {
    if (index === 1 || index === chess.columns - 2) return PieceType.KNIGHT;
    else if (index === 2 || index === chess.columns - 3) return PieceType.BISHOP;
    else if (index === 3) {
      if (isWhiteBoard) return PieceType.QUEEN;
      else return PieceType.KING;
    } else if (index === 4) {
      if (isWhiteBoard) return PieceType.KING;
      else return PieceType.QUEEN;
    } else return PieceType.ROOK;
  };

  return new Array(chess.columns).fill('').map((_, index) => ({
    piece: getPiece(index),
    letter: isWhiteBoard
      ? whiteBoard[chess.rows - 1][index][0]
      : blackBoard[chess.rows - 1][index][0]
  }));
};

export const getStartingPiecePositions = (isWhiteBoard: boolean) => {
  const board = isWhiteBoard ? whiteBoard : blackBoard;
  const myPawnRank = getStartingPawnPieces(isWhiteBoard);
  const myBackRank = getStartingBackRankPieces(isWhiteBoard);

  const pos = new Array(chess.rows).fill('').map((_, index) => {
    if (index === 6 || index === 1) {
      return myPawnRank;
    } else if (index === 7 || index === 0) {
      return myBackRank;
    } else {
      return new Array(chess.columns)
        .fill('')
        .map((_, yIndex) => ({ piece: null, letter: board[0][yIndex][0] }));
    }
  });
  return pos;
};
