import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { clsx } from 'clsx';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { type Coordinates, PieceRecord } from './chessboard';
import { canMove } from './utils/can-move';
import { isCoordinates } from './utils/is-coordinates';
import { isEqualCoordinates } from './utils/is-equal-coordinates';
import { isPieceType } from './utils/is-piece-type';

type HoveredState = 'idle' | 'validMove' | 'invalidMove';

const getColor = (hoverState: HoveredState, isDark: boolean) => {
  if (hoverState === 'validMove') {
    return '#008000';
  } else if (hoverState === 'invalidMove') {
    return '#e27bb1';
  }

  return isDark ? '#cccccc' : '#ffffff';
};

type SquareProps = {
  pieces: PieceRecord[];
  location: Coordinates;
  children: ReactNode;
};

export const Square = ({ pieces, location, children }: SquareProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<HoveredState>('idle');

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => ({ location }),
      canDrop: ({ source }) => {
        if (!isCoordinates(source.data.location)) return false;

        // das aktuelle Square der Figur kann nicht als Dropfläche genutzt werden
        return !isEqualCoordinates(source.data.location, location);
      },
      onDragEnter: ({ source }) => {
        // use type guards for type safety
        // source is the piece being dragged over the drop target
        if (!isCoordinates(source.data.location) || !isPieceType(source.data.pieceType)) return;

        if (
          canMove({
            sourceSquare: source.data.location,
            targetSquare: location,
            pieceType: source.data.pieceType,
            pieces,
          })
        ) {
          setHoverState('validMove');
        } else {
          setHoverState('invalidMove');
        }
      },
      onDragLeave: () => setHoverState('idle'),
      onDrop: () => setHoverState('idle'),
    });
  }, [location, pieces]);

  const isDark = (location[0] + location[1]) % 2 === 1;

  return (
    <div ref={ref} className={clsx('square')} style={{ backgroundColor: getColor(hoverState, isDark) }}>
      {children}
    </div>
  );
};
