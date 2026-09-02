// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'bandingkan') {
    compareFractions();
  } else if (tabId === 'urutkan') {
    renderRawList();
  }
}

// --- LOGIKA SIMULASI MEMBANDINGKAN ---
function renderBar(containerId, num, den, isAlt = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  num = Math.max(0, Math.min(num, den));
  
  for (let i = 0; i < den; i++) {
    const seg = document.createElement('div');
    seg.className = 'bar-segment';
    if (i < num) {
      seg.classList.add(isAlt ? 'active-alt' : 'active');
    }
    container.appendChild(seg);
  }
}

function compareFractions() {
  let num1 = parseInt(document.getElementById('num1').value) || 1;
  let den1 = parseInt(document.getElementById('den1').value) || 1;
  let num2 = parseInt(document.getElementById('num2').value) || 1;
  let den2 = parseInt(document.getElementById('den2').value) || 1;

  // Koreksi nilai batas
  if (num1 > den1) { num1 = den1; document.getElementById('num1').value = num1; }
  if (num2 > den2) { num2 = den2; document.getElementById('num2').value = num2; }

  renderBar('bar1', num1, den1, false);
  renderBar('bar2', num2, den2, true);

  const cross1 = num1 * den2;
  const cross2 = num2 * den1;

  const symElem = document.getElementById('symResult');
  const stepText = document.getElementById('stepText');

  if (cross1 > cross2) {
    symElem.innerText = '>';
    stepText.innerHTML = `Hasil kali silang: <strong>${cross1}</strong> (${num1}×${den2}) &gt; <strong>${cross2}</strong> (${num2}×${den1})<br>Maka <sup>${num1}</sup>/<sub>${den1}</sub> <strong>lebih besar</strong> dari <sup>${num2}</sup>/<sub>${den2}</sub>`;
  } else if (cross1 < cross2) {
    symElem.innerText = '<';
    stepText.innerHTML = `Hasil kali silang: <strong>${cross1}</strong> (${num1}×${den2}) &lt; <strong>${cross2}</strong> (${num2}×${den1})<br>Maka <sup>${num1}</sup>/<sub>${den1}</sub> <strong>lebih kecil</strong> dari <sup>${num2}</sup>/<sub>${den2}</sub>`;
  } else {
    symElem.innerText = '=';
    stepText.innerHTML = `Hasil kali silang: <strong>${cross1}</strong> = <strong>${cross2}</strong><br>Kedua pecahan bernilai <strong>sama besar</strong>!`;
  }
}

// --- LOGIKA SIMULASI MENGURUTKAN ---
let currentFractions = [
  { num: 1, den: 2 },
  { num: 3, den: 4 },
  { num: 2, den: 5 }
];

function renderRawList() {
  const txt = currentFractions.map(f => `<sup>${f.num}</sup>/<sub>${f.den}</sub>`).join(' , ');
  document.getElementById('rawListDisplay').innerHTML = txt;
  document.getElementById('sortedContainer').innerHTML = '';
}

function generateRandomSort() {
  const dens = [2, 3, 4, 5, 6, 8, 10];
  currentFractions = [];
  for (let i = 0; i < 3; i++) {
    const den = dens[Math.floor(Math.random() * dens.length)];
    const num = Math.floor(Math.random() * (den - 1)) + 1;
    currentFractions.push({ num, den });
  }
  renderRawList();
}

function sortFractions(direction) {
  let list = [...currentFractions];
  list.sort((a, b) => {
    const valA = a.num / a.den;
    const valB = b.num / b.den;
    return direction === 'asc' ? valA - valB : valB - valA;
  });

  const container = document.getElementById('sortedContainer');
  container.innerHTML = `<p style="font-weight:bold; margin-bottom:8px;">Hasil Urutan (${direction === 'asc' ? 'Terkecil ➔ Terbesar' : 'Terbesar ➔ Terkecil'}):</p>`;

  list.forEach((f, idx) => {
    const valPerc = Math.round((f.num / f.den) * 100);
    const div = document.createElement('div');
    div.className = 'sort-item';
    div.innerHTML = `
      <div>
        <strong>Urutan ${idx + 1}:</strong> 
        <span class="val"><sup>${f.num}</sup>/<sub>${f.den}</sub></span>
      </div>
      <div style="font-size:0.85rem; color:#777;">Nilai: ${valPerc}%</div>
    `;
    container.appendChild(div);
  });
}

// --- DATA KUIS ---
const questions = [
  {
    question: "Tanda perbandingan yang tepat untuk 3/7 ... 5/7 adalah...",
    options: [">", "<", "=", "≥"],
    answer: 1
  },
  {
    question: "Bandingkan dua pecahan berikut: 2/3 ... 1/4",
    options: ["2/3 < 1/4", "2/3 = 1/4", "2/3 > 1/4", "Tidak dapat dibandingkan"],
    answer: 2
  },
  {
    question: "Urutan pecahan 1/2, 1/4, 3/4 dari yang TERKECIL ke TERBESAR adalah...",
    options: [
      "3/4, 1/2, 1/4",
      "1/4, 1/2, 3/4",
      "1/2, 1/4, 3/4",
      "1/4, 3/4, 1/2"
    ],
    answer: 1
  },
  {
    question: "Manakah pernyataan di bawah ini yang BENAR?",
    options: [
      "2/5 > 4/5",
      "1/3 > 1/2",
      "3/6 = 1/2",
      "3/4 < 2/4"
    ],
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
    document.getElementById('quizFeedback').innerText = "Luar biasa! Jawaban kamu benar. 🎉";
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
    message = "Sempurna! Kamu sudah sangat mahir membandingkan dan mengurutkan pecahan!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus latih pemahamanmu ya.";
  } else {
    message = "Jangan patah semangat, pelajari lagi materi perkalian silang dan coba lagi!";
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
