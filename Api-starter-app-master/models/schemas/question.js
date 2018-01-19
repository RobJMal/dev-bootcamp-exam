const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema({
	order: Number, 
	prompt: String,
	answers: [{
		answer: String,
		association: []
	}]
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question