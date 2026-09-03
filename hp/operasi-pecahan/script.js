// Helper fungsi FPB & KPK
function getFPB(a, b) {
  return b === 0 ? a : getFPB(b, a % b);
}

function getKPK(a, b) {
  return (a * b) / getFPB(a, b);
}

// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'simulasi') {
    renderCalculatorForm();
  }
}

// Render Form Kalkulator Sesuai Jenis Operasi
function renderCalculatorForm() {
  const type = document.getElementById('opType').value;
  const container = document.getElementById('calcInputsContainer');
  document.getElementById('calcResultBox').style.display = 'none';

  if (type === 'add' || type === 'sub') {
    const sign = type === 'add' ? '+' : '-';
    container.innerHTML = `
      <div class="frac-row">
        <div class="frac-input">
          <input type="number" id="numA" value="1" min="1">
          <div class="frac-line"></div>
          <input type="number" id="denA" value="4" min="1">
        </div>
        <div class="operator-sign">${sign}</div>
        <div class="frac-input">
          <input type="number" id="numB" value="1" min="1">
          <div class="frac-line"></div>
          <input type="number" id="denB" value="2" min="1">
        </div>
      </div>
    `;
  } else if (type === 'mul') {
    container.innerHTML = `
      <div class="frac-row">
        <div class="single-input">
          <input type="number" id="intVal" value="3" min="1">
        </div>
        <div class="operator-sign">×</div>
        <div class="frac-input">
          <input type="number" id="numA" value="2" min="1">
          <div class="frac-line"></div>
          <input type="number" id="denA" value="7" min="1">
        </div>
      </div>
    `;
  } else if (type === 'div') {
    container.innerHTML = `
      <div class="frac-row">
        <div class="frac-input">
          <input type="number" id="numA" value="3" min="1">
          <div class="frac-line"></div>
          <input type="number" id="denA" value="4" min="1">
        </div>
        <div class="operator-sign">÷</div>
        <div class="single-input">
          <input type="number" id="intVal" value="2" min="1">
        </div>
      </div>
    `;
  }
}

// Hitung Langkah Demi Langkah
function hitLangkahOperasi() {
  const type = document.getElementById('opType').value;
  const resultBox = document.getElementById('calcResultBox');
  const details = document.getElementById('stepDetails');
  resultBox.style.display = 'block';

  if (type === 'add' || type === 'sub') {
    const numA = parseInt(document.getElementById('numA').value) || 1;
    const denA = parseInt(document.getElementById('denA').value) || 1;
    const numB = parseInt(document.getElementById('numB').value) || 1;
    const denB = parseInt(document.getElementById('denB').value) || 1;
    const sign = type === 'add' ? '+' : '-';

    const kpk = getKPK(denA, denB);
    const newNumA = numA * (kpk / denA);
    const newNumB = numB * (kpk / denB);
    const resNum = type === 'add' ? (newNumA + newNumB) : (newNumA - newNumB);

    if (resNum < 0) {
      details.innerHTML = `<p style="color:#e74c3c;">Hasil bernilai negatif. Mohon masukkan angka pecahan pertama yang lebih besar.</p>`;
      return;
    }

    const fpb = getFPB(Math.abs(resNum), kpk);
    const simNum = resNum / fpb;
    const simDen = kpk / fpb;

    details.innerHTML = `
      <p>1. Cari KPK dari penyebut (${denA} dan ${denB}) = <strong>${kpk}</strong></p>
      <p>2. Ubah pecahan menjadi penyebut sama:<br>
         <sup>${newNumA}</sup>/<sub>${kpk}</sub> ${sign} <sup>${newNumB}</sup>/<sub>${kpk}</sub>
      </p>
      <p>3. Hitung pembilang:<br>
         <sup>(${newNumA} ${sign} ${newNumB})</sup>/<sub>${kpk}</sub> = <strong><sup>${resNum}</sup>/<sub>${kpk}</sub></strong>
      </p>
      ${fpb > 1 ? `<p>4. Sederhanakan (dibagi ${fpb}): <strong><sup>${simNum}</sup>/<sub>${simDen}</sub></strong></p>` : ''}
    `;
  } else if (type === 'mul') {
    const intVal = parseInt(document.getElementById('intVal').value) || 1;
    const numA = parseInt(document.getElementById('numA').value) || 1;
    const denA = parseInt(document.getElementById('denA').value) || 1;

    const resNum = intVal * numA;
    const fpb = getFPB(resNum, denA);
    const simNum = resNum / fpb;
    const simDen = denA / fpb;

    details.innerHTML = `
      <p>1. Kalikan bilangan asli dengan pembilang:<br>
         <sup>(${intVal} × ${numA})</sup>/<sub>${denA}</sub>
      </p>
      <p>2. Hasil perkalian: <strong><sup>${resNum}</sup>/<sub>${denA}</sub></strong></p>
      ${fpb > 1 ? `<p>3. Sederhanakan (dibagi ${fpb}): <strong><sup>${simNum}</sup>/<sub>${simDen}</sub></strong></p>` : ''}
    `;
  } else if (type === 'div') {
    const numA = parseInt(document.getElementById('numA').value) || 1;
    const denA = parseInt(document.getElementById('denA').value) || 1;
    const intVal = parseInt(document.getElementById('intVal').value) || 1;

    const resDen = denA * intVal;
    const fpb = getFPB(numA, resDen);
    const simNum = numA / fpb;
    const simDen = resDen / fpb;

    details.innerHTML = `
      <p>1. Kalikan penyebut dengan bilangan asli pembagi:<br>
         <sup>${numA}</sup>/<sub>(${denA} × ${intVal})</sub>
      </p>
      <p>2. Hasil pembagian: <strong><sup>${numA}</sup>/<sub>${resDen}</sub></strong></p>
      ${fpb > 1 ? `<p>3. Sederhanakan (dibagi ${fpb}): <strong><sup>${simNum}</sup>/<sub>${simDen}</sub></strong></p>` : ''}
    `;
  }
}

// --- DATA KUIS ---
const questions = [
  {
    question: "Hasil dari 1/5 + 2/5 adalah...",
    options: ["3/10", "3/5", "2/25", "1/5"],
    answer: 1
  },
  {
    question: "Hasil dari 3/4 - 1/2 adalah...",
    options: ["2/2", "1/4", "2/4", "1/2"],
    answer: 1
    // 3/4 - 2/4 = 1/4
  },
  {
    question: "Hasil perkalian 4 × 2/9 adalah...",
    options: ["8/36", "8/9", "6/9", "2/9"],
    answer: 1
  },
  {
    question: "Ibu membagi 1/2 bagian kue secara merata kepada 2 orang anaknya. Bagian yang diterima setiap anak adalah...",
    options: ["1/4 bagian", "2/2 bagian", "1/2 bagian", "3/4 bagian"],
    answer: 0
    // 1/2 ÷ 2 = 1/4
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
    message = "Luar biasa! Kamu sudah paham betul operasi pecahan!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus latih pemahamanmu ya.";
  } else {
    message = "Jangan berkecil hati, pelajari langkah-langkah di menu Kalkulator dan coba lagi!";
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
