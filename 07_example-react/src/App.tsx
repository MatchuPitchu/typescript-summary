import './App.css';
import { TodoExample2 } from './TodoExample2';
import { TodoExample1 } from './TodoExample1';

export const App = () => {
  return (
    <main className='app'>
      <TodoExample1 />
      <TodoExample2 />
    </main>
  );
};
