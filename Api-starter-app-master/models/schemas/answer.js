const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
   id: Number,
   choice: Number
});

answerSchema.pre('save', function(callback) {
    callback();
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
