// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'simulasi') {
    updateAngleVisual();
    calcMissingAngle();
  }
}

// Update Visual SVG Sudut secara Dinamis
function updateAngleVisual() {
  const deg = parseInt(document.getElementById('angleSlider').value);
  document.getElementById('angleValText').innerText = `${deg}°`;

  // Tentukan Kategori Jenis Sudut
  const typeTag = document.getElementById('angleTypeText');
  if (deg < 90) {
    typeTag.innerText = "Sudut Lancip";
    typeTag.style.backgroundColor = "#81ecec";
  } else if (deg === 90) {
    typeTag.innerText = "Sudut Siku-Siku";
    typeTag.style.backgroundColor = "#ffeaa7";
  } else if (deg < 180) {
    typeTag.innerText = "Sudut Tumpul";
    typeTag.style.backgroundColor = "#ff7675";
    typeTag.style.color = "white";
  } else {
    typeTag.innerText = "Sudut Lurus";
    typeTag.style.backgroundColor = "#a29bfe";
    typeTag.style.color = "white";
  }

  // Hitung Titik Ujung Garis Sudut (Sistem Koordinat SVG: Center=100,100, r=80)
  const rad = (deg * Math.PI) / 180;
  const cx = 100;
  const cy = 100;
  const r = 70;

  const x2 = cx + r * Math.cos(-rad);
  const y2 = cy + r * Math.sin(-rad);

  const ray = document.getElementById('angleRay');
  ray.setAttribute('x2', x2);
  ray.setAttribute('y2', y2);

  // Hitung Busur Arc SVG
  const arcR = 30;
  const arcX = cx + arcR * Math.cos(-rad);
  const arcY = cy + arcR * Math.sin(-rad);
  const largeArcFlag = deg > 180 ? 1 : 0;

  const arcPath = `M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArcFlag} 0 ${arcX} ${arcY}`;
  document.getElementById('angleArc').setAttribute('d', arcPath);
}

// Hitung Sudut Segitiga yang Hilang
function calcMissingAngle() {
  let a = parseInt(document.getElementById('angleA').value) || 0;
  let b = parseInt(document.getElementById('angleB').value) || 0;

  if (a + b >= 180) {
    document.getElementById('missingAngleResult').innerHTML = `<span style="color:#ff7675;">Jumlah Sudut A + B harus kurang dari 180°!</span>`;
    return;
  }

  const c = 180 - (a + b);
  document.getElementById('missingAngleResult').innerHTML = `Sudut C = 180° - (${a}° + ${b}°) = <strong>${c}°</strong>`;
}

// --- DATA KUIS ---
const questions = [
  {
    question: "Sudut yang besarnya tepat 90° dinamakan sudut...",
    options: ["Lancip", "Siku-siku", "Tumpul", "Lurus"],
    answer: 1
  },
  {
    question: "Suatu sudut memiliki besar 125°. Jenis sudut tersebut adalah...",
    options: ["Sudut Lancip", "Sudut Siku-siku", "Sudut Tumpul", "Sudut Lurus"],
    answer: 2
  },
  {
    question: "Jumlah seluruh sudut bagian dalam sebuah segitiga adalah...",
    options: ["90°", "180°", "270°", "360°"],
    answer: 1
  },
  {
    question: "Dua sudut dalam sebuah segitiga besarnya adalah 50° dan 70°. Besar sudut ketiga adalah...",
    options: ["50°", "60°", "70°", "90°"],
    answer: 1
    // 180 - (50 + 70) = 60°
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
    message = "Luar biasa! Kamu sudah paham betul jenis dan pengukuran besar sudut!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus latih pemahamanmu ya.";
  } else {
    message = "Jangan berkecil hati, pelajari lagi jenis-jenis sudut dan coba lagi!";
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
