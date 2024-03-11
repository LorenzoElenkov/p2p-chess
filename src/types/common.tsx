export enum PieceType {
  PAWN = 'pawn',
  ROOK = 'rook',
  BISHOP = 'bishop',
  KNIGHT = 'knight',
  QUEEN = 'queen',
  KING = 'king'
}

export type Position = { [k: number]: BoardChars };

export type PiecesPositions2 = {
  [k: number]: { piece: PieceType | null; letter: BoardChars; enemy: boolean }[];
};

export type PiecesPositions = (
  | { piece: PieceType; letter: BoardChars; enemy: boolean, moveCount: number }[]
  | { piece: null; letter: BoardChars; enemy: boolean, moveCount: number }[]
)[];

export type ClickedPiece = {
  piece: PieceType;
  position: Position;
  enemy: boolean;
  moveCount: number;
};

export type BoardChars = `${'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'}`;

export type Move = {
  piece: PieceType;
  from: Position;
  to: Position;
  captured: PieceType;
}

export type MovesList = ([Move, Move | null] | [])[];