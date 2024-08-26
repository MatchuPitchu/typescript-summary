import { Coordinates } from '../chessboard';

export const isCoordinates = (token: unknown): token is Coordinates => {
  return Array.isArray(token) && token.length === 2 && token.every((value) => typeof value === 'number');
};
