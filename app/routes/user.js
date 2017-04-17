var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');
var authController = require('../controllers/auth');

router.route('/users')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:user_id')
    .get(userController.getUser)
    .put(userController.putUser)
    .delete(userController.deleteUser);
    
exports.userRouter = router; 