import { chess } from '../../../utils/constants';
import { getRowNumberTextColor } from '../../../utils/utils';
import Tile from '../Tile';

type Props = {
  index: number;
  isWhiteBoard: boolean;
  content: string[];
};

const Row = ({ index, content, isWhiteBoard }: Props) => {
  const rowNumber = isWhiteBoard ? 8 - index : index + 1;
  const rowNumberColor = getRowNumberTextColor(isWhiteBoard, index);
  const factor = isWhiteBoard ? 0 : 1;
  return (
    <div className={`h-[calc(100%/8)] gap-2 text-xs relative ${rowNumberColor}`}>
      <span className="absolute top-0 left-[1px] z-50">{rowNumber}</span>
      <div className="flex">
        {content.map((_, tileIndex) => {
          const isWhiteTile =
            (index % 2 === 1 && tileIndex % 2 === 1 - factor) ||
            (index % 2 === 0 && tileIndex % 2 === 0 + factor);
          return (
            <Tile
              isWhiteTile={isWhiteTile}
              isLastColumnTile={index === chess.rows - 1}
              isWhiteBoard={isWhiteBoard}
              tileIndex={tileIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Row;
