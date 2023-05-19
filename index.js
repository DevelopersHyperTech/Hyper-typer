const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const timeAudio = document.getElementById("timeAudio");
const correctAudio = document.getElementById("correctAudio");
const overAudio = document.getElementById("overAudio");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let randomWord;

let score = 0;

let time = 10;

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
// place textCursor to input area
text.focus();

// Select difficulty value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Generate random word from arrray
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Add word to dom
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

const timeInterval = setInterval(() => {
  time--;
  if (time === 0) {
    // clear interval
    clearInterval(timeInterval);
    // end the game
    gameOver();
  }
  timeEl.innerHTML = time + "s";
}, 1000);

// You won
function youWon() {
  endgameEl.innerHTML = `
    <h1> You've made it 🎉 </h1>
    <button onclick = "location.reload()">Continue</button>
    `;
  endgameEl.style.display = "flex";
  addWordToDom();
  timeAudio.pause();
  updateScore();
}

// End Game
function gameOver() {
  endgameEl.innerHTML = `
      <h1>Game Over</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()" style="text-align: center;">Play again</button>
    `;

  endgameEl.style.display = "flex";
  timeAudio.pause();
  overAudio.play();
}

addWordToDom();

// Event Listeners

// Type events
text.addEventListener("input", function (e) {
  const insertedText = e.target.value;
  timeAudio.play();
  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    correctAudio.play();
    // clear text
    e.target.value = "";

    if (difficulty === "hard") {
      time += 1;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }
    if (score === 30) {
      youWon();
    }
  }
});

// Setting btn click events
settingsBtn.addEventListener("click", function () {
  settings.classList.toggle("hide");
});

// Select Settings
settingsForm.addEventListener("change", function (e) {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
