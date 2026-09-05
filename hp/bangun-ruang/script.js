// Navigasi Tab
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.nav-btn');

  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');

  if (tabId === 'simulasi') {
    renderSpacialProjections();
  }
}

// Preset Objek Bangun Ruang
const presets = {
  kubus: {
    title: "Kubus Tunggal",
    desc: "Dilihat dari sisi depan, atas, maupun samping, sebuah kubus akan selalu terlihat berbentuk **persegi**.",
    front: "Persegi 1x1",
    top: "Persegi 1x1",
    side: "Persegi 1x1"
  },
  balok: {
    title: "Balok Memanjang",
    desc: "Tampak depan berbentuk persegi panjang, tampak atas berbentuk persegi panjang, dan tampak samping berbentuk persegi.",
    front: "Persegi Panjang (Horisontal)",
    top: "Persegi Panjang (Horisontal)",
    side: "Persegi"
  },
  piramida: {
    title: "Konstruksi Bentuk 'L'",
    desc: "Terdiri dari susunan blok membentuk huruf L.",
    front: "Bentuk L (3 Blok)",
    top: "Garis Lurus (2 Blok)",
    side: "Garis Tegak (2 Blok)"
  }
};

function selectPreset(key) {
  const btns = document.querySelectorAll('.obj-btn');
  btns.forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const p = presets[key];
  const container = document.getElementById('presetDetailContainer');

  container.innerHTML = `
    <h3 style="color:#5f27cd; margin-bottom:6px;">${p.title}</h3>
    <p style="font-size:0.88rem; line-height:1.4; margin-bottom:10px;">${p.desc}</p>
    <div style="background-color:#eee9f8; padding:8px; border-radius:6px; font-size:0.82rem;">
      <p>• <strong>Pandangan Depan:</strong> ${p.front}</p>
      <p>• <strong>Pandangan Atas:</strong> ${p.top}</p>
      <p>• <strong>Pandangan Samping:</strong> ${p.side}</p>
    </div>
  `;
}

// Render Proyeksi Spasial 2D dari Grid 2x2
function renderSpacialProjections() {
  const c00 = parseInt(document.getElementById('cell00').value) || 0; // Kiri-Belakang
  const c01 = parseInt(document.getElementById('cell01').value) || 0; // Kanan-Belakang
  const c10 = parseInt(document.getElementById('cell10').value) || 0; // Kiri-Depan
  const c11 = parseInt(document.getElementById('cell11').value) || 0; // Kanan-Depan

  // 1. Pandangan Depan (Front View) -> Kolom Kiri (Max c10, c00) & Kolom Kanan (Max c11, c01)
  const leftFrontMax = Math.max(c10, c00);
  const rightFrontMax = Math.max(c11, c01);

  renderGrid2x2('frontViewGrid', [
    leftFrontMax >= 2, rightFrontMax >= 2, // Baris Atas
    leftFrontMax >= 1, rightFrontMax >= 1  // Baris Bawah
  ]);

  // 2. Pandangan Atas (Top View) -> Aktif jika ada blok (>0)
  renderGrid2x2('topViewGrid', [
    c00 > 0, c01 > 0, // Baris Belakang
    c10 > 0, c11 > 0  // Baris Depan
  ]);

  // 3. Pandangan Samping Kanan (Side View) -> Baris Depan (Max c10, c11) & Baris Belakang (Max c00, c01)
  const frontSideMax = Math.max(c10, c11);
  const backSideMax = Math.max(c00, c01);

  renderGrid2x2('sideViewGrid', [
    backSideMax >= 2, frontSideMax >= 2,
    backSideMax >= 1, frontSideMax >= 1
  ]);
}

function renderGrid2x2(elementId, stateArray) {
  const container = document.getElementById(elementId);
  container.innerHTML = '';
  stateArray.forEach(isActive => {
    const div = document.createElement('div');
    div.className = 'cell-block' + (isActive ? ' active' : '');
    container.appendChild(div);
  });
}

// --- DATA KUIS ---
const questions = [
  {
    question: "Jika sebuah KUBUS dilihat tepat dari atas, bentuk bangun 2D yang terlihat adalah...",
    visual: "📐 Pandangan dari Atas (Top View)",
    options: ["Segitiga", "Persegi", "Lingkaran", "Trapesium"],
    answer: 1
  },
  {
    question: "Sebuah TABUNG jika dilihat dari samping akan tampak berbentuk...",
    visual: "🥫 Objek: Tabung Minuman",
    options: ["Lingkaran", "Persegi Panjang", "Segitiga", "Oval"],
    answer: 1
  },
  {
    question: "Pandangan yang memperlihatkan denah susunan blok dari atas gedung dinamakan...",
    visual: "🚁 Pandangan Udara",
    options: ["Tampak Depan (Front View)", "Tampak Samping (Side View)", "Tampak Atas (Top View)", "Tampak Bawah"],
    answer: 2
  },
  {
    question: "Sebuah KERUCUT jika dilihat tepat dari arah DEPAN akan tampak berbentuk...",
    visual: "📐 Objek: Topi Ulang Tahun (Kerucut)",
    options: ["Lingkaran", "Persegi", "Segitiga", "Jajar Genjang"],
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
  document.getElementById('quizVisual').innerText = q.visual;
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
    document.getElementById('quizFeedback').style.color = "#10ac84";
    score += 100 / questions.length;
  } else {
    selectedBtn.classList.add('wrong');
    options[correctIndex].classList.add('correct');
    document.getElementById('quizFeedback').innerText = "Ups! Jawaban belum tepat. 😅";
    document.getElementById('quizFeedback').style.color = "#ff6b6b";
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
    message = "Luar biasa! Pemahaman spasial dan sudut pandang kamu sangat tajam!";
  } else if (finalScore >= 60) {
    message = "Bagus sekali! Terus berlatih membayangkan objek 3D ya.";
  } else {
    message = "Jangan berkecil hati, coba lagi fitur 3D Lab untuk melatih bayangan spasialmu!";
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
selectPreset('kubus');
loadQuestion();
