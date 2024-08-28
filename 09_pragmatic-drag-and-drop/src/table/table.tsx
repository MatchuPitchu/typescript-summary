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
  return (
    <table className="table">
      <thead>
        {tableHeaders.map((label, index) => (
          <Th key={label} index={index} amountOfHeaders={3}>
            Column 1
          </Th>
        ))}
      </thead>
      <tbody>
        <tr>
          <td>Content 1</td>
          <td>Content 2</td>
        </tr>
      </tbody>
    </table>
  );
};
