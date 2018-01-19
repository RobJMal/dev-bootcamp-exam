const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');

router.get('/', (req, res, next) => {
    return res.render('index');
});

<<<<<<< HEAD
router.get('/welcome', (req, res, next) => {
	return res.render('welcome')
})

=======
>>>>>>> 6e750edc5460d4599cdd57c17757fcc4bfb1e30d
router.get('/makeQuestion', (req, res, next) => {
	return res.render('makeQuestion')
})

router.post('/makeQuestion', (req, res, next) => {
	request.post({
		url: config.apiUrl + '/question',
		form: req.body
	}).pipe(res)
})

//noah - by questionId
router.get('/question/:questionId/questionId', (req, res, next) => {
  request.get({
    url: config.apiUrl + '/question/' + req.params.questionId + '/id'
  }, (err, response, body) => {
    body = JSON.parse(body)
    console.log(body)
    if (err) return next(err)
    // if not 200 reponse, body is error string
    if (typeof body === 'string') {
      return next(new Error(body))
    }
    return res.render('question', {
      prompt: body.prompt,
      answers: body.answers
    })
  })
})

//kevin - by order
router.get('/question/:order/order', (req, res, next) => {
  request.get({
    url: config.apiUrl + '/question/' + req.params.order + '/order'
  }, (err, response, body) => {
    body = JSON.parse(body)
    console.log(body)
    if (err) return next(err)
    // if not 200 reponse, body is error string
    if (typeof body === 'string') {
      return next(new Error(body))
    }
    return res.render('question', {
      prompt: body.prompt,
      answers: body.answers,
      order: body.order
    })
  })
})

router.get('/results', (req, res, next) => {
    return res.render('results');
});

router.get('/login', (req, res, next) => {
    return res.render('login');
});

<<<<<<< HEAD
//so this is unused now...

router.post('/register', (req, res, next) => {
=======
////so this is unused now...
// router.post('/register', (req, res, next) => {
//   request.post({
//       url: config.apiUrl + '/users',
//       form: req.body
//   }).pipe(res)
// })

// Loads my result page 
router.get('/myresults', (req, res, next) => {
  return res.render('myresults')
})

// Sends result via email
router.post('/myresults/email', (req, res, next) => {
  console.log(req.body)
>>>>>>> 6e750edc5460d4599cdd57c17757fcc4bfb1e30d
  request.post({
    url: config.apiUrl + '/results/sendEmail',
    form: req.body
  }).pipe(res)
})

// Sends result via text
router.post('/myresults/phone', (req, res, next) => {
  console.log(req.body)
  request.post({
    url: config.apiUrl + '/results/sendText',
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
