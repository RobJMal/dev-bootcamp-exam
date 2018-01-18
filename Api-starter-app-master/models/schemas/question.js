const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema({
	prompt: String,
	answers: [{
		choice: {
			answer: String,
			association: []
		}
	}]
})



questionSchema.pre('save', function(callback) {
  for(let key in questionSchema.answers) {
	if (!(key in questionSchema.answers)) {
	  delete questionSchema.answers.key
	}
  }
  callback()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question