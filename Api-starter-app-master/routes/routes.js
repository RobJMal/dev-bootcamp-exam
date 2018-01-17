'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const users = require('../controllers/users')
<<<<<<< HEAD
const questions = require('../controllers/questions')
=======
const send = require('../controllers/send')
>>>>>>> 47fc74eed8724809516857b29be73ab016b6d61a


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

<<<<<<< HEAD
router.route('/question')
  .post(questions.createQuestion)
  .get(questions.getAllQuestions)
=======

/*
* Send Routes
*/
// Sends user text message of result 
router.route('/results/sendText')
	.post(send.sendUserTextMessage)

// Sends user email of result 
router.route('/results/sendEmail')
	.post(send.sendUserEmail)

>>>>>>> 47fc74eed8724809516857b29be73ab016b6d61a

// expose routes through router object
module.exports = router;
