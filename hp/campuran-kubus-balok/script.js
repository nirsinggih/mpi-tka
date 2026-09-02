// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Simulasi Hitung Volume Gabungan
function hitungVolumeGabungan() {
  const s = parseFloat(document.getElementById('rusukInput').value);
  const p = parseFloat(document.getElementById('panjangInput').value);
  const l = parseFloat(document.getElementById('lebarInput').value);
  const t = parseFloat(document.getElementById('tinggiInput').value);

  const v1Calc = document.getElementById('v1Calc');
  const v2Calc = document.getElementById('v2Calc');
  const hasilTotalCalc = document.getElementById('hasilTotalCalc');

  if (isNaN(s) || isNaN(p) || isNaN(l) || isNaN(t) || s <= 0 || p <= 0 || l <= 0 || t <= 0) {
    v1Calc.innerText = '0';
    v2Calc.innerText = '0';
    hasilTotalCalc.innerText = '0';
    return;
  }

  const vKubus = Math.pow(s, 3);
  const vBalok = p * l * t;
  const vTotal = vKubus + vBalok;

  v1Calc.innerText = vKubus.toLocaleString('id-ID');
  v2Calc.innerText = vBalok.toLocaleString('id-ID');
  hasilTotalCalc.innerText = vTotal.toLocaleString('id-ID');
}

// Data Kuis Gabungan
const questions = [
  {
    question: "Langkah pertama yang tepat dalam menghitung volume bangun ruang gabungan adalah...",
    options: [
      "Membagi bangun gabungan menjadi beberapa bagian sederhana",
      "Langsung mengalikan semua angka yang ada",
      "Mengurangi volume bangun terbesar dengan yang terkecil",
      "Menghitung keliling alasnya terlebih dahulu"
    ],
    answer: 0
  },
  {
    question: "Sebuah kubus (rusuk 3 cm) digabungkan dengan balok (p=5 cm, l=3 cm, t=4 cm). Berapakah volume totalnya?",
    options: ["60 cm³", "87 cm³", "27 cm³", "90 cm³"],
    answer: 1
    // Pembahasan: V_kubus = 3³ = 27, V_balok = 5×3×4 = 60. Total = 87 cm³
  },
  {
    question: "Sebuah akuarium gabungan terdiri dari dua bagian: Balok besar bervolume 500 cm³ dan Kubus kecil di atasnya bervolume 125 cm³. Volume total akuarium tersebut adalah...",
    options: ["375 cm³", "600 cm³", "625 cm³", "1.000 cm³"],
    answer: 2
    // Pembahasan: 500 + 125 = 625 cm³
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
    document.getElementById('quizFeedback').innerText = "Luar biasa! Jawaban kamu benar. 🎉";
    document.getElementById('quizFeedback').style.color = "#34C759";
    score += 100 / questions.length;
  } else {
    selectedBtn.classList.add('wrong');
    options[correctIndex].classList.add('correct');
    document.getElementById('quizFeedback').innerText = "Kurang tepat, pelajari lagi penjumlahannya ya! 😅";
    document.getElementById('quizFeedback').style.color = "#FF3B30";
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
    message = "Hebat sekali! Kamu sudah menguasai volume gabungan kubus dan balok!";
  } else if (finalScore >= 60) {
    message = "Bagus! Sedikit latihan lagi kamu pasti bisa dapat nilai sempurna.";
  } else {
    message = "Jangan menyerah, baca kembali materi dan coba lagi ya!";
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

// Inisialisasi Kuis saat halaman dimuat
loadQuestion();
