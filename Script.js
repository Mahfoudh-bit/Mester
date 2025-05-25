const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const playersScreen = document.getElementById("players-screen");
const loginScreen = document.getElementById("login-screen");
const gameScreen = document.getElementById("game-screen");
const playersInputs = document.getElementById("players-inputs");
const playerTurn = document.getElementById("player-turn");
const questionBox = document.getElementById("question");
const challengeBox = document.getElementById("challenge");
const scoreboard = document.getElementById("scoreboard");

let currentPlayer = 0;
let players = [];
let scores = {};
let usedIndices = [];

const questions = ["ما هو أكبر حلم تحقق لك حتى الآن؟", "ما هي اللحظة التي شعرت فيها بالسعادة المطلقة؟"];
const challenges = ["اقرأ ماتيسر من القرآن", "اعطني حكمة"];

function checkPassword() {
  const pass = passwordInput.value;
  if (pass === "mahfoudh/jemile") {
    loginScreen.classList.remove("active");
    playersScreen.classList.add("active");
    addPlayer(); addPlayer();
  } else {
    loginError.textContent = "كلمة المرور غير صحيحة";
  }
}

function addPlayer() {
  if (playersInputs.children.length >= 10) return;
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "اسم اللاعب";
  playersInputs.appendChild(input);
}

function startGame() {
  players = Array.from(playersInputs.children).map(input => input.value.trim()).filter(name => name);
  if (players.length < 2) {
    document.getElementById("players-error").textContent = "أدخل على الأقل اسمين.";
    return;
  }

  playersScreen.classList.remove("active");
  gameScreen.classList.add("active");
  players.forEach(name => scores[name] = 0);
  nextTurn();
}

function selectOption(type) {
  const player = players[currentPlayer];
  scores[player]++;
  updateScoreboard();
}

function skipTurn() {
  triggerEmojiEffect("😂");
  nextTurn();
}

function nextTurn() {
  if (usedIndices.length >= questions.length) {
    alert("انتهت الأسئلة والتحديات!");
    return;
  }

  currentPlayer = (currentPlayer + 1) % players.length;
  playerTurn.textContent = `دور: ${players[currentPlayer]}`;

  let idx;
  do {
    idx = Math.floor(Math.random() * questions.length);
  } while (usedIndices.includes(idx));
  usedIndices.push(idx);

  questionBox.textContent = questions[idx];
  challengeBox.textContent = challenges[idx];
}

function updateScoreboard() {
  scoreboard.innerHTML = "<h3>النقاط:</h3>" + players.map(p => `${p}: ${scores[p]}`).join(" | ");
}

function triggerEmojiEffect(symbol) {
  const container = document.getElementById("emoji-container");

  for (let i = 0; i < 15; i++) {
    const emoji = document.createElement("div");
    emoji.textContent = symbol;
    emoji.className = "emoji";

    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = "80vh";
    emoji.style.fontSize = (20 + Math.random() * 20) + "px";

    container.appendChild(emoji);

    setTimeout(() => {
      container.removeChild(emoji);
    }, 2000);
  }
    }
