import { createContext } from 'react';
import { ClickedPiece, MovesList, PiecesPositions, Position } from '../../types/common';

type ChessboardContextType = {
  positions: PiecesPositions;
  handlePieceMove: (newPosition: Position) => void;
  moves: MovesList;
  legalMoves: [number, number][];
  clickedPiece: ClickedPiece | null;
  setClickedPiece: (piece: ClickedPiece | null) => void;
  isWhiteBoard: boolean;
};

const initialState = {
  positions: [],
  handlePieceMove: () => {},
  moves: [],
  legalMoves: [],
  clickedPiece: null,
  setClickedPiece: () => {},
  isWhiteBoard: true
};

const ChessboardContext = createContext<ChessboardContextType>(initialState);

export default ChessboardContext;
