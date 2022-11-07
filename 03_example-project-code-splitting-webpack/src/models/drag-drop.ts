// Drag and Drop Interfaces

// apply Draggable below for ProjectItem class, because these items should be draggable
export interface Draggable {
  // DragEvent is built-in method of TS
  dragStartHandler(e: DragEvent): void;
  dragEndHandler(e: DragEvent): void;
}

// DragTarget is for targets of a draggable items
export interface DragTarget {
  // permit the drop: signal the browser that the thing a user is dragging something over is a valid drag target
  dragOverHandler(e: DragEvent): void;
  // handle the drop: react to the actual drop, e.g. update date
  dropHandler(e: DragEvent): void;
  // giving visual feedback to user e.g. in case of canceling the drop action somewhere or leaving the area for a drop
  dragLeaveHandler(e: DragEvent): void;
}