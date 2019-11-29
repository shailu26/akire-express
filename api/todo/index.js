const Router = require('express');
const todoController = require('./todo.controller');
const utils = require('../../helpers/utils');
const router = Router();

router
    .post('/createTodo', utils.validateToken, todoController.createTodo)
    .get('/getLoggedinUserTodo', utils.getLoggedinUserDetails, todoController.getLoggedinUserTodo)
    .get('/getTodoById/:todoId', utils.validateToken, utils.getLoggedinUserDetails, todoController.getTodoById)
    .patch('/updateTodoById/:todoId', utils.validateToken, todoController.updateTodoById)
    .delete('/deleteByTodoId/:todoId', utils.validateToken, todoController.deleteByTodoId);

module.exports = router;