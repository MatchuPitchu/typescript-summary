import { useEffect, useRef } from 'react';

import { Th } from './th';

import './table.css';

const tableHeaders = ['Column 1', 'Column 2', 'Column 3'];

/**
 * Example Pragmatic Drag and Drop
 * @see https://atlassian.design/components/pragmatic-drag-and-drop/examples/#table
 * @see https://codesandbox.io/p/sandbox/table-3qdsy7?file=%2Fpragmatic-drag-and-drop%2Fdocumentation%2Fexamples%2Fpieces%2Ftable%2Ftable-header.tsx%3A422%2C5-422%2C15&module=%2Fexample.tsx
 *
 * Achtung: Beispiel funktioniert bisher nur oberflächlich und ist nicht fertig durchdacht und umgesetzt
 */
export const Table = () => {
  const tableRef = useRef<HTMLTableElement>(null);

  // Storing the height of the table in a CSS variable.
  // This is used by our header resizer and drop target.
  useEffect(() => {
    if (!tableRef.current) return;
    const height = tableRef.current.getBoundingClientRect().height;
    tableRef.current.style.setProperty('--table-height', `${height}px`);
  }, []); // recompute table height when changes occur that impacts the height

  return (
    <div className="table-container">
      <table ref={tableRef} className="table">
        <thead>
          <tr>
            {tableHeaders.map((label, index) => (
              <Th key={label} index={index} amountOfHeaders={3}>
                {label}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="td">Content 1</td>
            <td className="td">Content 2</td>
            <td className="td">Content 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
