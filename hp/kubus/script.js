// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Simulasi Hitung Volume
function hitungVolume() {
  const input = document.getElementById('rusukInput').value;
  const s = parseFloat(input);

  if (isNaN(s) || s <= 0) {
    document.getElementById('prosesCalc').innerText = '-';
    document.getElementById('hasilCalc').innerText = '0';
    return;
  }

  const volume = Math.pow(s, 3);
  document.getElementById('prosesCalc').innerText = `${s} × ${s} × ${s}`;
  document.getElementById('hasilCalc').innerText = volume.toLocaleString('id-ID');
}

// Data Kuis
const questions = [
  {
    question: "Sebuah kubus memiliki panjang rusuk 4 cm. Berapakah volume kubus tersebut?",
    options: ["16 cm³", "36 cm³", "64 cm³", "81 cm³"],
    answer: 2
  },
  {
    question: "Jika volume sebuah kubus adalah 27 cm³, berapa panjang rusuknya?",
    options: ["3 cm", "6 cm", "9 cm", "12 cm"],
    answer: 0
  },
  {
    question: "Rumus untuk menghitung volume kubus dengan rusuk (s) adalah...",
    options: ["s × s", "6 × s", "s × s × s", "2 × s × s"],
    answer: 2
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
    message = "Sempurna! Kamu sudah sangat paham materi ini.";
  } else if (finalScore >= 60) {
    message = "Bagus! Terus tingkatkan latihanmu ya.";
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

// Inisialisasi Kuis saat halaman dimuat
loadQuestion();
