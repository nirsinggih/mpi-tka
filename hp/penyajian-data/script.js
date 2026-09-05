// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'simulasi') {
    renderDataVisuals();
  }
}

// Render 3 Bentuk Visualisasi Data secara Dinamis
function renderDataVisuals() {
  const vBaca = parseInt(document.getElementById('valMembaca').value) || 0;
  const vLukis = parseInt(document.getElementById('valMelukis').value) || 0;
  const vOlahraga = parseInt(document.getElementById('valOlahraga').value) || 0;

  // 1. Render Tabel Frekuensi
  const freqTable = document.getElementById('freqTableDisplay');
  freqTable.innerHTML = `
    <thead>
      <tr><th>Kegiatan Hobi</th><th>Frekuensi (Banyak Siswa)</th></tr>
    </thead>
    <tbody>
      <tr><td>📖 Membaca</td><td><strong>${vBaca}</strong></td></tr>
      <tr><td>🎨 Melukis</td><td><strong>${vLukis}</strong></td></tr>
      <tr><td>⚽ Olahraga</td><td><strong>${vOlahraga}</strong></td></tr>
    </tbody>
  `;

  // 2. Render Piktogram (1 Simbol = 2 Siswa)
  const picContainer = document.getElementById('pictogramDisplay');
  const getIcons = (val, icon) => {
    const fullCount = Math.floor(val / 2);
    const hasHalf = val % 2 !== 0;
    return icon.repeat(fullCount) + (hasHalf ? '▫️' : '');
  };

  picContainer.innerHTML = `
    <div class="pic-row"><span class="pic-label">Membaca:</span><span class="pic-icons">${getIcons(vBaca, '📘')} (${vBaca})</span></div>
    <div class="pic-row"><span class="pic-label">Melukis:</span><span class="pic-icons">${getIcons(vLukis, '🎨')} (${vLukis})</span></div>
    <div class="pic-row"><span class="pic-label">Olahraga:</span><span class="pic-icons">${getIcons(vOlahraga, '⚽')} (${vOlahraga})</span></div>
  `;

  // 3. Render Diagram Batang (Skala max = 12)
  const barContainer = document.getElementById('barChartDisplay');
  const maxVal = 12;

  const hBaca = (vBaca / maxVal) * 100;
  const hLukis = (vLukis / maxVal) * 100;
  const hOlahraga = (vOlahraga / maxVal) * 100;

  barContainer.innerHTML = `
    <div class="bar-item">
      <div class="bar-inner" style="height: ${hBaca}%;">${vBaca}</div>
      <span class="bar-title">Membaca</span>
    </div>
    <div class="bar-item">
      <div class="bar-inner" style="height: ${hLukis}%;">${vLukis}</div>
      <span class="bar-title">Melukis</span>
    </div>
    <div class="bar-item">
      <div class="bar-inner" style="height: ${hOlahraga}%;">${vOlahraga}</div>
      <span class="bar-title">Olahraga</span>
    </div>
  `;
}

// --- DATA KUIS ---
const questions = [
  {
    question: "Penyajian data yang menggunakan simbol atau gambar dinamakan...",
    options: ["Diagram Batang", "Piktogram", "Tabel Frekuensi", "Diagram Garis"],
    answer: 1
  },
  {
    question: "Pada piktogram, jika 1 gambar 🍎 mewakili 5 siswa, maka 4 gambar 🍎 mewakili...",
    visual: "🍎 🍎 🍎 🍎",
    options: ["10 Siswa", "15 Siswa", "20 Siswa", "25 Siswa"],
    answer: 2
    // 4 * 5 = 20
  },
  {
    question: "Tinggi batang pada diagram batang ditentukan oleh...",
    options: ["Nama Kategori", "Jumlah Frekuensi Data", "Warna Gambar", "Lebar Kertas"],
    answer: 1
  },
  {
    question: "Sebuah tabel menunjukkan data siswa: Sepeda (12), Jalan (8), Bus (5). Berapa jumlah seluruh siswa?",
    options: ["20 Siswa", "25 Siswa", "30 Siswa", "15 Siswa"],
    answer: 1
    // 12 + 8 + 5 = 25
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
  
  const quizVisual = document.getElementById('quizVisualBox');
  if (q.visual) {
    quizVisual.innerText = q.visual;
    quizVisual.style.display = 'block';
  } else {
    quizVisual.style.display = 'none';
  }

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
    message = "Luar biasa! Kamu sudah sangat mahir membaca dan menyajikan data!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus latih pemahamanmu ya.";
  } else {
    message = "Jangan berkecil hati, pelajari lagi jenis-jenis penyajian data dan coba lagi!";
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
