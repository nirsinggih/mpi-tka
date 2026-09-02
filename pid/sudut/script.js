// State Simulasi Sudut
let currentAngle = 45;

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Sudut
const questions = [
    {
        q: "Alat baku yang digunakan untuk mengukur besar sudut dinamakan...",
        options: ["Penggaris Lurus", "Busur Derajat", "Jangka", "Meteran Roll"],
        answer: 1
    },
    {
        q: "Sudut yang besarnya tepat 90 derajat dinamakan...",
        options: ["Sudut Lancip", "Sudut Tumpul", "Sudut Siku-Siku", "Sudut Lurus"],
        answer: 2
    },
    {
        q: "Sudut yang besarnya 120 derajat termasuk ke dalam jenis...",
        options: ["Sudut Lancip", "Sudut Tumpul", "Sudut Siku-Siku", "Sudut Refleks"],
        answer: 1
    },
    {
        q: "Sudut terkecil yang dibentuk oleh jarum jam pada pukul 03.00 tepat adalah...",
        options: ["45°", "60°", "90°", "180°"],
        answer: 2
    },
    {
        q: "Sebuah sudut memiliki besar 60°. Jenis sudut tersebut adalah...",
        options: ["Sudut Lancip", "Sudut Tumpul", "Sudut Siku-Siku", "Sudut Lurus"],
        answer: 0
    }
];

// Switch Tab Navigation
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// Adjust Angle Value
function adjustAngle(change) {
    currentAngle = Math.max(0, Math.min(180, currentAngle + change));
    updateAngleUI();
}

function setAngle(val) {
    currentAngle = val;
    updateAngleUI();
}

function updateAngleUI() {
    document.getElementById('angle-val').innerText = `${currentAngle}°`;
    document.getElementById('display-title').innerText = `Visualisasi Sudut: ${currentAngle}°`;
    document.getElementById('degree-text').innerText = `${currentAngle}°`;

    // Kategori & Deskripsi
    let category = "";
    let desc = "";
    let color = "#3b82f6";

    if (currentAngle === 0) {
        category = "Sudut Nol";
        desc = "Dua kaki sudut saling berimpit tegak lurus.";
        color = "#64748b";
    } else if (currentAngle < 90) {
        category = "Sudut Lancip";
        desc = "Ukuran sudut lebih kecil dari 90 derajat.";
        color = "#10b981";
    } else if (currentAngle === 90) {
        category = "Sudut Siku-Siku";
        desc = "Membentuk sudut tegak lurus sempurna 90 derajat.";
        color = "#3b82f6";
    } else if (currentAngle < 180) {
        category = "Sudut Tumpul";
        desc = "Ukuran sudut lebih besar dari 90 dan kurang dari 180 derajat.";
        color = "#f59e0b";
    } else {
        category = "Sudut Lurus";
        desc = "Membentuk garis lurus sejajar 180 derajat.";
        color = "#8b5cf6";
    }

    const catElem = document.getElementById('angle-category');
    catElem.innerText = category;
    catElem.style.color = color;
    document.getElementById('angle-desc').innerText = desc;

    renderSVG(currentAngle, color);
}

function renderSVG(angle, color) {
    const svg = document.getElementById('angle-svg');
    svg.innerHTML = '';

    const cx = 100, cy = 140, length = 75;

    // Kaki 1 (Mendatar ke kanan)
    const x1 = cx + length;
    const y1 = cy;

    // Kaki 2 (Berdasarkan Sudut)
    const rad = (angle * Math.PI) / 180;
    const x2 = cx + length * Math.cos(rad);
    const y2 = cy - length * Math.sin(rad);

    // Busur Lengkung
    const arcR = 30;
    const arcX = cx + arcR * Math.cos(rad);
    const arcY = cy - arcR * Math.sin(rad);
    const largeArc = angle > 180 ? 1 : 0;

    let pathData = `M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcX} ${arcY}`;
    if (angle === 90) {
        // Kotak Siku-Siku
        pathData = `M ${cx + 15} ${cy} L ${cx + 15} ${cy - 15} L ${cx} ${cy - 15}`;
    }

    svg.innerHTML = `
        <!-- Garis Alas -->
        <line x1="${cx}" y1="${cy}" x2="${x1}" y2="${y1}" stroke="#1e293b" stroke-width="4" stroke-linecap="round" />
        <!-- Garis Sudut -->
        <line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="4" stroke-linecap="round" />
        <!-- Indikator Busur -->
        ${angle > 0 ? `<path d="${pathData}" fill="none" stroke="${color}" stroke-width="2" />` : ''}
        <!-- Titik Sudut -->
        <circle cx="${cx}" cy="${cy}" r="6" fill="${color}" />
    `;
}

// Quiz Functions
function loadQuestion() {
    const qData = questions[currentQuestionIndex];
    document.getElementById('quiz-status').innerText = `Soal ${currentQuestionIndex + 1} / ${questions.length}`;
    document.getElementById('question-text').innerText = qData.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const correctIndex = questions[currentQuestionIndex].answer;
    if (selectedIndex === correctIndex) {
        btnElement.style.backgroundColor = '#2ecc71';
        btnElement.style.color = 'white';
        btnElement.style.borderColor = '#27ae60';
    } else {
        btnElement.style.backgroundColor = '#e74c3c';
        btnElement.style.color = 'white';
        btnElement.style.borderColor = '#c0392b';
    }
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
}

// Scoreboard System
function addScore(team, amount) {
    if (team === 'a') {
        scoreA = Math.max(0, scoreA + amount);
        document.getElementById('score-a').innerText = scoreA;
    } else if (team === 'b') {
        scoreB = Math.max(0, scoreB + amount);
        document.getElementById('score-b').innerText = scoreB;
    }
}

// Initialize on Load
window.onload = () => {
    updateAngleUI();
    loadQuestion();
};
