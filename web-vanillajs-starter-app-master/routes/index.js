const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');

router.get('/', (req, res, next) => {
    return res.render('index');
});

router.get('/welcome', (req, res, next) => {
	return res.render('welcome')
})

router.get('/makeQuestion', (req, res, next) => {
	return res.render('makeQuestion')
})

router.post('/makeQuestion', (req, res, next) => {
	request.post({
		url: config.apiUrl + '/question',
		form: req.body
	}).pipe(res)
})

router.get('/question', (req, res, next) => {
	return res.render('question')
})

router.get('/results', (req, res, next) => {
    return res.render('results');
});

router.get('/login', (req, res, next) => {
    return res.render('login');
});

//so this is unused now...

router.post('/register', (req, res, next) => {
  request.post({
      url: config.apiUrl + '/users',
      form: req.body
  }).pipe(res)
})

router.post('/login', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/auth/login',
    form: req.body
  }).pipe(res)
})

module.exports = router;
