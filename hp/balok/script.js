// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Simulasi Hitung Volume Balok
function hitungVolumeBalok() {
  const p = parseFloat(document.getElementById('panjangInput').value);
  const l = parseFloat(document.getElementById('lebarInput').value);
  const t = parseFloat(document.getElementById('tinggiInput').value);

  if (isNaN(p) || isNaN(l) || isNaN(t) || p <= 0 || l <= 0 || t <= 0) {
    document.getElementById('prosesCalc').innerText = '-';
    document.getElementById('hasilCalc').innerText = '0';
    return;
  }

  const volume = p * l * t;
  document.getElementById('prosesCalc').innerText = `${p} × ${l} × ${t}`;
  document.getElementById('hasilCalc').innerText = volume.toLocaleString('id-ID');
}

// Data Kuis Balok
const questions = [
  {
    question: "Rumus untuk menghitung volume balok adalah...",
    options: ["p + l + t", "p × l × t", "s × s × s", "2 × (p + l)"],
    answer: 1
  },
  {
    question: "Sebuah balok memiliki panjang 10 cm, lebar 4 cm, dan tinggi 3 cm. Berapakah volumenya?",
    options: ["120 cm³", "70 cm³", "30 cm³", "17 cm³"],
    answer: 0
  },
  {
    question: "Jika volume balok adalah 200 cm³, panjangnya 10 cm, dan lebarnya 5 cm, berapakah tingginya?",
    options: ["2 cm", "4 cm", "5 cm", "8 cm"],
    answer: 1
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
    document.getElementById('quizFeedback').style.color = "#34C759";
    score += 100 / questions.length;
  } else {
    selectedBtn.classList.add('wrong');
    options[correctIndex].classList.add('correct');
    document.getElementById('quizFeedback').innerText = "Ups! Jawaban belum tepat. 😅";
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
    message = "Sempurna! Kamu paham betul materi volume balok ini.";
  } else if (finalScore >= 60) {
    message = "Bagus! Terus latih pemahamanmu ya.";
  } else {
    message = "Jangan berkecil hati, pelajari lagi materinya dan coba lagi!";
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

// Inisialisasi saat dimuat
loadQuestion();
