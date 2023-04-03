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

async function updateTodo(req, res, next){
    const todoId = req.params.id;
    const newTodoText = req.body.newText;

    const todo = new Todo(newText, todoId);
    try {
       await todo.save()
       res.json({
            message: "Todo update",
            updatedTodo: todo
       });
    } catch(error) {
        next(error);
    }
}

async function deleteTodo(req, res, next){
    const todoId = req.params.id;

    const todo = new Todo(null, todoId);
    try {
       await todo.delete()
       res.json({
            message: "Todo deleted"
       });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getAllTodos: getAllTodos, 
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
}
