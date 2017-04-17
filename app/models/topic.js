var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
    title: {type: String, required: true, index: {unique: true}},
    category: {type: String},
    userId: {type: String}
});

module.exports = mongoose.model('Topic', TopicSchema);