const Answer = require('../models/schemas/answer');
const config = require('../models/config');

exports.pushAnswer = (req, res, next) => {
    var answerData = {};
    answerData.id = req.body.id;
    answerData.choice = req.body.choice;

    var newAns = new Answer(answerData);
    newAns.save((err, user) => {
        if (err) {
            if (err.code === 11000)
                return res.status(400).send('Answer failed to be added.');    
            return next(err);
        }
        return res.sendStatus(200);
    });
};

exports.getAllAnswers = (req, res, next) => {
    Answer.find({}).then(answers => res.json(answers)).catch(next);
};

exports.deleteAllAnswers = (req, res, next) => {
    Answer.remove({}).then(answers => res.json(answers)).catch(next);
};

exports.getBreakDown = (req, res, next) => {
    var ans;
    Answer.aggregate(
        { "$group": {
            "_id": {
                "id": "$id",
                "choice": "$choice"
            },
            "choiceCount": { "$sum": 1 }
        }},
        { "$group": {
            "_id": "$_id.id",
            "choice": { 
                "$push": { 
                    "choiceNo": "$_id.choice",
                    "count": "$choiceCount"
                },
            },
            "count": { "$sum": "$choiceCount" }
        }},
        { "$sort": { "_id": 1 } }
    ).then(answers => res.json({answers})).catch(next);
};