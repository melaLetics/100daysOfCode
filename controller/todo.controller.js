const Todo = require('../models/todo.model');

async function getAllTodos(req, res, next) {
    try{
        const todos = await Todo.getAllTodos();
        res.json({
            todos: todos
        });
    } catch(error){
        return next(error);
    }
}

async function addTodo(req, res, next) {
    const todoText = req.body.text;
    const todo = new Todo(todoText);
    try {
        const result = await todo.save();
        todo.id = result.insertedId.toString();
        res.json({
            message: 'Added todo successfully',
            createdTodo: todo
        });
    } catch(error) {
        return next(error);
    }
}

function updateTodo(req, res, next){}

function deleteTodo(req, res, next){}

module.exports = {
    getAllTodos: getAllTodos, 
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
}