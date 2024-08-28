import { Coordinates, PieceRecord, PieceType } from '../chessboard/chessboard';
import { isEqualCoordinates } from './is-equal-coordinates';

type CanMoveOptions = {
  sourceSquare: Coordinates;
  targetSquare: Coordinates;
  pieceType: PieceType;
  pieces: PieceRecord[];
};

export const canMove = ({ sourceSquare, targetSquare, pieceType, pieces }: CanMoveOptions) => {
  const rowDistance = Math.abs(sourceSquare[0] - targetSquare[0]);
  const colDistance = Math.abs(sourceSquare[1] - targetSquare[1]);

  if (pieces.find((piece) => isEqualCoordinates(piece.location, targetSquare))) {
    return false;
  }

  switch (pieceType) {
    case 'king':
      return [0, 1].includes(rowDistance) && [0, 1].includes(colDistance);
    case 'pawn':
      return colDistance === 0 && sourceSquare[0] - targetSquare[0] === -1;
    default:
      return false;
  }
};
