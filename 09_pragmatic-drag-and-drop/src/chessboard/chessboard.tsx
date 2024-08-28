import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { clsx } from 'clsx';
import { type ReactElement, useEffect, useState } from 'react';

import king from '../icons/king.png';
import pawn from '../icons/pawn.png';
import { canMove } from '../utils/can-move';
import { isCoordinates } from '../utils/is-coordinates';
import { isEqualCoordinates } from '../utils/is-equal-coordinates';
import { isPieceType } from '../utils/is-piece-type';
import { Piece } from './piece';
import { Square } from './square';

import './chessboard.css';

export type Coordinates = [number, number];

export type PieceType = 'king' | 'pawn';

export type PieceRecord = {
  type: PieceType;
  location: Coordinates;
};

const pieceLookup: Record<PieceType, (location: Coordinates) => ReactElement> = {
  king: (location) => <Piece location={location} pieceType="king" image={king} alt="King" />,
  pawn: (location) => <Piece location={location} pieceType="pawn" image={pawn} alt="Pawn" />,
};

const renderSquares = (pieces: PieceRecord[]) => {
  const squares = Array.from({ length: 8 }, (_, row) => {
    return Array.from({ length: 8 }, (_, col) => {
      const squareCoordinates: Coordinates = [row, col];
      const piece = pieces.find((piece) => isEqualCoordinates(piece.location, squareCoordinates));

      return (
        <Square key={`${row}-${col}`} pieces={pieces} location={squareCoordinates}>
          {piece ? pieceLookup[piece.type](squareCoordinates) : null}
        </Square>
      );
    });
  }).flat();

  return squares;
};

export const Chessboard = () => {
  const [pieces, setPieces] = useState<PieceRecord[]>(() => [
    { type: 'king', location: [3, 2] },
    { type: 'pawn', location: [1, 6] },
  ]);

  useEffect(() => {
    /**
     * Monitors allow you to observe drag and drop interactions from anywhere in your codebase.
     * This allows them to receive draggable and drop target data and perform operations without
     * needing state to be passed from components.
     *
     * Therefore we can place a monitor within a useEffect at the top level of our chessboard and
     * listen for when pieces are dropped into squares.
     */
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        // if dropped outside of any drop targets
        if (!destination) return;

        const targetSquare = destination.data.location;
        const sourceSquare = source.data.location;
        const pieceType = source.data.pieceType;

        if (!isCoordinates(targetSquare) || !isCoordinates(sourceSquare) || !isPieceType(pieceType)) {
          return;
        }

        const pieceToMove = pieces.find((p) => isEqualCoordinates(p.location, sourceSquare));
        const restOfPieces = pieces.filter((p) => p !== pieceToMove);

        if (!pieceToMove) return;

        if (
          canMove({
            sourceSquare,
            targetSquare,
            pieceType,
            pieces,
          })
        ) {
          // moving the piece
          setPieces([{ type: pieceToMove.type, location: targetSquare }, ...restOfPieces]);
        }
      },
    });
  }, [pieces]);

  return <div className={clsx('chessboard')}>{renderSquares(pieces)}</div>;
};
