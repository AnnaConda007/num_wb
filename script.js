let secretNumber;
let attempts = 0;
let range = 100;
const hints = document.querySelector(".hints");
const userGuess = document.querySelector(".userGuess");
const restartButton = document.querySelector(".restartButton");
const attemptCount = document.querySelector(".attemptCount");
const guessButton = document.querySelector(".guessButton");
const setRangeButton = document.querySelector(".setRangeButton");

const generateSecretNumber = () => {
  secretNumber = Math.floor(Math.random() * range) + 1;
  attempts = 0;
  updateAtempt();
};

const updateAtempt = () => {
  attemptCount.textContent = `Количество попыток: ${attempts}`;
};

const setRange = () => {
  let userRange = prompt(
    "Введите максимальное число диапазона (от 10 до 1000):",
    100
  );
  userRange = parseInt(userRange);
  if (!isNaN(userRange) && userRange >= 10 && userRange <= 1000) {
    range = userRange;
    document.getElementById(
      "setRangeButton"
    ).textContent = `Изменить диапазон (текущий: 1-${range})`;
    generateSecretNumber();
  } else {
    alert("Некорректный ввод! Пожалуйста, введите число от 10 до 1000.");
  }
};

const checkCurentNum = () => {
  const curentNum = parseInt(userGuess.value);
  if (curentNum < 1 || curentNum > range) {
    return;
  }
  attempts++;
  if (curentNum === secretNumber) {
    hints.textContent = `Вы угадали число с ${attempts} попытки.`;
    restartButton.style.display = "block";
  } else {
    let hint = curentNum > secretNumber ? "Слишком много" : "Слишком мало";
    if (attempts % 3 === 0) {
      hint += ` Подсказка: число ${
        secretNumber % 2 === 0 ? "четное." : "нечетное."
      }`;
    }
    hints.textContent = hint;
  }
  updateAtempt();
};

const restartGame = () => {
  generateSecretNumber();
};

guessButton.addEventListener("click", checkCurentNum);
restartButton.addEventListener("click", restartGame);
setRangeButton.addEventListener("click", setRange);
userGuess.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkCurentNum();
  }
});

generateSecretNumber();
