let score = 0,index = 0, timeLeft = 45
let timer

//copied from a classmate (charlotte wong)
let questions = [
  {
    question: 'Which of these is not a datatype in Javascript?',
    choice: ['Number', 'String', 'Boolean', 'Integer'],
    answer: 'Integer'
  },
  {
    question: 'Where do we reference external Javascript files?',
    choice: ['script tag', 'js tag', 'javascript tag', 'style tag'],
    answer: 'script tag'
  },
  {
    question: 'How to write an IF statement in JavaScript?',
    choice: ['if (i == 5)', 'if i == 5 then', 'if i = 5', 'if i = 5 then'],
    answer: 'if (i == 5)'
  },
  {
    question: 'Which event occurs when the user clicks on an HTML element?',
    choice: ['onmouseclick', 'onmouseover', 'onchange', 'onclick'],
    answer: 'onclick'
  },
  {
    question: 'Is JavaScript a case-sensitive language?',
    choice: ['yes', 'no', 'sometimes', 'maybe'],
    answer: 'yes'
  },
  {
    question: 'How do you declare a for loop?',
    choice: ['for i = 1 to 5', 'for (i = 0; i <= 5; i++)', 'for (i <= 5; i++)', 'for i = 1 to 5'],
    answer: 'for (i = 0; i <= 5; i++)'
  },
  {
    question: 'How do you round the number 7.25, to the nearest integer?',
    choice: ['round(7.25)', 'Math.rnd(7.25)', 'Math.round(7.25)', 'rnd(7.25)'],
    answer: 'Math.round(7.25)'
  },
  {
    question: "How can you detect the client's browser name?",
    choice: ['browser.name', 'client.navName', 'client.name', 'navigator.appName'],
    answer: 'navigator.appName'
  },
  {
    question: 'How do you declare a JavaScript variable?',
    choice: ['let variable', 'v variable', 'variable variable', 'lot variable'],
    answer: 'let variable'
  },
  {
    question: 'what operator is used to do an exact comparison',
    choice: ['==', '===', '!=', '?='],
    answer: '==='
  }
]

const displayQuestion = _ => {
  document.getElementById('questions').innerHTML = ''

  let questionElem = document.createElement('div')
  questionElem.innerHTML = `
  <h4>${questions[index].question}</h4>
  <div class="collection">
      <a href="#!" class="collection-item choice" data-value="${questions[index].choice[0]}">${questions[index].choice[0]}</a>
      <a href="#!" class="collection-item choice" data-value="${questions[index].choice[1]}">${questions[index].choice[1]}</a>
      <a href="#!" class="collection-item choice" data-value="${questions[index].choice[2]}">${questions[index].choice[2]}</a>
      <a href="#!" class="collection-item choice" data-value="${questions[index].choice[3]}">${questions[index].choice[3]}</a>
  </div
  `

  document.getElementById('questions').append(questionElem)
}

const showScores = _ => {
  document.getElementById('scores').innerHTML = ''
  document.getElementById('questions').innerHTML = ''
  document.getElementById('quizEnd').innerHTML = ''

  //make local storage
  let scores = JSON.parse(localStorage.getItem('scores')) || []

  let table = document.createElement('table')
  table.innerHTML = `
        <thead>
          <tr>
              <th>Initials</th>
              <th>Score</th>
          </tr>
        </thead>
  `

  let tBody = document.createElement('tbody')

  for(let i = 0; i < scores.length; i++) {
    tBody.innerHTML += `
        <tr>
            <td>${scores[i].initials}</td>
            <td>${scores[i].score}</td>
        </tr>
    `
  }

  table.append(tBody)
  document.getElementById('scores').append(table)

}

const endingScreen = _ => {
  clearInterval(timer)
  document.getElementById('timer').classList = 'hidden'
  document.getElementById('questions').innerHTML = ''

  let results = document.createElement('div')

  results.classList = 'centered'
  results.innerHTML = `
  <h3>Quiz Over!</h3>
  <h6>Your Score: ${score}</h6>
    <div class="row">
      <form>
          <div class="col s4"></div>
          <div class="input-field col s4">
              <input class="initials-color" value="" id="initials">
              <label class="active my-label" for="initials">Enter your initials to submit!</label>
              <button id="submit" class="btn waves-effect waves-light red" type="submit"name="action">Submit</button>
          </div>
          <div class="col s4"></div>
      </form>
    </div
  `
  document.getElementById('quizEnd').append(results)
}

const sortList = (start, end) => {
  return(end.score - start.score)
}

const addScore = () => {
  let initials = document.getElementById('initials').value
  let scores = JSON.parse(localStorage.getItem('scores')) || []

  scores.push({
    initials,
    score
  })

  scores.sort(sortList)
  localStorage.setItem('scores', JSON.stringify(scores))
}

//quiz start
document.getElementById('start').addEventListener('click', _ => {
  document.getElementById('scores').innerHTML = ''
  document.getElementById('start').remove()
  document.getElementById('timer').innerHTML = `Time Left: ${timeLeft}`
  document.getElementById('timer').classList = ''
  timer = setInterval(() => {
    if(timeLeft > 0 ) {
      timeLeft--
      document.getElementById('timer').innerHTML = `Time Left: ${timeLeft}`
    } else {
      endingScreen()
    }
  }, 1000);
  displayQuestion()
})

//get answer
document.addEventListener('click', event => {
  event.preventDefault()
  if(event.target.classList.contains('choice')) {
    if(event.target.dataset.value === questions[index].answer) {
      score++
    } else {
      timeLeft -=5
    }
    index++

    if(index < questions.length) {
      displayQuestion()
    } else {
      endingScreen()
    }
  }
})

document.getElementById('highscores').addEventListener('click', _ => {
  clearInterval(timer)
  showScores()
})
document.addEventListener('click', event => {
  event.preventDefault()
  if(event.target.id === 'submit') {
    addScore()
    showScores()
  }
})
