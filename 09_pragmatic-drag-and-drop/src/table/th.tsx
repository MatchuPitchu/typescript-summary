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
      tableWidth: number;
      nextHeaderInitialWidth: number;
      nextHeader: HTMLElement;
      maxWidth: number;
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

const clamp = ({ value, min, max }: { value: number; min: number; max: number }) => {
  return Math.max(min, Math.min(value, max));
};

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
  const [state, setState] = useState<HeaderState>(idleState);
  const thRef = useRef<HTMLTableCellElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const columnType: ColumnType = getColumnType({ index, amountOfHeaders });

  const renderResizeHandle: boolean =
    (state.type === 'idle' || state.type === 'resizing') &&
    (columnType === 'first-of-many' || columnType === 'middle-of-many');

  // Setting up the draggable resize handle
  // How resizing works:
  // 1. change the size of the column header being dragged
  // 2. we change the _next_ column header by the opposite amount
  useEffect(() => {
    if (!renderResizeHandle) return;

    if (!resizerRef.current) return;
    if (!thRef.current) return;

    return draggable({
      element: resizerRef.current,
      getInitialData() {
        return { type: 'column-resize', index };
      },
      onGenerateDragPreview({ nativeSetDragImage }) {
        if (!thRef.current) return;

        disableNativeDragPreview({ nativeSetDragImage });
        preventUnhandled.start();

        const initialWidth = thRef.current.getBoundingClientRect().width;

        const nextHeader = thRef.current.nextElementSibling;
        if (!(nextHeader instanceof HTMLElement)) return;
        const nextHeaderInitialWidth = nextHeader.getBoundingClientRect().width;

        const table = thRef.current.closest('table');
        if (!table) return;
        const tableWidth = table.getBoundingClientRect().width;

        // We cannot let `nextHeader` get smaller than `minColumnWidth`
        const maxWidth = initialWidth + nextHeaderInitialWidth - minColumnWidth;

        setState({
          type: 'resizing',
          initialWidth,
          tableWidth,
          nextHeaderInitialWidth,
          nextHeader,
          maxWidth,
        });
      },
      onDrag({ location }) {
        if (!thRef.current) return;

        const diffX = location.current.input.clientX - location.initial.input.clientX;

        if (state.type !== 'resizing') return;
        const { initialWidth, nextHeaderInitialWidth, nextHeader, maxWidth } = state;

        // Set the width of our header being resized
        const proposedWidth = clamp({
          value: initialWidth + diffX,
          min: minColumnWidth,
          max: maxWidth,
        });
        thRef.current.style.setProperty('--local-resizing-width', `${proposedWidth}px`);
        console.log('P', diffX);
        // How much did the width of the header actually change?
        const actualDiff = proposedWidth - initialWidth;

        // Now we need to make the opposite change to the next header
        //
        // Example: we have two columns A and B
        // If A is resizing to get larger, B needs to get smaller
        nextHeader.style.setProperty('--local-resizing-width', `${nextHeaderInitialWidth - actualDiff}px`);
      },
      onDrop() {
        preventUnhandled.stop();
        setState(idleState);
      },
    });
  }, [renderResizeHandle, index, state]);

  return (
    <th ref={thRef} className={clsx('th', state.type === 'dragging' && 'th--dragging')}>
      {children}
      {renderResizeHandle ? (
        <div ref={resizerRef} className={clsx('resizer', state.type === 'resizing' && 'resizer--resizing')}></div>
      ) : null}
    </th>
  );
};
