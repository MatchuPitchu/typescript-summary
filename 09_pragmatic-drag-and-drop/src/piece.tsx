import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { clsx } from 'clsx';
import { CSSProperties, useEffect, useRef, useState } from 'react';

import { Coordinates, PieceType } from './chessboard';

type PieceProps = {
  location: Coordinates;
  pieceType: PieceType;
  image: string;
  alt: string;
};

export const Piece = ({ location, pieceType, image, alt }: PieceProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // making the pieces draggable
    return draggable({
      element: ref.current,
      /**
       * Color the square green when a piece is eligible to be dropped onto and red when it is not
       * To achieve this we first use the getInitialData argument on draggable to surface the piece type and starting location of the dragging piece.
       */
      getInitialData: () => ({ location, pieceType }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType]);

  const style: CSSProperties = dragging
    ? {
        opacity: 0.4,
      }
    : {};

  return (
    <img
      ref={ref}
      className={clsx('image')}
      style={style}
      src={image}
      alt={alt}
      draggable="false" // draggable set to false to prevent dragging of the images
    />
  );
};
