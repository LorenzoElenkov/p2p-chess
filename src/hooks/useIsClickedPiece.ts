import { useContext, useMemo } from 'react';
import ChessboardContext from '../context/Board';
import { PieceType, Position } from '../types/common';

type Props = {
  position: Position;
  type: PieceType | null;
};

const useIsClickedPiece = ({ position, type }: Props) => {
  const chessboard = useContext(ChessboardContext);

  const isThisClickedPiece = useMemo(() => {
    if (!chessboard.clickedPiece) return false;
    const thisPiecePos = Object.entries(position)[0];
    const clickedPiecePos = Object.entries(chessboard.clickedPiece.position)[0];
    const isSameType = chessboard.clickedPiece.piece === type;
    const isSamePosition =
      thisPiecePos[0] === clickedPiecePos[0] && thisPiecePos[1] === clickedPiecePos[1];
    return isSamePosition && isSameType;
  }, [chessboard.clickedPiece, position, type]);

  return isThisClickedPiece;
};

export default useIsClickedPiece;
