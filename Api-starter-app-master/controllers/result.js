const Result = require('../models/schemas/results');
const config = require('../models/config');

exports.pushResult = (req, res, next) => {
    if (!req.body.akshitha && !req.body.braedon && !req.body.ethan && !req.body.humphri && !req.body.noah)
        return res.status(400).send('No result');

    var resultData = {};
    if (req.body.akshitha)
        resultData.akshitha = req.body.akshitha;
    if (req.body.braedon)
        resultData.braedon = req.body.braedon;
    if (req.body.ethan)
        resultData.ethan = req.body.ethan;
    if (req.body.humphri)
        resultData.humphri = req.body.humphri;
    if (req.body.noah)
        resultData.noah = req.body.noah;

    var newResult = new Result(resultData);
    newResult.save((err, user) => {
        if (err) {
            if (err.code === 11000)
                return res.status(400).send('Result failed to be added.');    
            return next(err);
        }
        return res.sendStatus(200);
    });
};

exports.getAllResults = (req, res, next) => {
    Result.find({}).then(results => res.json(results)).catch(next);
};

exports.deleteAllResults = (req, res, next) => {
    Result.remove({}).then(results => res.json(results)).catch(next);
};

exports.getBreakDown = (req, res, next) => {
  Result.aggregate([
    {
        $group: { 
            _id : 1,
            akshitha: {$sum: {$cond: ["$akshitha", 1, 0]}},
            braedon: {$sum: {$cond: ["$braedon", 1, 0]}},
            ethan: {$sum: {$cond: ["$ethan", 1, 0]}},
            humphri: {$sum: {$cond: ["$humphri", 1, 0]}},
            noah: {$sum: {$cond: ["$noah", 1, 0]}}
            // total: {$sum: 1}
        }
    },
    {$project: {_id:0}}
  ]).then(results => res.json(results[0])).catch(next);
};