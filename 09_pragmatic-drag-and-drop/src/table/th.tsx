import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview';
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import { clsx } from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';

type Edge = 'bottom' | 'left' | 'right' | 'top';

type HeaderState =
  | {
      type: 'idle';
    }
  | {
      type: 'preview';
      container: HTMLElement;
    }
  | {
      type: 'dragging';
    }
  | {
      type: 'drop-target';
      closestEdge: Edge | null;
    }
  | {
      type: 'resizing';
      initialWidth: number;
    };

/**
 * These two state types have no associated information, so we can create stable
 * references for both types.
 *
 * By using these stable references, we can avoid unnecessary rerenders which
 * may occur if we try to enter the state when we are already in it.
 *
 * To visualize this, consider:
 * ```ts
 * setState({ type: ‘dragging’ });
 * // This second call will trigger a rerender because it is a new object
 * setState({ type: ‘dragging’ });
 *
 * // in comparison to
 *
 * setState(draggingState);
 * // This second call will NOT trigger a rerender, it is the same object
 * setState(draggingState);
 * ```
 */
const idleState: HeaderState = { type: 'idle' };
const draggingState: HeaderState = { type: 'dragging' };

/**
 * The smallest width a column can be resized to
 */
const minColumnWidth = 50;

type ColumnType = 'first-of-many' | 'middle-of-many' | 'last-of-many' | 'only-column';

const getColumnType = ({ index, amountOfHeaders }: { index: number; amountOfHeaders: number }): ColumnType => {
  if (amountOfHeaders === 1) return 'only-column';
  if (index === 0) return 'first-of-many';
  if (index === amountOfHeaders - 1) return 'last-of-many';
  return 'middle-of-many';
};

type ThProps = {
  index: number;
  amountOfHeaders: number;
  children: ReactNode;
};

export const Th = ({ index, amountOfHeaders, children }: ThProps) => {
  const [headerState, setHeaderState] = useState<HeaderState>(idleState);
  const [width, setWidth] = useState<number | null>(null);

  const thRef = useRef<HTMLTableCellElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const columnType: ColumnType = getColumnType({ index, amountOfHeaders });

  const isResizeHandleEnabled =
    (headerState.type === 'idle' || headerState.type === 'resizing') &&
    (columnType === 'first-of-many' || columnType === 'middle-of-many' || columnType === 'last-of-many');

  // Setting up the draggable resize handle
  // How resizing works:
  // 1. change the size of the column header being dragged
  // 2. we change the _next_ column header by the opposite amount
  useEffect(() => {
    if (!isResizeHandleEnabled) return;
    if (!resizerRef.current) return;
    if (!thRef.current) return;

    return draggable({
      element: resizerRef.current,
      getInitialData: () => {
        return { type: 'column-resize', index };
      },
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        if (!thRef.current) return;

        // Deaktiviere natives Drag-Preview, ist unpassend bei Resizing.
        disableNativeDragPreview({ nativeSetDragImage });
        /**
         * Erlaube Drop-Operation, auch wenn kein Drop Target das Drag-Element akzeptiert.
         * Bei Resizing brauche ich kein Drop Target.
         * @see https://atlassian.design/components/pragmatic-drag-and-drop/core-package/utilities/#preventunhandled
         */
        preventUnhandled.start();

        const initialWidth = thRef.current.getBoundingClientRect().width;

        setHeaderState({
          type: 'resizing',
          initialWidth,
        });
      },
      onDrag: ({ location }) => {
        if (!thRef.current) return;
        if (!resizerRef.current) return;
        if (headerState.type !== 'resizing') return;
        console.log('L', location.current.input.clientX, location.current.dropTargets);
        // Set the new width of the resized th
        const deltaX = location.current.input.clientX - location.initial.input.clientX;
        const newWidth = Math.max(minColumnWidth, headerState.initialWidth + deltaX);

        // mit CSS Variable funktioniert nicht, dass th immer weiter wachsen kann und table container overflowed wird
        // thRef.current.style.setProperty('--local-resizing-width', `${newWidth}px`);
        setWidth(newWidth);
      },
      onDrop: () => {
        preventUnhandled.stop();
        setHeaderState(idleState);
      },
    });
  }, [isResizeHandleEnabled, index, headerState]);

  return (
    <th
      ref={thRef}
      className={clsx('th', headerState.type === 'dragging' && 'th--dragging')}
      style={width ? { width } : {}}
    >
      {children}
      {isResizeHandleEnabled ? (
        <div ref={resizerRef} className={clsx('resizer', headerState.type === 'resizing' && 'resizer--resizing')}></div>
      ) : null}
    </th>
  );
};
