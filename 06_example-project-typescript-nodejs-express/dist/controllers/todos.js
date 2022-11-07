"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo"); // import class model + type (-> because every class acts also as a type)
// for practice purposes, NO database behind, so const TODOS is reseted with each server reload
const TODOS = [];
// use RequestHandler instead of declaring always every parameter type
const createTodo = (req, res, next) => {
    const text = req.body.text; // use type casting if I know specific type but TS doesn't'
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Todo created', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
// RequestHandler is a generic type; add angle brackets and tell TS which parameters I'll have
const updateTodo = (req, res, next) => {
    const { id: todoId } = req.params; // use destructuring and name id key 'todoId'
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1)
        throw new Error('No todo found');
    // update Todo
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const { id: todoId } = req.params; // use destructuring and name id key 'todoId'
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1)
        throw new Error('No todo found');
    // remove todo on found index
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted' });
};
exports.deleteTodo = deleteTodo;
