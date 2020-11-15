//select all elements

var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var scores = document.getElementById("scores");
var counter = document.getElementById("timeLeft");
var initials = document.getElementById("initials");
var dataOutput = document.getElementById("dataOutput");
var saveScoresButton = document.getElementById("saveScores");
var enterScores = document.getElementById("enterScores");
var highScores = document.getElementById("highScores");


//Create questions

var questions = [
  {
    question: "What does CSS stand for?",
    choiceA: "Computer Science Studies",
    choiceB: "Cascading Style Sheets",
    choiceC: "Cascade Style Sheets",
    correct: "B",
  },
  {
    question: "With which special character do you define an array?",
    choiceA: "[]",
    choiceB: "{}",
    choiceC: "$$",
    correct: "A",
  },
  {
    question: "What is a string?",
    choiceA: "Text written within quote",
    choiceB: "Number",
    choiceC: "Boolean",
    correct: "A",
  },
];

// create some variables
var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var timeLeft = 75;
var timeInterval;

// render time
function renderTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft = 0) {
    endQuiz();
  }
  counter.innerText = timeLeft;
}

// render a question and the different choices
function renderQuestion() {
  var q = questions[runningQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.classList.add("hidden");
  renderQuestion();
  quiz.classList.remove("hidden");
  timerInterval = setInterval(renderTimer, 1000);
}

//check answer
function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    alert("Correct!");
  } else {
    alert("Incorrect!");
    timeLeft = timeLeft - 10;
    counter.innerText = timeLeft;
  }

  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    endQuiz();
  }
}
//end quiz
function endQuiz() {
  clearInterval(timerInterval);
  quiz.classList.add("hidden");
  scores.classList.remove("hidden");
  userScore.innerHTML = timeLeft;
}
//render highscores
function renderHighScores() {
  var data = fetchStoredScores();
  var output = "";
  if (data.scores) {
    for (i = 0; i < data.scores.length; i++) {
      output += `${data.scores[i].initials}    ${data.scores[i].score}<br/>`;
    }
  }
  dataOutput.innerHTML = output;
  enterScores.classList.add("hidden");
  highScores.classList.remove("hidden");
}
//save scores
function saveScores() {
  var data = fetchStoredScores();
  if (data.scores) {
    data.scores.push({
      initials: initials.value.toUpperCase(),
      score: timeLeft,
    });
  } else {
    data.scores = [
      {
        initials: initials.value.toUpperCase(),
        score: timeLeft,
      },
    ];
  }
  localStorage.setItem("scores", JSON.stringify(data));
  renderHighScores();
}

//fetch the high scores
function fetchStoredScores() {
  var data = localStorage.getItem("scores");
  if (data) {
    return JSON.parse(data);
  } else {
    return {};
  }
}

saveScoresButton.addEventListener("click",saveScores );