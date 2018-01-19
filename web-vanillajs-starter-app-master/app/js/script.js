const form = document.forms[0]

function startQuiz() {
  localStorage.ak = "0"
  localStorage.bv = "0"
  localStorage.ez = "0"
  localStorage.ho = "0"
  localStorage.np = "0"
  window.location = '/question/0/order'
}

function nextQuestion(order, count, ak, bv, ez, ho, np) {
  if (ak === 1) {localStorage.ak++}
  if (bv === 1) {localStorage.bv++}
  if (ez == 1) {localStorage.ez++}
  if (ho === 1) {localStorage.ho++}
  if (np === 1) {localStorage.np++}

  console.log("localstorage: " + localStorage.ak + ", " + localStorage.bv + ", " + localStorage.ez + ", " + localStorage.ho + ", " + localStorage.np)

  //send data to Gabin's all results
  var data = {
    id: order,
    choice: count
  }
  fetch('/answer', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(function(res) {
    if (!res.ok) { alert('ERROR') }
    // console.log("entered function 1")
    res.json()
    .then(function(data) {
      // alert(JSON.stringify(data))
      localStorage.token = data.token
      // window.location = '/makeQuestion'
    })
  })
  
  //redirect to next question
  order += 1
  // not the best implementation...
  if (order < 12) {
    window.location = '/question/' + order + '/order'
  }
  // TO TRANSITION TO MY RESULTS PAGE
  else {
    var largestNum = localStorage.ak
    var largestSpirit = "AKSHITHA"
    if (localStorage.bv > largestNum) {
      largestNum = localStorage.bv
      largestSpirit = "BRAEDON"
    }
    if (localStorage.ez > largestNum) {
      largestNum = localStorage.ez
      largestSpirit = "ETHAN"
    }
    if (localStorage.ho > largestNum) {
      largestNum = localStorage.ho
      largestSpirit = "HUMPHRI"
    }
    if (localStorage.np > largestNum) {
      largestNum = localStorage.np
      largestSpirit = "NOAH"
    }
    window.location = '/myresults/' + largestSpirit + '/spirit'
  }
}

function login() {
  // console.log("entered function 1")
  var data = {
    email: form.email.value,
    password: form.password.value
  }
  fetch('/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(function(res) {
    if (!res.ok) { alert('ERROR') }
    // console.log("entered function 1")
    res.json()
    .then(function(data) {
      // alert(JSON.stringify(data))
      localStorage.token = data.token
      window.location = '/makeQuestion'
    })
  })
}

/*=============================================
=            Form Submit Functions            =
=============================================*/

function submitUser() {
  var data = {}
  if (form.email.value) data.email = form.email.value
  if (form.password.value) data.password = form.password.value

  if (!data.email) return displayError('Must provide email')
  if (!data.password) return displayError('Must provide password')
  if (data.password !== form.confirm.value) return displayError('Passwords do not match')

  fetch('/register', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(submitSuccess)
  .then(window.location = '/') //was /welcome before
  .catch(submitError)
}


function makeQuestion() {
  var data = {
    prompt: '',
    order: -1, 
    answers: []
  }

  if (form.prompt.value) data.prompt = form.prompt.value
  if (form.order.value) data.order = form.order.value

  var k = 0
  var p = 0

  while (form.choice[k].value) {

    var entry = {
        answer: '',
        association: []
    }
    
    entry.answer = form.choice[k].value

    while (p < (5*(k+1))) {
      if (form.faculty[p].checked) {
        entry.association.push(form.faculty[p].value)
      }
      p++
    }
    data.answers.push(entry)
    k++
  }

  // console.log(data)

  fetch('/makeQuestion', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(function(res) {
    if (!res.ok) {
      res.text()
      .then(function(message) {
        alert(message)
      })
    }
    res.json()
    .then(function(user) {
      window.location = '/question'
    })
  }).catch(function(err) {
    console.error(err)
  })
}


/*=============================================
=            Form Submit Callbacks            =
=============================================*/
function clearForm() {
    form.reset();
    clearError('message');
    var divs = document.getElementsByClassName('hidden');
    for (var i = 0; i < divs.length; i++)
        divs[i].style.display = '';
}

function clearError(target) {
    if (target === 'message')
        return document.getElementById('js-error-message').style.visibility = 'hidden';
    target.style.border = '1px solid #888';
}


function submitSuccess(res) {
    if (!res.ok) {
      return submitError(res);
    }
    var modal = document.getElementById('js-success');
    modal.style.display = 'block';
    clearForm();
}

function submitError(res, message) {
    if (res.status >= 400 && res.status < 500)
        return res.text().then(function(message) {displayError(message)});
    if (message)
        return displayError(message);
}

function displayError(message) {
    var errorDiv = document.getElementById('js-error-message');
    errorDiv.innerHTML = message;
    errorDiv.style.visibility = 'visible';
}


/*=============================================
=      Form Submit Results (text, email)     =
=============================================*/
function submitResultsToEmail(){
  var resultAndEmail = {}

  if (form.result.value) resultAndEmail.result = form.result.value
  if (form.email.value) resultAndEmail.email = form.email.value 

  console.log(resultAndEmail)

  fetch('/myresults/email', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(resultAndEmail)
  }).then(function(res) {
    res.json()
    .then(function(user) {
      alert(JSON.stringify(user))
    })
  }).catch(function(argument) {
    console.error(err)
  })
}


function submitResultsToText() {
  var resultsAndPhoneInfo = {}

  if (form.result.value) resultsAndPhoneInfo.result = form.result.value 
  if (form.phoneNumber.value) resultsAndPhoneInfo.phoneNumber = form.phoneNumber.value
  if (form.phoneProvider.value) resultsAndPhoneInfo.phoneProvider = form.phoneProvider.value

  console.log(resultsAndPhoneInfo)

  fetch('/myresults/phone', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(resultsAndPhoneInfo)
  }).then(function(res) {
    res.json()
    .then(function(user) {
      alert(JSON.stringify(user))
    })
  }).catch(function(argument) {
    console.error(err)
  })
}


// document.getElementById('result').innerHTML