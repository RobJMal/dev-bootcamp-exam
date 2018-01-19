const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');

router.get('/', (req, res, next) => {
    return res.render('index');
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
      request.get({
        url: config.apiUrl + '/result' 
      }, (err, response, body) => {
      body = JSON.parse(body)
      const data = []
      data.push(parseInt(body.akshitha))
      data.push(body.braedon)
      data.push(body.ethan)
      data.push(body.humphri)
      data.push(body.noah)
      return res.render('results', {
        total: data
      })
  }) 
})

// router.get('/resultsByQuestion', (req, res, next) => {
//       request.get({
//         url: config.apiUrl + '/answer' 
//       }, (err, response, ans) => {
//       ans = JSON.parse(ans)
//       const question1 = []
//       for (var each in ans.answers[0].choice){
//         choice.push(each.choiceNo)
//         count.push(each.count)
//       }
//       return res.render('resultsByQuestion', {
//         choice: choice,
//         count: count
//       })
// })

router.get('/login', (req, res, next) => {
    return res.render('login');
})


// Loads my result page 
router.get('/myresults', (req, res, next) => {
  return res.render('myresults')
})

// Loads my result page with your spirit 
router.get('/myresults/:spirit/spirit', (req, res, next) => {
  return res.render('myresults', {
    spirit: req.params.spirit
  })
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

router.post('/login', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/auth/login',
    form: req.body
  }).pipe(res)
})


router.post('/answer', (req, res, next) => {
  request.post({
    url: config.apiUrl + '/answer',
    form: req.body
  }).pipe(res)
})

module.exports = router;
