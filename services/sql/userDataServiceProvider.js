const commonFunction = require('../../common/commonFunction');

module.exports = {

    'getUserDetail' : function (sql, userId) {
    let q = `select * from user where id=${+userId}`
    return commonFunction.excuteQuery(sql, q);
    },
    'updateUserById': function (sql, userId, reqBody) {
        let {name, email, isEmailChanged} = reqBody;
        let q = `UPDATE user SET full_name = '${name}', email='${email}' WHERE id = ${+userId}`;
        return commonFunction.excuteQuery(sql, q);
    },
    'createUser': function(sql, user) {
        let {name, email, password} = user;
        let q = `insert into user (full_name, email, password) values('${name}', '${email}', '${password}')`;
        return commonFunction.excuteQuery(sql, q);
    },
    'getUserByEmail': function(sql, email) {
        let q = `select * from user where email='${email}'`;
        return commonFunction.excuteQuery(sql, q);
    },
    'isEmailExist': function(sql, email) {
        let q = `select * from user where email='${email}'`
        return new Promise((resolve, reject) =>{
            commonFunction.excuteQuery(sql, q)
            .then(details => {
                console.log(details.length)
                resolve(details.length);
            })
            .catch(err => {
                reject(err);
            });
        })
    },
    'updatePassword': function(sql, userId, password) {
        let q = `UPDATE user SET password = '${password}' WHERE id = ${+userId}`;
        return commonFunction.excuteQuery(sql, q);
    }
}
