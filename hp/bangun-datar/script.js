// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'kalkulator') {
    renderCalcForm();
  }
}

// Data Bangun Datar
const shapeData = {
  persegi: {
    title: "Persegi",
    sifat: ["Memiliki 4 sisi sama panjang.", "Memiliki 4 sudut siku-siku (90°).", "Memiliki 2 diagonal sama panjang."],
    luas: "L = s × s",
    keliling: "K = 4 × s"
  },
  persegiPanjang: {
    title: "Persegi Panjang",
    sifat: ["Sisi yang berhadapan sama panjang dan sejajar.", "Memiliki 4 sudut siku-siku (90°).", "Memiliki 2 diagonal sama panjang."],
    luas: "L = p × l",
    keliling: "K = 2 × (p + l)"
  },
  segitiga: {
    title: "Segitiga",
    sifat: ["Memiliki 3 sisi dan 3 titik sudut.", "Jumlah seluruh sudutnya adalah 180°."],
    luas: "L = ½ × a × t",
    keliling: "K = s1 + s2 + s3"
  },
  lingkaran: {
    title: "Lingkaran",
    sifat: ["Memiliki 1 sisi lengkung.", "Memiliki simetri lipat dan putar tak terhingga.", "Jarak titik pusat ke tepi selalu sama (jari-jari)."],
    luas: "L = π × r²",
    keliling: "K = 2 × π × r (atau K = π × d)"
  },
  jajarGenjang: {
    title: "Jajar Genjang",
    sifat: ["Sisi yang berhadapan sejajar dan sama panjang.", "Sudut yang berhadapan sama besar."],
    luas: "L = a × t",
    keliling: "K = 2 × (a + b)"
  },
  trapesium: {
    title: "Trapesium",
    sifat: ["Memiliki sepasang sisi yang sejajar.", "Jumlah sudut yang berdekatan di antara dua sisi sejajar adalah 180°."],
    luas: "L = ½ × (a + b) × t",
    keliling: "K = s1 + s2 + s3 + s4"
  }
};

// Tampilkan Detail Bangun Datar
function showShapeDetail(key) {
  const btns = document.querySelectorAll('.shape-btn');
  btns.forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const data = shapeData[key];
  const container = document.getElementById('shapeDetailCard');

  let sifatList = data.sifat.map(s => `<li>${s}</li>`).join('');

  container.innerHTML = `
    <h2>${data.title}</h2>
    <div class="shape-preview-box">
      <div class="visual-shape ${key}"></div>
    </div>
    <div class="rule-box">
      <strong>Sifat-sifat:</strong>
      <ul style="margin-left: 18px; margin-top: 5px;">
        ${sifatList}
      </ul>
    </div>
    <div class="formula-box">
      <p><strong>Rumus Luas:</strong> ${data.luas}</p>
      <p><strong>Rumus Keliling:</strong> ${data.keliling}</p>
    </div>
  `;
}

// Render Form Kalkulator Dinamis
function renderCalcForm() {
  const shape = document.getElementById('calcShapeSelect').value;
  const container = document.getElementById('calcInputsContainer');

  if (shape === 'persegi') {
    container.innerHTML = `
      <div class="input-group">
        <label for="valSisi">Panjang Sisi (s):</label>
        <input type="number" id="valSisi" value="5" min="1" oninput="hitungLuasKeliling()">
      </div>
    `;
  } else if (shape === 'persegiPanjang') {
    container.innerHTML = `
      <div class="input-group">
        <label for="valPanjang">Panjang (p):</label>
        <input type="number" id="valPanjang" value="8" min="1" oninput="hitungLuasKeliling()">
      </div>
      <div class="input-group">
        <label for="valLebar">Lebar (l):</label>
        <input type="number" id="valLebar" value="4" min="1" oninput="hitungLuasKeliling()">
      </div>
    `;
  } else if (shape === 'segitiga') {
    container.innerHTML = `
      <div class="input-group">
        <label for="valAlas">Alas (a):</label>
        <input type="number" id="valAlas" value="6" min="1" oninput="hitungLuasKeliling()">
      </div>
      <div class="input-group">
        <label for="valTinggi">Tinggi (t):</label>
        <input type="number" id="valTinggi" value="8" min="1" oninput="hitungLuasKeliling()">
      </div>
    `;
  } else if (shape === 'lingkaran') {
    container.innerHTML = `
      <div class="input-group">
        <label for="valJari">Jari-jari (r):</label>
        <input type="number" id="valJari" value="7" min="1" oninput="hitungLuasKeliling()">
      </div>
    `;
  }

  hitungLuasKeliling();
}

// Hitung Luas & Keliling
function hitungLuasKeliling() {
  const shape = document.getElementById('calcShapeSelect').value;
  const luasText = document.getElementById('calcLuasText');
  const kelilingText = document.getElementById('calcKelilingText');

  let luas = 0;
  let keliling = 0;

  if (shape === 'persegi') {
    const s = parseFloat(document.getElementById('valSisi').value) || 0;
    luas = s * s;
    keliling = 4 * s;
  } else if (shape === 'persegiPanjang') {
    const p = parseFloat(document.getElementById('valPanjang').value) || 0;
    const l = parseFloat(document.getElementById('valLebar').value) || 0;
    luas = p * l;
    keliling = 2 * (p + l);
  } else if (shape === 'segitiga') {
    const a = parseFloat(document.getElementById('valAlas').value) || 0;
    const t = parseFloat(document.getElementById('valTinggi').value) || 0;
    luas = 0.5 * a * t;
    keliling = 3 * a; // Asumsi segitiga sama sisi
  } else if (shape === 'lingkaran') {
    const r = parseFloat(document.getElementById('valJari').value) || 0;
    const pi = (r % 7 === 0) ? (22 / 7) : 3.14;
    luas = pi * r * r;
    keliling = 2 * pi * r;
  }

  luasText.innerText = `Luas (L): ${Number.isInteger(luas) ? luas : luas.toFixed(2)} cm²`;
  kelilingText.innerText = `Keliling (K): ${Number.isInteger(keliling) ? keliling : keliling.toFixed(2)} cm`;
}

// --- DATA KUIS ---
const questions = [
  {
    question: "Bangun datar yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku adalah...",
    options: ["Persegi Panjang", "Persegi", "Jajar Genjang", "Trapesium"],
    answer: 1
  },
  {
    question: "Rumus untuk menghitung luas persegi panjang dengan panjang (p) dan lebar (l) adalah...",
    options: ["p + l", "4 × s", "p × l", "2 × (p + l)"],
    answer: 2
  },
  {
    question: "Sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm. Berapakah luasnya?",
    options: ["80 cm²", "40 cm²", "18 cm²", "20 cm²"],
    answer: 1
    // L = 1/2 * 10 * 8 = 40
  },
  {
    question: "Bangun datar yang hanya memiliki 1 sisi lengkung adalah...",
    options: ["Segitiga", "Jajar Genjang", "Lingkaran", "Trapesium"],
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
    message = "Luar biasa! Kamu sudah sangat menguasai bentuk dan sifat bangun datar!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus latih pemahamanmu ya.";
  } else {
    message = "Jangan berkecil hati, pelajari lagi sifat-sifat bangun datar dan coba lagi!";
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
showShapeDetail('persegi');
loadQuestion();
