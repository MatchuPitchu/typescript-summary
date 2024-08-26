import { PieceType } from '../chessboard';

export const isPieceType = (value: unknown): value is PieceType => {
  const pieceTypes: PieceType[] = ['king', 'pawn'];
  return typeof value === 'string' && pieceTypes.includes(value as PieceType);
};
