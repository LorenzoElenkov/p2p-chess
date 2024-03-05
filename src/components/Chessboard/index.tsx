import { blackBoard, whiteBoard } from '../../utils/constants';
import Row from './Row';

type ChessboardProps = {
  playerColor: 'WHITE' | 'BLACK';
};
const Chessboard = ({ playerColor }: ChessboardProps) => {
  const board = playerColor === 'WHITE' ? whiteBoard : blackBoard;
  return (
    <div className="chessboard aspect-square h-[80svh] mx-auto mt-[10svh] flex flex-col">
      {board.map((row, rowIndex, board) => {
        const isWhiteBoard = board[0][0] === 'A1';
        return <Row index={rowIndex} content={row} isWhiteBoard={isWhiteBoard} />;
      })}
    </div>
  );
};

export default Chessboard;
