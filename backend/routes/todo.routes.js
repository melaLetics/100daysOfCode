const express = require('express');

const controller = require('../controller/todo.controller');

const router = express.Router();

router.get('/', controller.getAllTodos);

router.post('/', controller.addTodo);

router.patch('/:id', controller.updateTodo);

router.delete('/:id', controller.deleteTodo);

module.exports = router;
