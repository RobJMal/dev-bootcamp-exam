const Question = require('../models/schemas/question');

<<<<<<< HEAD
exports.makeQuestion = (req, res, next) => {
=======
exports.createQuestion = (req, res, next) => {
	console.log('HERE')
	if (req.body.order === undefined) {
		return res.status(400).send('Must provide order')
	}
>>>>>>> 6e750edc5460d4599cdd57c17757fcc4bfb1e30d
	if (!req.body.prompt) {
		return res.status(400).send('Must provide question prompt')
	}
	if (!req.body.answers) {
		return res.status(400).send('Must provide question answers')
	}

	const questionData = {
<<<<<<< HEAD
=======
		order: req.body.order,
>>>>>>> 6e750edc5460d4599cdd57c17757fcc4bfb1e30d
		prompt: req.body.prompt,
		answers: req.body.answers
	}

	console.log(JSON.stringify(questionData))
	const newQuestion = new Question(questionData)
	newQuestion.save((err) => {
		if (err) return next(err)
		return res.json(newQuestion)
	})
}

exports.getAllQuestions = (req, res, next) => {
    Question.find({}).then(questions => res.json(questions)).catch(next);
}

exports.getQuestionById = (req, res, next) => {
    Question.findById(req.params.questionId).then(question => {
        if (!question) return res.status(404).send('Could not find question: invalid id');
        return res.json(question)
    }).catch(next);
};

//kevin
exports.getQuestionByOrder = (req, res, next) => {
  Question.findOne({ order: req.params.order}, (err, question) => {
    if (err) return next(err)
    if (!question) return res.status(404).send('No question with order: ' + req.params.order)
    return res.json(question)    
  }).catch(next)
}

exports.updateQuestion = (req, res, next) => {
    Question.findOneAndUpdate(req.body.id, req.body).then(question => {
        if (!question) return res.status(404).send('No question with that ID');
        return res.sendStatus(200);
    }).catch(next);
};

exports.deleteQuestion = (req, res, next) => {
    Question.findByIdAndRemove(req.body.id)
    .then(question => res.sendStatus(200))
    .catch(next);
}