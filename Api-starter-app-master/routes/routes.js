'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const users = require('../controllers/users')

const questions = require('../controllers/questions')
const send = require('../controllers/send')
const result = require('../controllers/result')
const answer = require('../controllers/answer')

/*
* Kevin's Routes
*/
router.route('/question/:questionId/id')
  .get(questions.getQuestionById)
router.route('/question/:order/order')
  .get(questions.getQuestionByOrder)


/*
* User Routes
*/
router.route('/user')
  .post(auth.validateUser, users.createUser)
  // .get(auth.validateUser, users.getUserById)
  // .put(auth.validateUser, users.updateUser)
  .delete(auth.validateUser, users.deleteUser)

/*
* Auth Routes
*/
router.route('/auth/login')
  .post(auth.loginUser);

router.route('/question')
  .post(questions.makeQuestion) 
  .get(questions.getAllQuestions)

router.route('/question/:questionId/delete')
  .delete(questions.deleteQuestion)

/*
* Send Routes
*/
// Sends user text message of result 
router.route('/results/sendText')
	.post(send.sendUserTextMessage)

// Sends user email of result 
router.route('/results/sendEmail')
	.post(send.sendUserEmail)

/*
* Result Routes
*/
router.route('/result')
  .post(result.pushResult)
  .get(result.getBreakDown)
//   .delete(result.deleteAllResults)

/*
* Answer Routes
*/
router.route('/answer')
  .post(answer.pushAnswer)
  .get(answer.getBreakDown)
  // .delete(answer.deleteAllAnswers)

// router.route('/test')
//   .get(answer.getAllAnswers)

// expose routes through router object
module.exports = router;
