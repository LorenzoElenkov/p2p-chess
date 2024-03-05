import { blackBoard, chess, whiteBoard } from '../../../utils/constants';
import { getStartingPiecePositions } from '../../../utils/utils';

type TileProps = {
  isLastColumnTile: boolean;
  isWhiteTile: boolean;
  isWhiteBoard: boolean;
  tileIndex: number;
  rowIndex: number;
};

const Tile = ({ isLastColumnTile, isWhiteTile, isWhiteBoard, tileIndex, rowIndex }: TileProps) => {
  const bgColor = isWhiteTile ? 'bg-white' : 'bg-gray-500';
  const textColor = isWhiteTile ? 'text-gray-500' : 'text-white';
  const tileLetter = isWhiteBoard
    ? whiteBoard[chess.rows - 1][tileIndex][0]
    : blackBoard[chess.rows - 1][tileIndex][0];
  const startingPositions = getStartingPiecePositions(isWhiteBoard);
  const tileData = startingPositions[rowIndex][tileIndex];
  return (
    <div className={`select-none w-[10svh] aspect-square ${bgColor} text-black relative`}>
      {tileData.piece && <span>{tileData.piece}</span>}
      {isLastColumnTile && (
        <span className={`absolute bottom-0 right-1 ${textColor}`}>{tileLetter}</span>
      )}
    </div>
  );
};

export default Tile;
