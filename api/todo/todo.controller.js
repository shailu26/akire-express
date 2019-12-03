const todoDataServiceProvider = require("../../services/sql/todoDataServiceProvider");

module.exports = {
    'getLoggedinUserTodo': function(req, res) {
        const sql = req.app.get('sql');
        let userId = req.decoded.id;
        todoDataServiceProvider.getTodoList(sql, userId).then(todoList => {
                res.status(201).json({
                success: true,
                message: 'successfully fetched',
                todoList
            });
            
        }).catch(err => {
            console.log(err);
            res.status(500).json({err});
        })
    },

    'getTodoById': function(req,res) {
        const sql = req.app.get('sql');
        let todoId = req.params.todoId;
        let userId = req.decoded.id;
        todoDataServiceProvider.getTodoById(sql, todoId, userId).then(todo => {
            res.status(201).json({
                success: true,
                message: 'successfully fetched',
                todo: todo[0] ? todo[0]: {}
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        })
    },

    'updateTodoById' : function (req, res) {
        const sql = req.app.get('sql');
        let todoId = req.params.todoId;
        let userId = req.decoded.id;
        todoDataServiceProvider.updateTodoById(sql, todoId, userId, req.body).then(details => {
            res.status(201).json({
                success: true,
                message: 'successfully updated',
                details
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({err});
        })
    },
    'createTodo': function(req, res, next) {
        const sql = req.app.get('sql');
        let userId = req.decoded.id;
        todoDataServiceProvider.createTodo(sql, req.body, userId).then(() => {
            res.status(200).json({
                success: true,
                message: 'successfully created'
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    'deleteByTodoId': function(req, res) {
        let todoId = req.params.todoId;
        const sql = req.app.get('sql');
        let userId = req.decoded.id;
        todoDataServiceProvider.deleteByTodoId(sql, todoId, userId).then(() => {
            res.status(201).json({
                success: true,
                message: 'successfully deleted',
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}