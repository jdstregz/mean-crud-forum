var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    message: {type: String, required: true},
    topicId: {type: String, required: true},
    userId: {type: String, required: true},
    username: {type: String, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);