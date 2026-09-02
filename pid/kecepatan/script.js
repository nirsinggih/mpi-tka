// State Simulasi (Target: 'k', 'j', 'w')
let targetMode = 'k'; 
let val1 = 120; // Default Input 1 (misal Jarak)
let val2 = 2;   // Default Input 2 (misal Waktu)

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Kecepatan, Jarak & Waktu
const questions = [
    {
        q: "Sebuah mobil menempuh jarak 150 km dalam waktu 3 jam. Berapakah kecepatan rata-rata mobil tersebut?",
        options: ["40 km/jam", "50 km/jam", "60 km/jam", "45 km/jam"],
        answer: 1
    },
    {
        q: "Ayah mengendarai motor dengan kecepatan 60 km/jam selama 2 jam. Berapakah jarak yang ditempuh Ayah?",
        options: ["120 km", "30 km", "100 km", "180 km"],
        answer: 0
    },
    {
        q: "Kereta api berjalan sejauh 240 km dengan kecepatan 80 km/jam. Waktu yang dibutuhkan kereta adalah...",
        options: ["2 jam", "3 jam", "4 jam", "5 jam"],
        answer: 1
    },
    {
        q: "Rumus segitiga JKW yang benar untuk mencari Jarak (J) adalah...",
        options: ["J = K ÷ W", "J = K × W", "J = W ÷ K", "J = K + W"],
        answer: 1
    },
    {
        q: "Kecepatan 72 km/jam jika diubah ke dalam satuan m/detik menjadi...",
        options: ["20 m/detik", "15 m/detik", "30 m/detik", "25 m/detik"],
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

// Set Target Mode
function setTarget(mode, element) {
    targetMode = mode;
    document.querySelectorAll('.btn-target').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    // Reset default values sesuai mode
    if (mode === 'k') { val1 = 120; val2 = 2; }
    if (mode === 'j') { val1 = 60; val2 = 3; }
    if (mode === 'w') { val1 = 180; val2 = 60; }

    updateCalculatorUI();
}

// Adjust Input Values
function adjustVal(type, change) {
    if (type === 'in1') val1 = Math.max(1, Math.min(500, val1 + change));
    if (type === 'in2') val2 = Math.max(1, Math.min(100, val2 + change));

    updateCalculatorUI();
}

function updateCalculatorUI() {
    const label1 = document.getElementById('label-input-1');
    const label2 = document.getElementById('label-input-2');
    const valDisplay1 = document.getElementById('val-input-1');
    const valDisplay2 = document.getElementById('val-input-2');

    valDisplay1.innerText = val1;
    valDisplay2.innerText = val2;

    let eqStr = "";
    let stepStr = "";
    let resTitle = "";
    let resValueStr = "";

    if (targetMode === 'k') {
        label1.innerText = "Jarak (J) dalam km:";
        label2.innerText = "Waktu (W) dalam Jam:";
        
        const res = (val1 / val2).toFixed(1);
        const resClean = Number.isInteger(val1 / val2) ? (val1 / val2) : res;

        eqStr = `K = ${val1} / ${val2}`;
        stepStr = `K = J ÷ W ➡️ ${val1} km ÷ ${val2} jam = ${resClean} km/jam`;
        resTitle = "Kecepatan Rata-Rata (K):";
        resValueStr = `${resClean} km/jam`;

    } else if (targetMode === 'j') {
        label1.innerText = "Kecepatan (K) km/jam:";
        label2.innerText = "Waktu (W) dalam Jam:";

        const res = val1 * val2;

        eqStr = `J = ${val1} × ${val2}`;
        stepStr = `J = K × W ➡️ ${val1} km/jam × ${val2} jam = ${res} km`;
        resTitle = "Jarak Tempuh (J):";
        resValueStr = `${res} km`;

    } else if (targetMode === 'w') {
        label1.innerText = "Jarak (J) dalam km:";
        label2.innerText = "Kecepatan (K) km/jam:";

        const res = (val1 / val2).toFixed(1);
        const resClean = Number.isInteger(val1 / val2) ? (val1 / val2) : res;

        eqStr = `W = ${val1} / ${val2}`;
        stepStr = `W = J ÷ K ➡️ ${val1} km ÷ ${val2} km/jam = ${resClean} jam`;
        resTitle = "Waktu Tempuh (W):";
        resValueStr = `${resClean} jam`;
    }

    document.getElementById('eq-formula').innerText = eqStr;
    document.getElementById('step-detail-text').innerText = stepStr;
    document.getElementById('res-title-text').innerText = resTitle;
    document.getElementById('final-result').innerText = resValueStr;
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
    updateCalculatorUI();
    loadQuestion();
};
