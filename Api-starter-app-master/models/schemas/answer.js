const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
   id: Number,
   choice: [Number]
});

answerSchema.pre('save', function(callback) {
    if (!this.id || !this.choice)
        return callback(new Error('Missing answer'));
    callback();
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
