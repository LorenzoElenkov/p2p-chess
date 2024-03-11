import { useContext } from 'react';
import { blackBoard, chess, whiteBoard } from '../../../utils/constants';
import ChessboardContext from '../../../context/Board';
import Piece from '../../Chesspiece/Piece';

type TileProps = {
  isLastColumnTile: boolean;
  isWhiteTile: boolean;
  tileIndex: number;
  rowIndex: number;
};

const Tile = ({ isLastColumnTile, isWhiteTile, tileIndex, rowIndex }: TileProps) => {
  const chessboard = useContext(ChessboardContext);
  const showMarker = chessboard.legalMoves.find(([r, c]) => r === rowIndex && c === tileIndex);
  const bgColor = isWhiteTile ? 'bg-white' : 'bg-gray-500';
  const textColor = isWhiteTile ? 'text-gray-500' : 'text-white';
  const tileLetter = chessboard.isWhiteBoard
    ? whiteBoard[chess.rows - 1][tileIndex][0]
    : blackBoard[chess.rows - 1][tileIndex][0];
  const tileData = chessboard.positions[rowIndex][tileIndex];
  const position = {
    [chessboard.isWhiteBoard ? chess.columns - rowIndex : rowIndex + 1]: tileData.letter
  };
  return (
    <div className={`select-none w-[10svh] aspect-square ${bgColor} text-black relative`}>
      {isLastColumnTile && (
        <span className={`absolute bottom-0 right-1 ${textColor}`}>{tileLetter}</span>
      )}
      <Piece
        type={tileData.piece}
        position={position}
        isEnemy={tileData.enemy}
        moveCount={tileData.moveCount}
      />
      {showMarker && (
        <div className="absolute pointer-events-none cursor-pointer top-[37.5%] left-[37.5%] w-1/4 aspect-square rounded-full bg-gray-300" />
      )}
    </div>
  );
};

export default Tile;
