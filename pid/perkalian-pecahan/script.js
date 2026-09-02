// State Simulasi
let num1 = 1, den1 = 4;
let num2 = 1, den2 = 2; // Juga digunakan sebagai nilai bilangan asli (n) jika operasi mul/div

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Operasi Lanjut Pecahan
const questions = [
    {
        q: "Hasil dari 1/4 + 1/2 adalah...",
        options: ["2/6", "3/4", "2/4", "1/6"],
        answer: 1
    },
    {
        q: "Hasil dari 5/6 - 1/3 adalah...",
        options: ["4/3", "1/2", "4/6", "2/3"],
        answer: 1
    },
    {
        q: "Berapakah hasil dari 3 × 2/5?",
        options: ["6/5", "6/15", "5/5", "3/10"],
        answer: 0
    },
    {
        q: "Hasil dari 3/4 ÷ 2 adalah...",
        options: ["6/4", "3/2", "3/8", "1/4"],
        answer: 2
    },
    {
        q: "Ibu memiliki 2/3 loyang kue, lalu membeli lagi 1/6 loyang. Total kue Ibu sekarang adalah...",
        options: ["3/9 loyang", "5/6 loyang", "3/6 loyang", "4/6 loyang"],
        answer: 1
    }
];

// Navigation Switch
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// Helper FPB untuk Menyederhanakan Pecahan
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Adjust Input Values
function adjustVal(type, change) {
    if (type === 'num1') num1 = Math.max(1, Math.min(20, num1 + change));
    if (type === 'den1') den1 = Math.max(1, Math.min(20, den1 + change));
    if (type === 'num2') num2 = Math.max(1, Math.min(20, num2 + change));
    if (type === 'den2') den2 = Math.max(1, Math.min(20, den2 + change));

    updateCalculatorUI();
}

function toggleOpType() {
    const op = document.getElementById('op-type').value;
    const den2Row = document.getElementById('den2-row');
    const op2Title = document.getElementById('op2-title');
    const num2Label = document.getElementById('num2-label');

    if (op === 'mul' || op === 'div') {
        den2Row.style.display = 'none';
        op2Title.innerText = 'Bilangan Asli (n):';
        num2Label.innerText = 'Nilai (n):';
    } else {
        den2Row.style.display = 'flex';
        op2Title.innerText = 'Pecahan Kedua (c/d):';
        num2Label.innerText = 'Pembilang (c):';
    }

    updateCalculatorUI();
}

function updateCalculatorUI() {
    document.getElementById('num1-val').innerText = num1;
    document.getElementById('den1-val').innerText = den1;
    document.getElementById('num2-val').innerText = num2;
    document.getElementById('den2-val').innerText = den2;

    const op = document.getElementById('op-type').value;
    let eqStr = '';
    let stepStr = '';
    let resNum = 0;
    let resDen = 1;

    if (op === 'add' || op === 'sub') {
        const sign = op === 'add' ? '+' : '-';
        eqStr = `${num1}/${den1} ${sign} ${num2}/${den2}`;

        // Samakan Penyebut dengan KPK (den1 * den2)
        const commonDen = den1 * den2;
        const adjNum1 = num1 * den2;
        const adjNum2 = num2 * den1;

        if (op === 'add') {
            resNum = adjNum1 + adjNum2;
            stepStr = `1. Samakan penyebut: (${num1}×${den2})/${commonDen} + (${num2}×${den1})/${commonDen}<br>` +
                      `2. Penjumlahan pembilang: ${adjNum1}/${commonDen} + ${adjNum2}/${commonDen} = ${resNum}/${commonDen}`;
        } else {
            resNum = adjNum1 - adjNum2;
            stepStr = `1. Samakan penyebut: (${num1}×${den2})/${commonDen} - (${num2}×${den1})/${commonDen}<br>` +
                      `2. Pengurangan pembilang: ${adjNum1}/${commonDen} - ${adjNum2}/${commonDen} = ${resNum}/${commonDen}`;
        }
        resDen = commonDen;

    } else if (op === 'mul') {
        const n = num2; // num2 berfungsi sebagai bilangan asli
        eqStr = `${n} × ${num1}/${den1}`;
        resNum = n * num1;
        resDen = den1;
        stepStr = `1. Kalikan bilangan asli dengan pembilang: (${n} × ${num1}) / ${den1}<br>` +
                  `2. Hasil perkalian: ${resNum}/${resDen}`;

    } else if (op === 'div') {
        const n = num2; // num2 berfungsi sebagai bilangan asli
        eqStr = `${num1}/${den1} ÷ ${n}`;
        resNum = num1;
        resDen = den1 * n;
        stepStr = `1. Ubah ke perkalian dengan kebalikan: ${num1}/${den1} × 1/${n}<br>` +
                  `2. Kalikan penyebut: ${num1} / (${den1} × ${n}) = ${resNum}/${resDen}`;
    }

    // Menyederhanakan Pecahan Hasil
    if (resNum !== 0) {
        const commonFactor = gcd(Math.abs(resNum), Math.abs(resDen));
        const simNum = resNum / commonFactor;
        const simDen = resDen / commonFactor;

        document.getElementById('display-eq').innerText = eqStr;
        document.getElementById('step-breakdown').innerHTML = stepStr;
        
        if (simDen === 1) {
            document.getElementById('display-result').innerText = `${simNum}`;
        } else {
            document.getElementById('display-result').innerText = `${simNum}/${simDen}`;
        }
    } else {
        document.getElementById('display-eq').innerText = eqStr;
        document.getElementById('step-breakdown').innerHTML = stepStr;
        document.getElementById('display-result').innerText = '0';
    }
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
    toggleOpType();
    loadQuestion();
};
