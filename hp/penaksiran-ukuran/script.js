// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'simulasi') {
    hitungTaksiran();
    generateNewGuess();
  }
}

// Map Satuan
const unitMap = {
  panjang: "cm",
  berat: "kg",
  volume: "ml",
  waktu: "menit"
};

// Hitung Taksiran Pembulatan
function hitungTaksiran() {
  const val = parseFloat(document.getElementById('valMeasured').value);
  const type = document.getElementById('measureType').value;
  const unit = unitMap[type];

  const taksiranVal = document.getElementById('taksiranVal');
  const taksiranStep = document.getElementById('taksiranStep');

  if (isNaN(val) || val < 0) {
    taksiranVal.innerText = `- ${unit}`;
    taksiranStep.innerText = "Masukkan angka pengukuran yang valid.";
    return;
  }

  const rounded = Math.round(val);
  const decimalPart = val - Math.floor(val);

  taksiranVal.innerText = `${rounded} ${unit}`;

  if (decimalPart === 0) {
    taksiranStep.innerText = `Nilai sudah bulat, hasil taksiran tetap ${rounded} ${unit}.`;
  } else if (decimalPart >= 0.5) {
    taksiranStep.innerText = `Karena bagian desimal (${decimalPart.toFixed(1)}) ≥ 0,5, maka dibulatkan ke ATAS menjadi ${rounded} ${unit}.`;
  } else {
    taksiranStep.innerText = `Karena bagian desimal (${decimalPart.toFixed(1)}) < 0,5, maka dibulatkan ke BAWAH menjadi ${rounded} ${unit}.`;
  }
}

// Game Tebak Penaksiran
let currentTargetVal = 0;
let correctAnswer = 0;

function generateNewGuess() {
  // Generate angka acak 10.1 - 49.9
  const raw = (Math.random() * 39 + 10).toFixed(1);
  currentTargetVal = parseFloat(raw);
  correctAnswer = Math.round(currentTargetVal);

  const floorVal = Math.floor(currentTargetVal);
  const ceilVal = Math.ceil(currentTargetVal);

  document.getElementById('randomValDisplay').innerText = `${currentTargetVal} cm`;
  document.getElementById('guessFeedback').innerText = '';

  const buttons = document.querySelectorAll('.guess-btn');
  buttons[0].innerText = `${floorVal} cm`;
  buttons[0].onclick = () => checkGuess(floorVal);

  buttons[1].innerText = `${ceilVal} cm`;
  buttons[1].onclick = () => checkGuess(ceilVal);
}

function checkGuess(guess) {
  const feedback = document.getElementById('guessFeedback');
  if (guess === correctAnswer) {
    feedback.innerText = "Tepat Sekali! 🎉 Jawaban kamu benar.";
    feedback.style.color = "#00b894";
  } else {
    feedback.innerText = `Kurang Tepat! 😅 Hasil pembulatan yang benar adalah ${correctAnswer} cm.`;
    feedback.style.color = "#ff7675";
  }
}

// --- DATA KUIS ---
const questions = [
  {
    question: "Hasil pengukuran panjang tali adalah 18,4 cm. Jika dibulatkan ke satuan terdekat, maka taksirannya adalah...",
    options: ["18 cm", "19 cm", "20 cm", "18,5 cm"],
    answer: 0
    // 18.4 dibulatkan ke bawah -> 18 cm
  },
  {
    question: "Ibu menimbang gula seberat 2,7 kg. Penaksiran berat gula tersebut ke kg terdekat adalah...",
    options: ["2 kg", "2,5 kg", "3 kg", "4 kg"],
    answer: 2
    // 2.7 dibulatkan ke atas -> 3 kg
  },
  {
    question: "Aturan pembulatan menyatakan jika angka desimal kurang dari 5, maka harus dibulatkan ke...",
    options: ["Atas", "Bawah", "Samping", "Satu"],
    answer: 1
  },
  {
    question: "Panjang sebuah krayon 9,5 cm. Hasil penaksiran panjang krayon tersebut adalah...",
    options: ["9 cm", "9,5 cm", "10 cm", "11 cm"],
    answer: 2
    // 0.5 dibulatkan ke atas -> 10 cm
  }
];

let currentQuestion = 0;
let score = 0;
let isAnswered = false;

function loadQuestion() {
  isAnswered = false;
  const q = questions[currentQuestion];
  
  document.getElementById('questionNum').innerText = `Soal ${currentQuestion + 1} dari ${questions.length}`;
  document.getElementById('questionText').innerText = q.question;
  document.getElementById('quizFeedback').innerText = '';
  document.getElementById('nextBtn').style.display = 'none';

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(index, btn);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, selectedBtn) {
  if (isAnswered) return;
  isAnswered = true;

  const correctIndex = questions[currentQuestion].answer;
  const options = document.querySelectorAll('.option-btn');

  if (selectedIndex === correctIndex) {
    selectedBtn.classList.add('correct');
    document.getElementById('quizFeedback').innerText = "Hebat! Jawaban kamu benar. 🎉";
    document.getElementById('quizFeedback').style.color = "#00b894";
    score += 100 / questions.length;
  } else {
    selectedBtn.classList.add('wrong');
    options[correctIndex].classList.add('correct');
    document.getElementById('quizFeedback').innerText = "Ups! Jawaban belum tepat. 😅";
    document.getElementById('quizFeedback').style.color = "#ff7675";
  }

  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('scoreContainer').style.display = 'block';
  
  const finalScore = Math.round(score);
  document.getElementById('finalScore').innerText = finalScore;

  let message = "";
  if (finalScore === 100) {
    message = "Luar biasa! Kamu sudah sangat mahir melakukan penaksiran dan pembulatan ukuran!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus berlatih agar semakin paham.";
  } else {
    message = "Jangan berkecil hati, pelajari lagi aturan pembulatan dan coba lagi!";
  }
  document.getElementById('scoreMessage').innerText = message;
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('scoreContainer').style.display = 'none';
  loadQuestion();
}

// Inisialisasi awal
loadQuestion();
