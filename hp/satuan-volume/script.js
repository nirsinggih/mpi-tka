// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'konversi') {
    hitungKonversi();
  }
}

// Urutan Satuan Volume
const units = ['kl', 'hl', 'dal', 'l', 'dl', 'cl', 'ml'];

// Hitung Konversi Volume
function hitungKonversi() {
  const val = parseFloat(document.getElementById('valInput').value);
  const from = document.getElementById('fromUnit').value;
  const to = document.getElementById('toUnit').value;

  const resultText = document.getElementById('resultText');
  const stepText = document.getElementById('stepText');

  if (isNaN(val)) {
    resultText.innerText = '-';
    stepText.innerText = 'Masukkan angka yang valid';
    return;
  }

  const fromIndex = units.indexOf(from);
  const toIndex = units.indexOf(to);
  const stepDiff = toIndex - fromIndex; // Positif = Turun, Negatif = Naik

  let finalVal = 0;
  let explanation = "";

  if (stepDiff > 0) {
    // Turun tangga (dikali)
    const factor = Math.pow(10, stepDiff);
    finalVal = val * factor;
    explanation = `Turun ${stepDiff} tangga, maka dikali ${factor.toLocaleString('id-ID')} (${val} × ${factor.toLocaleString('id-ID')})`;
  } else if (stepDiff < 0) {
    // Naik tangga (dibagi)
    const steps = Math.abs(stepDiff);
    const factor = Math.pow(10, steps);
    finalVal = val / factor;
    explanation = `Naik ${steps} tangga, maka dibagi ${factor.toLocaleString('id-ID')} (${val} ÷ ${factor.toLocaleString('id-ID')})`;
  } else {
    // Satuan sama
    finalVal = val;
    explanation = `Satuan sama, nilainya tetap.`;
  }

  // Format angka desimal jika ada koma
  const formattedResult = Number.isInteger(finalVal) ? finalVal.toLocaleString('id-ID') : finalVal.toString().replace('.', ',');
  resultText.innerText = `${val} ${from} = ${formattedResult} ${to}`;
  stepText.innerText = explanation;
}

// --- DATA KUIS ---
const questions = [
  {
    question: "1 liter (l) sama dengan berapa mililiter (ml)?",
    options: ["10 ml", "100 ml", "1.000 ml", "10.000 ml"],
    answer: 2
  },
  {
    question: "Jika kita NAIK satu tangga pada satuan volume liter, maka nilainya harus...",
    options: ["Dikali 10", "Dibagi 10", "Dikali 100", "Dibagi 1000"],
    answer: 1
  },
  {
    question: "Ibu membeli 2,5 liter minyak goreng. Berapa mililiter (ml) volume minyak goreng tersebut?",
    options: ["25 ml", "250 ml", "2.500 ml", "25.000 ml"],
    answer: 2
    // 2.5 * 1000 = 2500 ml
  },
  {
    question: "Sebuah botol berisi 500 ml air mineral. Nilai ini sama dengan...",
    options: ["5 liter", "0,5 liter", "0,05 liter", "50 liter"],
    answer: 1
    // 500 / 1000 = 0.5 liter
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
    message = "Luar biasa! Kamu sudah sangat menguasai konversi satuan volume!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus berlatih agar semakin paham.";
  } else {
    message = "Jangan patah semangat, pelajari lagi tangga batu volume dan coba lagi!";
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

// Inisialisasi awal saat dimuat
loadQuestion();
