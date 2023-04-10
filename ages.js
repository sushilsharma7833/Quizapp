const ages = document.querySelector("#pa");
const next3 = document.querySelector("#next3");
const categorynames = document.querySelector(".title-bar");
//onclick age  function will be executes.-------------------------------------------------------
ages.onclick = () => {
  category.classList.remove("activeinfo");
  QuestionBox.classList.add("activeQuiz");
  showQuestionages(0);
  queCounter(1);
  categorynames.innerHTML = "PROBLEMS ON AGES";
};

//if next button is clicked.then how the ages question.------------------------------------------------
next3.onclick = () => {
  if (que_count < AGES.length - 1) {
    que_count++;
    que_numb++;
    showQuestionages(que_count);
    queCounter(que_numb);
    countdown();
    next_button.display = "none";
    next2.style.display = "none";
    next3.style.display = "none";
  } else {
    console.log("question completed");
    showResultbox();
  }
};
//function show the ages related question.-----------------------------------------------------------------------
function showQuestionages(index) {
  const que_text = document.querySelector(".question");

  let que_tag =
    "<span>" + AGES[index].numb + ". " + AGES[index].question + "</span>";
  let option_tag =
    '<span class="option">' +
    AGES[index].options[0] +
    "</span>" +
    '<span class="option">' +
    AGES[index].options[1] +
    "</span>" +
    '<span class="option">' +
    AGES[index].options[2] +
    "</span>" +
    '<span class="option">' +
    AGES[index].options[3] +
    "</span>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelectedages(this)");
  }
}
//function executes the option of ages.--------------------------------------------------------
function optionSelectedages(answer) {
  let userAns = answer.textContent;
  let correctAns = AGES[que_count].answer;
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
    //if answer is incorrect then automatically  selected the correct answer.-----------
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
  }
  attempt++;
  //once user selected disabled all option--------------------------------------
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next3.style.display = "block";
}
