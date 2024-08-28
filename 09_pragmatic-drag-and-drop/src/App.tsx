import { Chessboard } from './chessboard/chessboard';
import { Table } from './table/table';

import './App.css';

export const App = () => {
  return (
    <main className="app">
      <Table />
      <Chessboard />
    </main>
  );
};
