import { Coordinates } from '../chessboard';

export const isEqualCoordinates = (positionA: Coordinates, positionB: Coordinates) => {
  return positionA[0] === positionB[0] && positionA[1] === positionB[1];
};
