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
	
	let phoneNumber = req.body.phoneNumber

	if (!isValidPhoneNumber(phoneNumber)) {
		throw new Error("Invalid phone number/format.")
	}

	phoneNumber = formatPhoneNumber(phoneNumber)

	const email = buildEmailForText(phoneNumber, req.body.phoneProvider)	
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
	
	if (!isValidEmail(req.body.email)) {
		throw new Error("Invalid email/email format.")
	}

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


// Checks if phone number is valid 
// Method obtained from: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
function isValidPhoneNumber(phoneNumber) {
	return /^[\+]?[(]?[0-9]{3}[)]?[-\ss\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(String(phoneNumber))
}

// Formats phone number to 10-digit number 
function formatPhoneNumber(phoneNumber) {
	const phoneNumberArr = phoneNumber.split("")
	return phoneNumberArr.filter((char) => !isNaN(char)).join("")
}


// Checks if valid email.  
// Method obtained from: https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript
function isValidEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
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