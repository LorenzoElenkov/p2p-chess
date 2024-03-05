import { blackBoard, whiteBoard } from '../../../utils/constants';

type Props = {
  isLastColumnTile: boolean;
  isWhiteTile: boolean;
  isWhiteBoard: boolean;
  tileIndex: number;
};

const Tile = ({ isLastColumnTile, isWhiteTile, isWhiteBoard, tileIndex }: Props) => {
  const bgColor = isWhiteTile ? 'bg-white' : 'bg-gray-500';
  const textColor = isWhiteTile ? 'text-gray-500' : 'text-white';
  const tileLetter = isWhiteBoard ? whiteBoard[tileIndex][0][0] : blackBoard[tileIndex][0][0];
  if (isLastColumnTile) {
    return (
      <div className={`select-none w-[10svh] aspect-square ${bgColor} relative`}>
        <span className={`absolute bottom-0 right-1 ${textColor}`}>{tileLetter}</span>
      </div>
    );
  }
  return <span className={`select-none w-[10svh] aspect-square ${bgColor}`} />;
};

export default Tile;
