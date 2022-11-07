import { Router } from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

// any post request targeting /todos/ reaches createTodo fn (-> only point at fn, NOT execute it via ())
router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;