const question = document.getElementById("question");
const options = document.getElementById("options");
const next = document.getElementById("next");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const modal = document.getElementById("lightbox");
const description = document.getElementsByClassName("description")[0];
const start_description = description.querySelectorAll("p")[0];
const start_description_next = description.querySelectorAll("p")[1];
const closeBtn = document.getElementsByClassName("close")[0];
const resultDisplay = document.getElementById("resultDisplay");
const result_message = resultDisplay.querySelectorAll("p")[0];
const result = resultDisplay.querySelectorAll("div")[0];

let currentQuestion = 0;
let score = 0;
let answerSelected = false;
const totalQuestions = 10;

fetch("./Questions.json")
  .then((response) => response.json())
  .then((data) => {
    Question_Array = data;
  });

function startQuiz() {
    start.style.display = "none";
    resultDisplay.style.display = "none";
    start_description.style.display = "none";
    start_description_next.style.display = "none";
    if (currentQuestion === 0) {
        modal.classList.add("show");
    }
    question.innerHTML =
        `${currentQuestion + 1}. ` + Question_Array[currentQuestion].question;
    options.innerHTML = "";
    result.innerHTML = "";
    result_message.innerHTML = "";
    next.innerHTML = `<button onclick="nextQuestion()" disabled>Next</button>`;
    const nextButton = next.querySelector("button");

    Question_Array[currentQuestion].answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.answer;
        button.onclick = () => {
        checkAnswer(answer.correct);
        button.style.backgroundColor = answer.correct ? "#D1FAE5" : "#FEE2E2";

        const allButtons = options.querySelectorAll("button");
        allButtons.forEach((btn) => {
            const correctAnswer = Question_Array[currentQuestion].answers.find(
            (a) => a.answer === btn.innerHTML
            );

            if (correctAnswer.correct && btn !== button) {
            btn.style.backgroundColor = "#D1FAE5";
            }
            (btn.disabled = true), (answerSelected = true);
        });

        nextButton.disabled = false;
        };
        options.appendChild(button);
    });
}

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

function checkAnswer(correct) {
  if (correct) {
    score++;
  }
}

function nextQuestion() {
  if (currentQuestion < Question_Array.length - 1) {
    currentQuestion++;
    answerSelected = false;
    startQuiz();
  } else {
    question.innerHTML = "";
    options.innerHTML = "";
    next.innerHTML = "";

    if (score === totalQuestions) {
      result_message.innerHTML =
        "🎉🤩 Congratulations! You got all the answers correct!";
      resultDisplay.style.backgroundColor = "#c2ffa8";
      resultDisplay.style.color = "#67a54d";
    } else if (score > totalQuestions / 2) {
      result_message.innerHTML =
        "Good job! You got most of the answers correct!";
      resultDisplay.style.backgroundColor = "#c2ffa8";
      resultDisplay.style.color = "#67a54d";
    } else {
      result_message.innerHTML = "You need to study more!";
      resultDisplay.style.backgroundColor = "#fff1f2";
      resultDisplay.style.color = "#f68a77";
    }
    result.innerHTML = `Your score is ${score} / ${totalQuestions}`;
    restart.style.display = "block";
    resultDisplay.style.display = "block";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  startQuiz();
  restart.style.display = "none";
  resultDisplay.style.display = "none";
  result.innerHTML = "";
  result_message.innerHTML = "";
}
