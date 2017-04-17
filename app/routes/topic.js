var express = require('express');
var router = express.Router();

var topicController = require('../controllers/topic');
var authController = require('../controllers/auth');

function authenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.json({success: false, msg: "Authentication Error"});
}

router.route('/topics')
    .post(authenticated, topicController.postTopic)
    .get(authenticated, topicController.getTopics);

router.route('/topics/:topic_id')
    .get(authenticated, topicController.getTopic)
    .put(authController.isAuthenticated, topicController.putTopic)
    .delete(authController.isAuthenticated, topicController.deleteTopic);

exports.topicRouter = router;