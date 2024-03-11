import { Position } from "../types/common";
import { chess } from "./constants";

export const formatPosition = (position?: Position, isWhiteBoard?: boolean): [number, number] => {
  if (!position) return [-1, -1];
  const positionEntries = Object.entries(position);
  const columnCharCode = positionEntries[0][1].charCodeAt(0);
  const column = isWhiteBoard ? chess.columns - (73 - columnCharCode) : 72 - columnCharCode;
  const row = isWhiteBoard
    ? chess.rows - parseInt(positionEntries[0][0])
    : parseInt(positionEntries[0][0]) - 1;
  return [row, column];
}