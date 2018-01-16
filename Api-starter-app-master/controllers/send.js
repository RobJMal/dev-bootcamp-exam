const mailer = require('nodemailer')
const config = require('../models/config')

const transporter = mailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.emailFromAddress,
		pass: config.emailPassword
	}
})

// Creates email that enables user to recieve text of results 
function buildEmailForText(phoneNumber, phoneProvider) {
	return phoneNumber + getProviderDomain(phoneProvider)
}

// Gets phone provider domain from config file 
function getProviderDomain(provider) {
  for (let i = 0; i < config.providers.length; i++) {
    if (provider === config.providers[i].name) {
      return config.providers[i].sms
    }
  }
  throw new Error('Invalid provider')
}

// Sends user text message of results 
exports.sendUserTextMessage = (req, res, next) => {
	const email = buildEmailForText(req.body.phoneNumber, req.body.phoneProvider)	
	const message = {
		from: `"${config.emailFromName}" <${config.emailFromAddress}>`,
		to: email,
		subject: 'Results',
		html: 'You got ' + req.body.result  
	}

	transporter.sendMail(message, (err, info) => {
		if (err) return next(err)
		return res.json(info)
	})
}

// Sends user email of their results 
exports.sendUserEmail = (req, res, next) => {
	const userEmail = req.body.email 

	const message = {
		from: `"${config.emailFromName}" <${config.emailFromAddress}>`,
		to: userEmail,
		subject: 'Results',
		html: 'You got ' + req.body.result 
 	}

	transporter.sendMail(message, (err, info) => {
		if (err) return next(err)
		return res.json(info)
	})
}

/*
-------------- QUESTIONS ------------------	
-How can I test this program?  
	-CREATE A ROUTE
	-TEST THROUGH POSTMAN 

-------------- WHAT'S REQUIRED? -----------
req.body.result
req.body.email
req.body.phoneNumber
req.body.phoneProvider 
*/