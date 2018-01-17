'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const users = require('../controllers/users')
const questions = require('../controllers/questions')


/*
* User Routes
*/
router.route('/users')
  .post(users.createUser)
  .get(auth.validateUser, users.getUserById)
  .put(auth.validateUser, users.updateUser)
  .delete(auth.validateUser, users.deleteUser)

/*
* Auth Routes
*/
router.route('/auth/login')
  .post(auth.loginUser);

router.route('/question')
  .post(questions.createQuestion)
  .get(questions.getAllQuestions)

// expose routes through router object
module.exports = router;
