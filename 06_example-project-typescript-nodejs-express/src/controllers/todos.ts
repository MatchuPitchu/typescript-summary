import { RequestHandler } from 'express'; // import type
import { Todo } from '../models/todo'; // import class model + type (-> because every class acts also as a type)

// for practice purposes, NO database behind, so const TODOS is reseted with each server reload
const TODOS: Todo[] = [];

// use RequestHandler instead of declaring always every parameter type
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text; // use type casting if I know specific type but TS doesn't'
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.status(201).json({message: 'Todo created', createdTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({todos: TODOS})
}

// RequestHandler is a generic type; add angle brackets and tell TS which parameters I'll have
export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const { id: todoId } = req.params // use destructuring and name id key 'todoId'
  const updatedText = (req.body as {text: string}).text;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
  if(todoIndex === -1) throw new Error('No todo found');
  // update Todo
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.json({ message: 'Updated', updatedTodo: TODOS[todoIndex] });
}

export const deleteTodo: RequestHandler = (req, res, next) => {
  const { id: todoId } = req.params // use destructuring and name id key 'todoId'
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
  if(todoIndex === -1) throw new Error('No todo found');
  // remove todo on found index
  TODOS.splice(todoIndex, 1);
  res.json({ message: 'Todo deleted' })
}