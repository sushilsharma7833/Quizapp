//accesing html elements here---------------------------------------------------------------------------------
const infobox = document.querySelector(".inform-box");
const Continue = document.querySelector("#continue");
const category = document.querySelector(".categ-box");
const Reset = document.querySelector("#reset_category");
const QuestionBox = document.querySelector(".Question-box");
let answer_options = document.querySelector(".answer-options");
const option_list = document.querySelector(".answer-options");
const result_box = document.querySelector(".result-box");
const restart = document.querySelector(".restart");
const Quit = document.querySelector(".quit");
const timer = document.querySelector("#timer");
let que_count = 0;
let que_numb = 1;
let score = 0;
let val = "";
let correctAnswers = 0;
let wrongAnswers = 0;
let totalQuestion = 10;
let attempt = 0;
let percent_result = 0;
//timer section is started here.-----------------------------------------------
var timeLeft = 300;
var time_take = 0;
var elem = document.querySelector("#timer");

var timerId = setInterval(countdown, 1000);
//for display username on webpage.----------------------------------
printname = () => {
  const val = document.querySelector("#user_name").value;
  const user_Name = (document.querySelector(".name-result").innerHTML =
    val + " " + "your Result is ");
  document.querySelector("#displayname").innerHTML = "Welcome" + " " + val;
};
// countdown timer created here-----------------------------------------------------------
function countdown() {
  if (timeLeft == 00) {
    clearTimeout(timerId);
    doSomething();
    updateLocalStorage();
  } else {
    elem.innerHTML = timeLeft;
    timeLeft--;
  }
}
///time taken---------------------------------------------------------------------
function run() {
  let TimeRemaining = timeLeft - time_take - 300;
  let x = Math.abs(TimeRemaining);
  result_box.querySelector(".time-taken").innerHTML =
    "<b>Total Time Taken is </b>:" + x + "seconds";
}

//If continue button clicked----------------------------------------------------------------------------
Continue.onclick = () => {
  category.classList.add("activeinfo");
  infobox.classList.remove("category");
  showQuestion[0];
  queCounter(0);
};
//when restart onclick.--------------------------------------------------------------------------------------
//when click on go to home it reload and display the first page.
restart.addEventListener("click", () => {
  window.location.reload(true); // Window reload at result page
});

//for remove activeinfo---------------------------------------------------------------------------------------------
Reset.onclick = () => {
  category.classList.remove("activeinfo");
};
//show result when alll the sections are completed .-----------------------------------------------------------------
function showResultbox() {
  infobox.style.display = "none";
  category.classList.remove("activeinfo");
  QuestionBox.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");

  function wrong_Ans() {
    wrongAnswers = totalQuestion - score;
    result_box.querySelector(".wrong").innerHTML =
      "<b>WrongAnswers</b> :" + wrongAnswers;
  }
  function correct_Ans() {
    correctAnswers = totalQuestion - wrongAnswers;
    result_box.querySelector(".correct").innerHTML =
      "<b> CorrectAnswers:</b> " + correctAnswers;
  }
  function percentage() {
    percent_result = (correctAnswers / totalQuestion) * 100;
    result_box.querySelector(".Percentage").innerHTML =
      "<b> Percentage :</b> " + percent_result + "%";
  }
  function time() {
    time_taken = totaltime - timeLeft;
    result_box.querySelector(".time-taken").innerHTML =
      "<b> Total Time Taken :</b> " + time_taken + " seconds";
  }

  wrong_Ans();
  correct_Ans();
  percentage();
  run();
}
//showresultbox ends here.----------------------------------------------------------------------------------------------

//-------------------------------------probability section js starts here--------------------------------------------------
// probab button accesed here
const probab = document.querySelector("#pb");
const next_button = QuestionBox.querySelector("#next");
//for adding question of probabilities.
probab.onclick = () => {
  category.classList.add("none");
  infobox.classList.remove("activeinform");
  QuestionBox.classList.add("activeQuiz");
  showQuestion(0);
  queCounter(1);
};

//if next button is clicked then it show the probability question--------------
next_button.onclick = () => {
  if (que_count < PROBABILITY.length - 1) {
    que_count++;
    que_numb++;
    showQuestion(que_count);
    queCounter(que_numb);
    countdown();

    next_button.style.display = "none";
  } else {
    console.log("question completed");
    showResultbox();

    // user_Name_Input = user_Name;
    // showscore()
  }
};
//getting questions and options from probabibility.--------------------------------------------
function showQuestion(index) {
  const que_text = document.querySelector(".question");

  let que_tag =
    "<span>" +
    PROBABILITY[index].numb +
    ". " +
    PROBABILITY[index].question +
    "</span>";
  let option_tag =
    '<span class="option">' +
    PROBABILITY[index].options[0] +
    "</span>" +
    '<span class="option">' +
    PROBABILITY[index].options[1] +
    "</span>" +
    '<span class="option">' +
    PROBABILITY[index].options[2] +
    "</span>" +
    '<span class="option">' +
    PROBABILITY[index].options[3] +
    "</span>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
//function check either its is right or wrong options-----------------------------------------------------
function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = PROBABILITY[que_count].answer;
  let allOptions = option_list.children.length;
  let scorebox = document.querySelector("#score");
  scorebox.innerText = "score";

  if (userAns == correctAns) {
    answer.classList.add("correct");
    console.log("Answer is Correct");
    score++;
    scorebox.innerHTML = "Score :" + score;
    run();
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");
    scorebox.innerHTML = "Score :" + score;
    //if answer is incorrect then automatically  selected the correct answer.
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
  }
  attempt++;
  //once user selected disabled all options-----------------------------------------------------

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_button.style.display = "block";
}
//for changing the question count.------------------------------------------------
function queCounter(index) {
  const top_question_count = QuestionBox.querySelector(".qcount");
  let totalQuestioncount =
    "<span>" + index + "/" + PROBABILITY.length + "</span>";
  top_question_count.innerHTML = totalQuestioncount;
}

//probability js ends here---------------------------------------------------------------------------------------------------------------
