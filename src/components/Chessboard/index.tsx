import React from 'react';
import { blackBoard, whiteBoard } from '../../utils/constants';
import Row from './Row';
import { ClickedPiece, MovesList, PieceType, PiecesPositions, Position } from '../../types/common';
import { getCastleRookPosition, getIsCastling, getStartingPiecePositions } from '../../utils/utils';
import ChessboardContext from '../../context/Board';
import { formatPosition } from '../../utils/formatPosition';
import useLegalMoves from '../../hooks/useLegalMoves';
import { checkForValidMove } from '../../utils/checkForValidMove';

type ChessboardProps = {
  playerColor: 'WHITE' | 'BLACK';
};

const Chessboard = ({ playerColor }: ChessboardProps) => {
  const board = playerColor === 'WHITE' ? whiteBoard : blackBoard;
  const isWhiteBoard = board[0][0] === 'A8';

  const startingPositions = React.useMemo(() => {
    return getStartingPiecePositions(isWhiteBoard);
    // I do not want to wrap isWhiteBoard also in useMemo
    // that's why I omit it in dep array
    // eslint-disable-next-line
  }, []);

  const [piecesPositions, setPiecesPositions] = React.useState<PiecesPositions>(startingPositions);
  const [moves, setMoves] = React.useState<MovesList>([]);
  const [clickedPiece, setClickedPiece] = React.useState<ClickedPiece | null>(null);
  const legalMoves = useLegalMoves({ isWhiteBoard, clickedPiece, piecesPositions, moves });

  const handlePieceMove = (newPosition: Position) => {
    if (!clickedPiece) return;
    const [newRow, newColumn] = formatPosition(newPosition, isWhiteBoard);
    const [oldRow, oldColumn] = formatPosition(clickedPiece.position, isWhiteBoard);
    const isValidMove = checkForValidMove({ newPosition: [newRow, newColumn], legalMoves });
    if (isValidMove) {
      setPiecesPositions(prevState => {
        const newPositions = prevState.map(row =>
          row.map(cell => ({ ...cell }))
        ) as PiecesPositions;
        const newPositionLetter = Object.values(newPosition)[0];
        newPositions[newRow][newColumn] = {
          ...prevState[oldRow][oldColumn],
          letter: newPositionLetter,
          moveCount: clickedPiece.moveCount + 1
        };
        const _letter = Object.values(clickedPiece.position)[0];
        newPositions[oldRow][oldColumn] = {
          piece: null,
          letter: _letter,
          enemy: false,
          moveCount: 0
        };
        if (clickedPiece.piece === PieceType.KING && clickedPiece.moveCount === 0) {
          const { isCastling, isShort } = getIsCastling(isWhiteBoard, newPosition);
          if (isCastling) {
            const { oldRookPosition, newRookPosition } = getCastleRookPosition(
              isWhiteBoard,
              isShort
            );
            const theRookMoveCount =
              newPositions[7][isWhiteBoard ? (isShort ? 7 : 0) : isShort ? 0 : 7].moveCount;
            newPositions[7][isWhiteBoard ? (isShort ? 7 : 0) : isShort ? 0 : 7] = oldRookPosition;
            newPositions[7][isWhiteBoard ? (isShort ? 5 : 3) : isShort ? 3 : 5] = {
              ...newRookPosition,
              moveCount: theRookMoveCount + 1
            };
          }
        }
        return newPositions;
      });
    }
    handleClickedPiece(null);
  };

  const handleClickedPiece = (piece: ClickedPiece | null) => {
    setClickedPiece(() => {
      if (!piece) return null;
      else return piece;
    });
  };
  return (
    <ChessboardContext.Provider
      value={{
        positions: piecesPositions,
        handlePieceMove,
        moves,
        legalMoves,
        clickedPiece,
        setClickedPiece: handleClickedPiece,
        isWhiteBoard
      }}
    >
      <div className="relative aspect-square h-[80svh] mx-auto mt-[10svh] flex flex-col">
        {board.map((row, rowIndex) => {
          return <Row key={rowIndex} index={rowIndex} content={row} />;
        })}
      </div>
    </ChessboardContext.Provider>
  );
};

export default Chessboard;
