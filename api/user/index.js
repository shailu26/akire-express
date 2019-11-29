const Router = require('express');
const userController = require('./user.controller');
const utils = require('../../helpers/utils');
const router = Router();

router
    .post('/login', utils.verifyLogin)
    .post('/createUser', utils.bycryptPassword, userController.createUser)
    .get('/getUserDetail/:userId', utils.validateToken, userController.getUserDetail)
    .patch('/updateUserById', utils.validateToken, userController.updateUserById)
    .post('/verifyPassword', utils.validateToken, utils.verifyPassword, userController.updatePassword);

module.exports = router;