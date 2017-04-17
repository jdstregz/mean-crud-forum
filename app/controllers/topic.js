var Topic = require('../models/topic');

exports.postTopic = function(req, res){
    var topic = new Topic();
    topic.title = req.body.title;
    topic.category = req.body.category;
    topic.userId = req.user._id;
    
    topic.save(function(err) {
        if(err){
            res.send(err);
            return;
        }
        res.json({message: 'Topic added to database', data: topic});
    });
};

exports.getTopics = function(req, res) {
    Topic.find(function(err, topics) {
        if(err) {
            res.send(err);
            return;
        }
        res.json(topics);
    });
};

exports.getTopic = function(req, res) {
    Topic.findById(req.params.topic_id, function(err, topic) {
        if(err){
            res.send(err);
            return;
        }
        res.json(topic);
    });
};

exports.putTopic = function(req, res) {
    Topic.update({userId: req.user._id, _id: req.params.topic_id}, { title: req.body.title, category: req.body.category }, function(err, num, raw){
        if(err){
            res.send(err);
            return;
        }
        res.json({message: num + ' updated'});
    });
};

exports.deleteTopic = function(req, res){
    Topic.remove({userId: req.user._id, _id: req.params.topic_id }, function(err){
        if (err){
            res.send(err);
            return;
        }
        res.json({message: 'Topic removed from database'});
    });
};