import { ClickedPiece, MovesList, PieceType, PiecesPositions, Position } from '../types/common';
import { chess } from './constants';
import { formatPosition } from './formatPosition';

export const possibleMoves: Record<PieceType, [number, number][] | [number, number][][]> = {
  [PieceType.PAWN]: [
    [
      [-1, 0],
      [-2, 0]
    ],
    [[-1, -1]],
    [[-1, 1]]
  ],
  [PieceType.ROOK]: new Array(28).fill([]).map((_, index) => {
    if (index < 7) {
      return [index + 1, 0];
    } else if (index < 14) {
      return [0, (index % 7) + 1];
    } else if (index < 21) {
      return [-(index % 7) - 1, 0];
    } else {
      return [0, -(index % 7) - 1];
    }
  }),
  [PieceType.BISHOP]: new Array(28).fill([]).map((_, index) => {
    if (index < 7) {
      return [index + 1, index + 1];
    } else if (index < 14) {
      return [-(index % 7) - 1, -(index % 7) - 1];
    } else if (index < 21) {
      return [(index % 7) + 1, -(index % 7) - 1];
    } else {
      return [-(index % 7) - 1, (index % 7) + 1];
    }
  }),
  [PieceType.KNIGHT]: [
    [[1, -2]],
    [[2, -1]],
    [[2, 1]],
    [[1, 2]],
    [[-1, -2]],
    [[-2, -1]],
    [[-2, 1]],
    [[-1, 2]]
  ],
  [PieceType.QUEEN]: new Array(56).fill([]).map((_, index) => {
    if (index < 7) {
      return [index + 1, 0];
    } else if (index < 14) {
      return [0, (index % 7) + 1];
    } else if (index < 21) {
      return [-(index % 7) - 1, 0];
    } else if (index < 28) {
      return [0, -(index % 7) - 1];
    } else if (index < 35) {
      return [(index % 7) + 1, (index % 7) + 1];
    } else if (index < 42) {
      return [-(index % 7) - 1, -(index % 7) - 1];
    } else if (index < 49) {
      return [(index % 7) + 1, -(index % 7) - 1];
    } else {
      return [-(index % 7) - 1, (index % 7) + 1];
    }
  }),
  [PieceType.KING]: [
    [[-1, -1]],
    [[-1, 0]],
    [[-1, 1]],
    [[0, 1]],
    [[1, 1]],
    [[1, 0]],
    [[1, -1]],
    [[0, -1]],
    [[0, -2]],
    [[0, 2]]
  ]
};

export const getMovesWithinBoard = (
  isWhiteBoard: boolean,
  clickedPiece: ClickedPiece | null,
  piecesPositions: PiecesPositions,
  moves: MovesList
) => {
  if (!clickedPiece?.piece || !clickedPiece.position) return [];
  const [row, column] = formatPosition(clickedPiece.position, isWhiteBoard);
  const _possibleMoves = getPossibleMoves(clickedPiece.piece);
  return _possibleMoves
    .map(
      innerArray =>
        innerArray
          .map(([r, c]) => {
            const newRow = r + row;
            const newColumn = c + column;
            const isMoveLegal = checkForSpecialMoves(
              r,
              c,
              newRow,
              newColumn,
              clickedPiece,
              piecesPositions,
              moves,
              isWhiteBoard
            );
            const isWithinBoard =
              newRow < chess.rows && newRow >= 0 && newColumn < chess.columns && newColumn >= 0;

            if (isWithinBoard && isMoveLegal) {
              return [newRow, newColumn];
            } else {
              return null;
            }
          })
          .filter(x => x) as [number, number][]
    )
    .filter(x => x.length) as [number, number][][];
};

export const getPossibleMoves = (type: PieceType) => {
  const _possibleMoves = possibleMoves[type];
  const setNestedMoves = (originalArray: [number, number][]): [number, number][][] => {
    return new Array(Math.ceil(originalArray.length / 7))
      .fill('')
      .map((_, index) => originalArray.slice(index * 7, (index + 1) * 7));
  };
  return type === PieceType.BISHOP || type === PieceType.QUEEN || type === PieceType.ROOK
    ? setNestedMoves(_possibleMoves as [number, number][])
    : (_possibleMoves as [number, number][][]);
};

