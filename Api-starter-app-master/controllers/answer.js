const Answer = require('../models/schemas/answer');
const config = require('../models/config');

exports.pushAnswer = (req, res, next) => {
    if (!req.body.id && !req.body.choice)
        return res.status(400).send('No answer');

    var answerData = {};
    if (req.body.id)
        answerData.id = req.body.id;
    if (req.body.choice)
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
  Answer.aggregate([
      {
        "$unwind" :  { path: "$choice", includeArrayIndex: "arrayIndex" }
      },
      {
        "$group": {
            "_id": "$arrayIndex",
            "choice" : { "$sum" : "$choice"}
        }
      },
      { 
        $sort: { "_id": 1}
      },
      {
        "$group":{
          "_id": "$id",
          "choice":{"$push":"$choice"}
          } 
      },
      {
        "$project": {"_id":0,"choice":1}
      }
  ]).then(choice => res.json(choice)).catch(next);
};