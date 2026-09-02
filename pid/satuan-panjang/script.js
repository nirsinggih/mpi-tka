// State Simulasi
let val = 5;

// Nama Satuan & Tingkatannya (0: mm, 1: cm, 2: dm, 3: m, 4: dam, 5: hm, 6: km)
const units = ["mm", "cm", "dm", "m", "dam", "hm", "km"];

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Satuan Panjang Baku
const questions = [
    {
        q: "Hasil dari 3 km jika diubah ke dalam satuan meter (m) adalah...",
        options: ["30 m", "300 m", "3.000 m", "30.000 m"],
        answer: 2
    },
    {
        q: "Panjang papan tulis adalah 200 cm. Berapakah panjang tersebut dalam meter (m)?",
        options: ["2 m", "20 m", "0,2 m", "200 m"],
        answer: 0
    },
    {
        q: "Setiap turun SATU tangga pada tangga satuan panjang baku, nilainya dikalikan...",
        options: ["2", "5", "10", "100"],
        answer: 2
    },
    {
        q: "Hasil penjumlahan dari 5 m + 30 dm dalam satuan centimeter (cm) adalah...",
        options: ["80 cm", "530 cm", "800 cm", "350 cm"],
        answer: 2
    },
    {
        q: "Urutan satuan panjang baku dari yang TERBESAR ke TERKECIL adalah...",
        options: ["km, hm, dam, m, dm, cm, mm", "mm, cm, dm, m, dam, hm, km", "m, km, hm, dam, dm, cm, mm", "km, m, dam, hm, cm, dm, mm"],
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
