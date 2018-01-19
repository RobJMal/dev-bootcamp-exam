'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const users = require('../controllers/users')

const questions = require('../controllers/questions')

const send = require('../controllers/send')

/*
* User Routes
*/
router.route('/user')
  .post(auth.validateUser, users.createUser)
  .get(auth.validateUser, users.getUserById)
  .put(auth.validateUser, users.updateUser)
  .delete(auth.validateUser, users.deleteUser)

/*
* Auth Routes
*/
router.route('/auth/login')
  .post(auth.loginUser);

router.route('/question')
  .post(questions.makeQuestion)
  .get(questions.getAllQuestions)


/*
* Send Routes
*/
// Sends user text message of result 
router.route('/results/sendText')
	.post(send.sendUserTextMessage)

// Sends user email of result 
router.route('/results/sendEmail')
	.post(send.sendUserEmail)


// expose routes through router object
module.exports = router;
