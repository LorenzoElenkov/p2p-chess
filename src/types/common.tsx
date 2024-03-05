export enum PieceType {
  PAWN = 'pawn',
  ROOK = 'rook',
  BISHOP = 'bishop',
  KNIGHT = 'knight',
  QUEEN = 'queen',
  KING = 'king'
}

export type PiecesPositions = {
  [k: number]: { piece: PieceType | null; letter: string }[];
};
