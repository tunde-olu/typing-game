// const api = "https://random-word-api.herokuapp.com/all"

import words from "./words.js"


const get = (selection) => {
  const element = document.getElementById(selection);
  if (element) {
    return element;
  } else {
    throw new Error(`no element with the id "${selection}"`);
  }
};

const word = get("word");
const text = get("text");
const scoreEl = get("score");
const timeEl = get("time");
const endGameEl = get("end-game-container");
const settingsBtn = get("settings-btn");
const settingsForm = get("settings-form");
const settings = get("settings");
const difficultySelect = get("difficulty");


let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

// Focus on the text input
text.focus();

// score interval load
const timeInterval = setInterval(updateTime, 1000);


// Add randomw word to DOM
function addToDOM() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerText = randomWord;
}
// update score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}
// game end
function gameEnd() {
  endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="window.location.reload()">Reload</button>
        `;
  endGameEl.style.display = "flex";
}
// update time
function updateTime() {
  time--;
  timeEl.textContent = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameEnd();
  }
}
// init
addToDOM();

// Event Listener
text.addEventListener("input", function (e) {
  const value = e.target.value;
  if (value === randomWord) {
    addToDOM();
    updateScore();
    text.value = "";
    if (difficulty === "hard") {
      time += 3;
    } else if (difficulty === "medium") {
      time += 4;
    } else {
      time += 5;
    }
  }
});
// Toggle settings tab
settingsBtn.addEventListener("click", function () {
  settings.classList.toggle("hide");
});
// Change difficulty settings
settingsForm.addEventListener("change", function (e) {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});