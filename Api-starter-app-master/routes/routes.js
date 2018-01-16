'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const user = require('../controllers/users')


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

// router.route('/test')
// 	.get(user.getAllUser);

// expose routes through router object
module.exports = router;
