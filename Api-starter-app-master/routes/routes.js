'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const users = require('../controllers/users')
const send = require('../controllers/send')
const result = require('../controllers/result')

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


// router.route('/test')
//   .get(result.getAllResults)

// expose routes through router object
module.exports = router;
