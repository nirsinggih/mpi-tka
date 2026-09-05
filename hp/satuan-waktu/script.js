// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'konversi') {
    hitungKonversiWaktu();
  }
}

// Konversi dasar ke Detik (Base unit)
const toSecondsFactor = {
  detik: 1,
  menit: 60,
  jam: 3600,
  hari: 86400,
  pekan: 604800,       // 7 hari
  bulan: 2592000,      // Standar 30 hari
  tahun: 31536000      // Standar 365 hari
};

// Hitung Konversi Waktu
function hitungKonversiWaktu() {
  const val = parseFloat(document.getElementById('valInput').value);
  const from = document.getElementById('fromUnit').value;
  const to = document.getElementById('toUnit').value;

  const resultText = document.getElementById('resultText');
  const stepText = document.getElementById('stepText');

  if (isNaN(val) || val < 0) {
    resultText.innerText = '-';
    stepText.innerText = 'Masukkan angka waktu yang valid';
    return;
  }

  // Konversi ke Detik dulu
  const totalSeconds = val * toSecondsFactor[from];
  // Konversi dari Detik ke Target
  const finalVal = totalSeconds / toSecondsFactor[to];

  let explanation = "";

  if (from === to) {
    explanation = "Satuan sama, nilainya tidak berubah.";
  } else {
    explanation = `1 ${from} = ${toSecondsFactor[from] / toSecondsFactor[to]} ${to}`;
  }

  const formattedResult = Number.isInteger(finalVal) 
    ? finalVal.toLocaleString('id-ID') 
    : finalVal.toFixed(2).replace('.', ',');

  resultText.innerText = `${val} ${capitalizeFirst(from)} = ${formattedResult} ${capitalizeFirst(to)}`;
  stepText.innerText = explanation;
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// --- DATA KUIS ---
const questions = [
  {
    question: "1 jam terdiri dari berapa menit?",
    options: ["30 Menit", "60 Menit", "100 Menit", "3.600 Menit"],
    answer: 1
  },
  {
    question: "Ayah berolahraga selama 2 jam. Waktu tersebut sama dengan...",
    options: ["120 Menit", "90 Menit", "180 Menit", "200 Menit"],
    answer: 0
    // 2 * 60 = 120 menit
  },
  {
    question: "Siswa libur sekolah selama 2 pekan (minggu). Berapa harikah waktu libur tersebut?",
    options: ["10 Hari", "12 Hari", "14 Hari", "30 Hari"],
    answer: 2
    // 2 * 7 = 14 hari
  },
  {
    question: "Adik berusia 3 tahun. Usia adik dalam hitungan bulan adalah...",
    options: ["24 Bulan", "30 Bulan", "36 Bulan", "48 Bulan"],
    answer: 2
    // 3 * 12 = 36 bulan
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
    document.getElementById('quizFeedback').style.color = "#2ecc71";
    score += 100 / questions.length;
  } else {
    selectedBtn.classList.add('wrong');
    options[correctIndex].classList.add('correct');
    document.getElementById('quizFeedback').innerText = "Ups! Jawaban belum tepat. 😅";
    document.getElementById('quizFeedback').style.color = "#e74c3c";
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
    message = "Luar biasa! Kamu sudah sangat mahir menghitung konversi satuan waktu!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus latih pemahamanmu ya.";
  } else {
    message = "Jangan berkecil hati, pelajari lagi rangkuman materi dan coba lagi!";
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
