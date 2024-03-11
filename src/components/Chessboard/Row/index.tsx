import { useContext } from 'react';
import { chess } from '../../../utils/constants';
import { getRowNumberTextColor } from '../../../utils/utils';
import Tile from '../Tile';
import ChessboardContext from '../../../context/Board';

type RowProps = {
  index: number;
  content: string[];
};

const Row = ({ index, content }: RowProps) => {
  const chessboard = useContext(ChessboardContext);
  const rowNumber = chessboard.isWhiteBoard ? chess.rows - index : index + 1;
  const rowNumberColor = getRowNumberTextColor(index + 1);
  return (
    <div className={`h-[calc(100%/8)] gap-2 text-xs relative ${rowNumberColor}`}>
      <span className="absolute top-0 left-[1px] z-50">{rowNumber}</span>
      <div className="flex">
        {content.map((_, tileIndex) => {
          const isWhiteTile =
            (index % 2 === 1 && tileIndex % 2 === 1) || (index % 2 === 0 && tileIndex % 2 === 0);
          return (
            <Tile
              key={tileIndex}
              isWhiteTile={isWhiteTile}
              isLastColumnTile={index === chess.rows - 1}
              tileIndex={tileIndex}
              rowIndex={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Row;
