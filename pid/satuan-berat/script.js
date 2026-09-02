// State Simulasi
let val = 3;

// Nama Satuan & Tingkatannya (0: mg, 1: cg, 2: dg, 3: g, 4: dag, 5: hg, 6: kg)
const units = ["mg", "cg", "dg", "g", "dag", "hg (ons)", "kg"];

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Satuan Berat Baku
const questions = [
    {
        q: "Hasil konversi dari 4 kg ke dalam satuan gram (g) adalah...",
        options: ["40 g", "400 g", "4.000 g", "40.000 g"],
        answer: 2
    },
    {
        q: "Ibu membeli gula pasir seberat 20 hg. Nilai berat tersebut sama dengan...",
        options: ["20 kg", "2 kg", "200 kg", "0,2 kg"],
        answer: 1
    },
    {
        q: "Satuan 1 hektogram (hg) nilainya persis setara dengan...",
        options: ["1 kg", "1 gram", "1 ons", "1 kuintal"],
        answer: 2
    },
    {
        q: "Hasil dari 3 kg + 5 ons dalam satuan gram (g) adalah...",
        options: ["3.500 g", "350 g", "800 g", "3.050 g"],
        answer: 0
    },
    {
        q: "Berat 1 ton jika dinyatakan dalam satuan kilogram (kg) adalah...",
        options: ["10 kg", "100 kg", "1.000 kg", "10.000 kg"],
        answer: 2
    }
];

// Switch Tab Navigation
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// Adjust Input Value
function adjustValue(change) {
    val = Math.max(1, Math.min(100, val + change));
    updateConversionUI();
}

function updateConversionUI() {
    document.getElementById('input-val').innerText = val;

    const fromIdx = parseInt(document.getElementById('from-unit').value);
    const toIdx = parseInt(document.getElementById('to-unit').value);

    const fromUnitName = units[fromIdx];
    const toUnitName = units[toIdx];

    const diff = fromIdx - toIdx; // Posisi dari - ke
    let result = val;
    let stepText = "";

    if (diff > 0) {
        // Turun tangga -> Dikali
        const factor = Math.pow(10, diff);
        result = val * factor;
        stepText = `Turun ${diff} tangga → Dikali ${factor.toLocaleString()}`;
    } else if (diff < 0) {
        // Naik tangga -> Dibagi
        const factor = Math.pow(10, Math.abs(diff));
        result = val / factor;
        stepText = `Naik ${Math.abs(diff)} tangga → Dibagi ${factor.toLocaleString()}`;
    } else {
        stepText = "Satuan sama → Tidak ada perubahan nilai.";
    }

    document.getElementById('eq-from').innerText = `${val} ${fromUnitName}`;
    document.getElementById('eq-to').innerText = `${result.toLocaleString()} ${toUnitName}`;
    document.getElementById('final-result').innerText = `${result.toLocaleString()} ${toUnitName}`;
    document.getElementById('step-detail-text').innerText = stepText;
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
    updateConversionUI();
    loadQuestion();
};
