const Question = require('../models/schemas/question');

exports.createQuestion = (req, res, next) => {
	if (!req.body.prompt) {
		return res.status(400).send('Must provide question prompt')
	}
	if (!req.body.answers) {
		return res.status(400).send('Must provide question answers')
	}

	const questionData = {
		prompt: req.body.prompt
	}

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
    Question.findById(req.body.id).then(question => {
        if (!question) return res.status(404).send('Could not find question: invalid id');
        return res.json(question)
    }).catch(next);
};

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