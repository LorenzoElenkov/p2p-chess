import { BoardChars, PieceType, Position } from '../types/common';
import { blackBoard, chess, whiteBoard } from './constants';
import { formatPosition } from './formatPosition';

export const getRowNumberTextColor = (n: number) => {
  const isEven = n % 2 === 0;
  return isEven ? 'text-white' : 'text-gray-500';
};

const setPositionData = (
  piece: PieceType | undefined,
  isWhiteBoard: boolean,
  isEnemy?: boolean
) => {
  const getPiece = (index: number, isPawn: boolean) => {
    if (isPawn) return PieceType.PAWN;
    else if (index === 1 || index === chess.columns - 2) return PieceType.KNIGHT;
    else if (index === 2 || index === chess.columns - 3) return PieceType.BISHOP;
    else if (index === 3) {
      if (isWhiteBoard) return PieceType.QUEEN;
      else return PieceType.KING;
    } else if (index === 4) {
      if (isWhiteBoard) return PieceType.KING;
      else return PieceType.QUEEN;
    } else return PieceType.ROOK;
  };

  const board = isWhiteBoard ? whiteBoard : blackBoard;

  return new Array(chess.columns).fill('').map((_, index) => ({
    piece: getPiece(index, piece === PieceType.PAWN),
    letter: board[chess.rows - 1][index][0] as BoardChars,
    enemy: isEnemy || false,
    moveCount: 0
  }));
};

const getStartingPieces = (isWhiteBoard: boolean, isPawnRank?: boolean, isEnemy?: boolean) => {
  return setPositionData(isPawnRank ? PieceType.PAWN : undefined, isWhiteBoard, isEnemy);
};

export const getStartingPiecePositions = (isWhiteBoard: boolean) => {
  const board = isWhiteBoard ? whiteBoard : blackBoard;
  const myPawnRank = getStartingPieces(isWhiteBoard, true);
  const myBackRank = getStartingPieces(isWhiteBoard, false);
  const enemyPawnRank = getStartingPieces(isWhiteBoard, true, true);
  const enemyBackRank = getStartingPieces(isWhiteBoard, false, true);

  const pos = new Array(chess.rows).fill('').map((_, index) => {
    if (index === 6) {
      return myPawnRank;
    } else if (index === 7) {
      return myBackRank;
    } else if (index === 0) {
      return enemyBackRank;
    } else if (index === 1) {
      return enemyPawnRank;
    } else {
      return new Array(chess.columns).fill('').map((_, yIndex) => ({
        piece: null,
        letter: board[0][yIndex][0] as BoardChars,
        enemy: false,
        moveCount: 0
      }));
    }
  });
  return pos;
};

export const getCastleRookPosition = (isWhiteBoard: boolean, isShort: boolean) => {
  const oldRookPosition = {
    piece: null,
    letter: (isWhiteBoard ? (isShort ? 'H' : 'A') : isShort ? 'H' : 'A') as BoardChars,
    enemy: false,
    moveCount: 0
  };
  const newRookPosition = {
    piece: PieceType.ROOK,
    letter: (isWhiteBoard ? (isShort ? 'F' : 'D') : isShort ? 'F' : 'D') as BoardChars,
    enemy: false
  };
  return { oldRookPosition, newRookPosition };
};

export const getIsCastling = (isWhiteBoard: boolean, newPosition: Position) => {
  const [, newC] = formatPosition(newPosition, isWhiteBoard);
  const isShortCastling = isWhiteBoard ? newC === 6 : newC === 1;
  const isLongCastling = isWhiteBoard ? newC === 2 : newC === 5;
  return {
    isCastling: isShortCastling || isLongCastling,
    isShort: isShortCastling
  };
};
