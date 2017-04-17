var express = require('express');
var router = express.Router();

var commentController = require('../controllers/comment');
var authController = require('../controllers/auth');

function authenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.json({success: false, msg: "Authentication Error"});
}

router.route('/comments')
    .post(authenticated, commentController.postComment)
    
router.route('/comments/:topic_id')
    .get(authenticated, commentController.getComments);
    
router.route('/comments/:comment_id')
    .put(authenticated, commentController.putComment)
    .delete(authenticated, commentController.deleteComment);

exports.commentRouter = router;