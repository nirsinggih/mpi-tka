// State Nilai Dimensi Simulasi
let s = 4;
let p = 6;
let l = 4;
let t = 5;

// State Scoreboard Kuis
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Campuran Kubus & Balok
const questions = [
    {
        q: "Sebuah mainan disusun dari kubus (s = 3 cm) dan balok (p = 5 cm, l = 3 cm, t = 4 cm). Berapakah volume gabungannya?",
        options: ["87 cm³", "60 cm³", "27 cm³", "97 cm³"],
        answer: 0
    },
    {
        q: "Volume kubus A adalah 125 cm³. Jika diletakkan di atas balok berukuran 8 cm × 5 cm × 2 cm, berapa volume totalnya?",
        options: ["80 cm³", "205 cm³", "160 cm³", "215 cm³"],
        answer: 1
    },
    {
        q: "Sebuah peti berbentuk balok (10 cm × 6 cm × 5 cm) berisi kotak kecil berbentuk kubus dengan rusuk 2 cm. Berapa volume peti balok tersebut?",
        options: ["300 cm³", "8 cm³", "308 cm³", "292 cm³"],
        answer: 0
    },
    {
        q: "Manakah pernyataan rumus volume gabungan kubus dan balok yang benar?",
        options: ["V = (s × 3) + (p + l + t)", "V = (s × s × s) + (p × l × t)", "V = (s × s) × (p × l)", "V = 6s² + 2(pl + pt + lt)"],
        answer: 1
    },
    {
        q: "Dua buah kubus identik (s = 4 cm) digabungkan bersisian sehingga membentuk balok. Berapakah volume bangun gabungan tersebut?",
        options: ["64 cm³", "128 cm³", "256 cm³", "96 cm³"],
        answer: 1
    }
];

// Switch Tab Navigation
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// Adjust Dimension Values
function adjustValue(variable, change) {
    if (variable === 's') { s = Math.max(1, Math.min(10, s + change)); document.getElementById('s-val').innerText = `${s} cm`; }
    if (variable === 'p') { p = Math.max(1, Math.min(15, p + change)); document.getElementById('p-val').innerText = `${p} cm`; }
    if (variable === 'l') { l = Math.max(1, Math.min(15, l + change)); document.getElementById('l-val').innerText = `${l} cm`; }
    if (variable === 't') { t = Math.max(1, Math.min(15, t + change)); document.getElementById('t-val').innerText = `${t} cm`; }

    updateSimulasi();
}

// Update Perhitungan Volume Realtime
function updateSimulasi() {
    const vKubus = s * s * s;
    const vBalok = p * l * t;
    const vTotal = vKubus + vBalok;

    document.getElementById('kubus-calc').innerText = `${s} × ${s} × ${s} = ${vKubus} cm³`;
    document.getElementById('balok-calc').innerText = `${p} × ${l} × ${t} = ${vBalok} cm³`;
    document.getElementById('total-calc-str').innerText = `${vKubus} cm³ + ${vBalok} cm³`;
    document.getElementById('total-val').innerText = `${vTotal} cm³`;
}

// Quiz System Functions
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

// Scoreboard System for 2 Teams
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
    updateSimulasi();
    loadQuestion();
};
