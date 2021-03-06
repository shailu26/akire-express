const commonFunction = require('../../common/commonFunction');
const moment = require('moment');
module.exports = {
    'getTodoList' : function (sql, userId) {
    let q = `select * from todo where user_id=${+userId}`
    return commonFunction.excuteQuery(sql, q);
    },
    'updateTodoById': function (sql, todoId, userId, reqBody) {
        let {date, title, status} = reqBody;
        date = moment(date).format('YYYY-M-D HH:mm:ss');
        let q = `UPDATE todo SET user_id = ${+userId}, date='${date}', title = '${title}', status = '${status}' WHERE id = ${+todoId} and user_id=${+userId}`;
        return commonFunction.excuteQuery(sql, q);
    },
    'createTodo': function(sql, todo, userId) {
        let {date, title, status} = todo;
        date = moment(date).format('YYYY-M-D HH:mm:ss');
        let q = `insert into todo (user_id, date, title, status) values(${+userId}, '${date}', '${title}', '${status}')`;
        return commonFunction.excuteQuery(sql, q);
    },
    'deleteByTodoId': function(sql, todoId, userId) {
        let q = `delete from todo where id='${+todoId}' and user_id=${+userId}`;
        return commonFunction.excuteQuery(sql, q);
    },
    'getTodoById': function(sql, todoId, userId) {
        let q = `select * from todo where id=${+todoId} and user_id=${+userId}`;
        return commonFunction.excuteQuery(sql, q);
    }
}
