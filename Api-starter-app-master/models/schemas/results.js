const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var resultSchema = new Schema({
    akshitha: {type: Boolean, index: false},
    braedon: {type: Boolean, index: false},
    ethan: {type: Boolean, index: false},
    humphri: {type: Boolean, index: false},
    noah: {type: Boolean, index: false}
});

resultSchema.pre('save', function(callback) {
    if (!this.akshitha && !this.braedon && !this.ethan && !this.humphri && !this.noah)
        return callback(new Error('Missing result'));
    callback();
});

var Result = mongoose.model('Result', resultSchema);

module.exports = Result;
