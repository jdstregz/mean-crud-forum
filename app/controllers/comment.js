var Comment = require('../models/comment');

exports.postComment = function(req, res){
    var comment = new Comment();
    comment.message = req.body.message;
    comment.topicId = req.body.topicId;
    comment.userId = req.user._id;
    comment.username = req.user.username;
    
    comment.save(function(err){
        if(err){
            res.send(err);
            return;
        }
        res.json({message: 'Comment added to the database', data: comment});
    });
};

exports.getComments = function(req, res){
    Comment.find({topicId: req.params.topic_id}, function(err, comments){
        if(err){
            res.send(err);
            return;
        }
        res.json(comments);
    });
};

exports.putComment = function(req, res) {
    Comment.update({userId: req.user._id, _id: req.params.comment_id}, {message: req.body.message}, function(err, num, raw){
        if(err){
            res.send(err);
        }
        res.json({message: num + ' updated'});
    });
};

exports.deleteComment = function(req, res) {
    Comment.remove({userId: req.user._id, _id: req.params.comment_id}, function(err){
        if(err){
            res.send(err);
        }
        res.json({message: 'Comment removed'});
    });
};

