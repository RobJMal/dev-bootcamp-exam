'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const users = require('../controllers/users')
const send = require('../controllers/send')


/*
* User Routes
*/
router.route('/user')
  .post(auth.validateUser, user.createUser)
  .get(auth.validateUser, user.getUserById)
  .put(auth.validateUser, user.updateUser)
  .delete(auth.validateUser, user.deleteUser)




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


// expose routes through router object
module.exports = router;
