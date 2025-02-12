const wordDisplay = document.getElementById('word');
const typingArea = document.getElementById('typingArea');
const highlightedWord = document.getElementById('highlightedWord'); // Added
const accuracyDisplay = document.getElementById('accuracy');
const wpmDisplay = document.getElementById('wpm');
const timeDisplay = document.getElementById('time');
const newWordButton = document.getElementById('newWord');
const difficultySelect = document.getElementById('difficulty'); // Added

let words = {
  easy: ["the", "and", "cat", "dog", "run", "sun", "sky", "day", "big", "red"],
  medium: ["programming", "javascript", "developer", "algorithm", "function", "computer", "internet", "network", "database", "security"],
  hard: ["pneumonoultramicroscopicsilicovolcanoconiosis", "sesquipedalianism", "uncharacteristically", "supercalifragilisticexpialidocious", "ambidextrously", "entrepreneurial", "constitutional", "responsibilities", "circumstantially", "acquaintances"]
};

let currentWordIndex = 0;
let startTime;
let correctChars = 0;
let totalChars = 0;
let currentDifficulty = "easy"; // Default difficulty

function newWord() {
  const wordList = words[currentDifficulty];
  currentWordIndex = Math.floor(Math.random() * wordList.length);
  wordDisplay.textContent = wordList[currentWordIndex];
  highlightedWord.innerHTML = ""; // Clear previous highlighting
  typingArea.value = "";
  typingArea.focus();
  startTime = null;
  correctChars = 0;
  totalChars = 0;
  accuracyDisplay.textContent = "";
  wpmDisplay.textContent = "";
  timeDisplay.textContent = "";
}

typingArea.addEventListener('input', () => {
  if (!startTime) {
    startTime = new Date().getTime();
  }

  const typedWord = typingArea.value;
  const currentWord = words[currentDifficulty][currentWordIndex];

  let highlightedText = "";
  correctChars = 0;

  for (let i = 0; i < currentWord.length; i++) {
    if (i < typedWord.length) {
      if (typedWord[i] === currentWord[i]) {
        highlightedText += `<span class="correct">${currentWord[i]}</span>`;
        correctChars++;
      } else {
        highlightedText += `<span class="incorrect">${currentWord[i]}</span>`;
      }
    } else {
      highlightedText += currentWord[i]; // Add remaining characters without styling
    }
  }

  highlightedWord.innerHTML = highlightedText;
  totalChars = typedWord.length;

  if (typedWord === currentWord) {
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    const wordsTyped = 1;

    const wpm = Math.round((wordsTyped / timeTaken) * 60);
    const accuracy = Math.round((correctChars / currentWord.length) * 100); // Use currentWord.length for correct accuracy

    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    wpmDisplay.textContent = `WPM: ${wpm}`;
    timeDisplay.textContent = `Time: ${timeTaken} seconds`;
    newWord();
  }
});

newWordButton.addEventListener('click', newWord);

difficultySelect.addEventListener('change', () => {
  currentDifficulty = difficultySelect.value;
  newWord(); // Generate a new word based on the selected difficulty
});

newWord();