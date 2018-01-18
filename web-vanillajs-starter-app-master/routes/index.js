const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');

router.get('/', (req, res, next) => {
    return res.render('index');
});

router.get('/results', (req, res, next) => {
    return res.render('results');
});

router.get('/login', (req, res, next) => {
    return res.render('login');
});

// Loads my result page 
router.get('/myresults', (req, res, next) => {
  return res.render('myresults')
})

// Sends result via email
router.post('/myresults/email', (req, res, next) => {
  console.log(req.body)
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
