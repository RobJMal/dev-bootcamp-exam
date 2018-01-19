const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema({
	order: Number, 
	prompt: String,
<<<<<<< HEAD
	answers: [{	
=======
	answers: [{
>>>>>>> 6e750edc5460d4599cdd57c17757fcc4bfb1e30d
		answer: String,
		association: []
	}]
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question