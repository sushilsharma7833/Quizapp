const profit_loss = document.querySelector("#pl");
const next4 = document.querySelector("#next4");
const categoryNames = document.querySelector(".title-bar");
//onclick the profit_loss section executed.
profit_loss.onclick = () => {
  category.classList.remove("activeinfo");
  QuestionBox.classList.add("activeQuiz");
  showQuestionprofit(0);
  queCounter(1);
  categoryNames.innerHTML = "PROFIT AND LOSS";
};
//if next button is clicked its show the profit question.--------------------------------------------------------------------
next4.onclick = () => {
  if (que_count < PROFIT.length - 1) {
    que_count++;
    que_numb++;
    showQuestionprofit(que_count);
    queCounter(que_numb);
    countdown();
    next_button.display = "none";
    next2.style.display = "none";
    next3.style.display = "none";
    next4.style.display = "none";
  } else {
    console.log("question completed");
    showResultbox();
  }
};
//accessed question and show question of profit.--------------------------------------------------
function showQuestionprofit(index) {
  const que_text = document.querySelector(".question");

  let que_tag =
    "<span>" + PROFIT[index].numb + ". " + PROFIT[index].question + "</span>";
  let option_tag =
    '<span class="option">' +
    PROFIT[index].options[0] +
    "</span>" +
    '<span class="option">' +
    PROFIT[index].options[1] +
    "</span>" +
    '<span class="option">' +
    PROFIT[index].options[2] +
    "</span>" +
    '<span class="option">' +
    PROFIT[index].options[3] +
    "</span>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelectedprofit(this)");
  }
}
//fucntion show the option of profits.------------------------------------------------------------------------------
function optionSelectedprofit(answer) {
  let userAns = answer.textContent;
  let correctAns = PROFIT[que_count].answer;
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
  //once user selected disabled all options---------------------------------------------
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next4.style.display = "block";
}
