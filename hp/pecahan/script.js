// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'simulasi') {
    renderFractions();
  }
}

// Generasi Batang Visual Pecahan
function createFractionBar(containerId, num, den) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  // Validasi nilai batas
  num = Math.max(0, Math.min(num, den));
  
  for (let i = 0; i < den; i++) {
    const seg = document.createElement('div');
    seg.className = 'bar-segment';
    if (i < num) {
      seg.classList.add('active');
    }
    container.appendChild(seg);
  }
}

// Simulasi Pembanding Pecahan
function renderFractions() {
  let numA = parseInt(document.getElementById('numA').value) || 1;
  let denA = parseInt(document.getElementById('denA').value) || 2;
  let numB = parseInt(document.getElementById('numB').value) || 2;
  let denB = parseInt(document.getElementById('denB').value) || 4;

  // Koreksi batas masukan
  if (numA > denA) { numA = denA; document.getElementById('numA').value = numA; }
  if (numB > denB) { numB = denB; document.getElementById('numB').value = numB; }

  document.getElementById('displayFracA').innerText = `${numA} / ${denA}`;
  document.getElementById('displayFracB').innerText = `${numB} / ${denB}`;

  createFractionBar('barA', numA, denA);
  createFractionBar('barB', numB, denB);

  // Cek apakah senilai (A/B == C/D -> A*D == B*C)
  const isEquivalent = (numA * denB) === (numB * denA);
  const resultBox = document.getElementById('comparisonResult');

  if (isEquivalent) {
    resultBox.style.borderLeftColor = "#00b894";
    resultBox.style.backgroundColor = "#e6f9f5";
    resultBox.innerHTML = `
      <h3 style="color:#00b894;">Status: SENILAI 🎉</h3>
      <p>Pecahan <strong>${numA}/${denA}</strong> dan <strong>${numB}/${denB}</strong> bernilai sama besar!</p>
    `;
  } else {
    resultBox.style.borderLeftColor = "#ff7675";
    resultBox.style.backgroundColor = "#ffeaa7";
    resultBox.innerHTML = `
      <h3 style="color:#d63031;">Status: TIDAK SENILAI ❌</h3>
      <p>Luas daerah yang diarsir berbeda ukurannya.</p>
    `;
  }
}

// Data Kuis Pecahan Senilai
const questions = [
  {
    question: "Manakah di bawah ini pecahan yang SENILAI dengan 1/2 ?",
    options: ["2/3", "2/4", "3/4", "1/4"],
    answer: 1
  },
  {
    question: "Jika pembilang dan penyebut dari 2/3 dikalikan dengan angka 3, maka pecahan senilainya adalah...",
    options: ["4/6", "5/6", "6/9", "6/12"],
    answer: 2
    // Pembahasan: (2x3)/(3x3) = 6/9
  },
  {
    question: "Pecahan 4/8 jika disederhanakan (dibagi dengan angka yang sama) akan senilai dengan...",
    options: ["1/2", "1/3", "2/3", "3/4"],
    answer: 0
    // Pembahasan: 4/8 = (4:4)/(8:4) = 1/2
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
    message = "Luar biasa! Kamu sudah sangat paham materi pecahan senilai!";
  } else if (finalScore >= 60) {
    message = "Bagus! Terus berlatih agar semakin paham ya.";
  } else {
    message = "Jangan berkecil hati, pelajari lagi gambarnya dan coba lagi!";
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
