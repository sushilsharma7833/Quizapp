const pipesandc = document.querySelector("#pc");
const next2 = document.querySelector("#next2");
const topic = document.querySelector(".title-bar");
//onclick of pipeandc the function will be executed.--------------------------------------------
pipesandc.onclick = () => {
  category.classList.remove("activeinfo");
  QuestionBox.classList.add("activeQuiz");
  showQuestionpipe(0);
  queCounter(1);
  topic.innerHTML = "PIPES AND CISTERN";
};

//if next button will display the question of pipe.---------------------------------------
next2.onclick = () => {
  if (que_count < PIPES.length - 1) {
    que_count++;
    que_numb++;
    showQuestionpipe(que_count);
    queCounter(que_numb);
    countdown();
    next_button.display = "none";
    next2.style.display = "none";
  } else {
    console.log("question completed");
    showResultbox();

    // user_Name_Input = user_Name;
    // showscore()
  }
};
//accessed question and show question of pipes.------------------------------------------------
function showQuestionpipe(index) {
  const que_text = document.querySelector(".question");

  let que_tag =
    "<span>" + PIPES[index].numb + ". " + PIPES[index].question + "</span>";
  let option_tag =
    '<span class="option">' +
    PIPES[index].options[0] +
    "</span>" +
    '<span class="option">' +
    PIPES[index].options[1] +
    "</span>" +
    '<span class="option">' +
    PIPES[index].options[2] +
    "</span>" +
    '<span class="option">' +
    PIPES[index].options[3] +
    "</span>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelectedpipe(this)");
  }
}
// change pipes questions-------------------------------------------------------------------
function optionSelectedpipe(answer) {
  let userAns = answer.textContent;
  let correctAns = PIPES[que_count].answer;
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
  //once user selected disabled all options------------------------------------------------------
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next2.style.display = "block";
}