export const getLegalMovesFromPossible = (
  possibleMoves: [number, number][][],
  piecesPositions: PiecesPositions,
  type?: PieceType
) => {
  const getTileMetadata = (r: number, c: number) => {
    const isEnemyThere = piecesPositions[r][c].enemy;
    const isPieceThere = piecesPositions[r][c].piece;
    return { isEnemyThere, isPieceThere, getShouldBreak: () => Boolean(isPieceThere) };
  };
  const getLegalMoves = () => {
    return possibleMoves.map(positionsByDirection => {
      let shouldBreak = false;
      return positionsByDirection.map(([r, c]) => {
        if (shouldBreak) return null;
        const { isEnemyThere, isPieceThere, getShouldBreak } = getTileMetadata(r, c);
        shouldBreak = getShouldBreak();
        if (isEnemyThere || (!isPieceThere && !isEnemyThere)) {
          return [r, c];
        }
        return null;
      });
    });
  };
  return type
    ? (getLegalMoves()
        .flat()
        .filter(x => x) as [number, number][])
    : [];
};

const checkForSpecialMoves = (
  r: number,
  c: number,
  newR: number,
  newC: number,
  clickedPiece: ClickedPiece,
  piecesPositions: PiecesPositions,
  moves: MovesList,
  isWhiteBoard: boolean
) => {
  const getShortOrLongCastleValid = (isShort: boolean) => {
    const getRookTile = (isShort: boolean) => (isShort ? 7 : 0);
    const defaultRookPosition =
      piecesPositions[7][isWhiteBoard ? getRookTile(isShort) : getRookTile(!isShort)];
    const isRook = defaultRookPosition.piece === PieceType.ROOK;
    const hasRookMoved = defaultRookPosition.moveCount != 0;
    const hasKingMoved = clickedPiece.moveCount != 0;
    const isKingInStartingPosition =
      piecesPositions[7][isWhiteBoard ? 4 : 3].piece === PieceType.KING;
    return isRook && !hasRookMoved && !hasKingMoved && isKingInStartingPosition;
  };
  const specialMoves = {
    DOUBLE_MOVE_PAWN: () => {
      const isFirstMove = clickedPiece.moveCount === 0;
      return isFirstMove;
    },
    PAWN_TAKE_LEFT: () => {
      const isLeftEnemy = piecesPositions[newR][newC]?.enemy;
      return isLeftEnemy;
      // en-passant - need moves array
    },
    PAWN_TAKE_RIGHT: () => {
      const isRightEnemy = piecesPositions[newR][newC]?.enemy;
      return isRightEnemy;
      // en-passant - need moves array
    },
    PAWN_MOVE_FORWARD: () => {
      const isForwardEnemy = piecesPositions[newR][newC].enemy;
      return !isForwardEnemy;
    },
    SHORT_CASTLE: () => {
      return getShortOrLongCastleValid(true);
    },
    LONG_CASTLE: () => {
      return getShortOrLongCastleValid(false);
    },
    DEFAULT: () => true
  };
  const getTypeToMove: Record<PieceType, () => keyof typeof specialMoves> = {
    [PieceType.PAWN]: () => {
      if (r === -2 && c === 0) return 'DOUBLE_MOVE_PAWN';
      else if (r === -1 && c === -1) return 'PAWN_TAKE_LEFT';
      else if (r === -1 && c === 1) return 'PAWN_TAKE_RIGHT';
      else if (r === -1 && c === 0) return 'PAWN_MOVE_FORWARD';
      else return 'DEFAULT';
    },
    [PieceType.KING]: () => {
      if (r === 0 && c === 2) {
        return 'SHORT_CASTLE';
      } else if (r === 0 && c === -2) {
        return 'LONG_CASTLE';
      } else return 'DEFAULT';
    },
    [PieceType.QUEEN]: () => 'DEFAULT',
    [PieceType.BISHOP]: () => 'DEFAULT',
    [PieceType.KNIGHT]: () => 'DEFAULT',
    [PieceType.ROOK]: () => 'DEFAULT'
  };
  const typeToMove = getTypeToMove[clickedPiece.piece]();
  return specialMoves[typeToMove]();
};