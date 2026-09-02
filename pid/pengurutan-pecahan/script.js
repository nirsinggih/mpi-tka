// State Simulasi Perbandingan
let numA = 2;
let denA = 4;
let numB = 3;
let denB = 5;

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Perbandingan & Pengurutan Pecahan
const questions = [
    {
        q: "Tanda perbandingan yang tepat untuk 2/5 ... 4/5 adalah...",
        options: ["<", ">", "=", "≥"],
        answer: 0
    },
    {
        q: "Manakah pecahan yang nilainya LEBIH BESAR antara 3/4 dan 2/3?",
        options: ["2/3", "3/4", "Sama besar", "Tidak dapat ditentukan"],
        answer: 1
    },
    {
        q: "Hasil perkalian silang untuk membandingkan 1/3 dan 2/7 adalah...",
        options: ["7 dan 6 (1/3 > 2/7)", "2 dan 21 (1/3 < 2/7)", "3 dan 14 (1/3 = 2/7)", "7 dan 3 (1/3 < 2/7)"],
        answer: 0
    },
    {
        q: "Urutan pecahan 1/2, 1/4, 3/4 dari yang TERKECIL ke TERBESAR adalah...",
        options: ["3/4, 1/2, 1/4", "1/4, 1/2, 3/4", "1/2, 1/4, 3/4", "1/4, 3/4, 1/2"],
        answer: 1
    },
    {
        q: "Urutan pecahan 2/6, 5/6, 1/6 dari yang TERBESAR ke TERKECIL adalah...",
        options: ["1/6, 2/6, 5/6", "5/6, 1/6, 2/6", "5/6, 2/6, 1/6", "2/6, 5/6, 1/6"],
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

// Adjust Fraction Values
function adjustFrac(variable, change) {
    if (variable === 'numA') numA = Math.max(1, Math.min(10, numA + change));
    if (variable === 'denA') denA = Math.max(1, Math.min(10, denA + change));
    if (variable === 'numB') numB = Math.max(1, Math.min(10, numB + change));
    if (variable === 'denB') denB = Math.max(1, Math.min(10, denB + change));

    // Validasi pembilang tidak lebih besar dari penyebut demi visual sederhana
    if (numA > denA) numA = denA;
    if (numB > denB) numB = denB;

    updateUI();
}

function updateUI() {
    // Update badge teks tombol
    document.getElementById('numA-val').innerText = numA;
    document.getElementById('denA-val').innerText = denA;
    document.getElementById('numB-val').innerText = numB;
    document.getElementById('denB-val').innerText = denB;

    // Update label visual
    document.getElementById('label-frac-a').innerText = `${numA}/${denA}`;
    document.getElementById('label-frac-b').innerText = `${numB}/${denB}`;
    document.getElementById('display-a').innerText = `${numA}/${denA}`;
    document.getElementById('display-b').innerText = `${numB}/${denB}`;

    // Update visual bars fill (%)
    const fillA = (numA / denA) * 100;
    const fillB = (numB / denB) * 100;
    document.getElementById('bar-a').style.width = `${fillA}%`;
    document.getElementById('bar-b').style.width = `${fillB}%`;

    // Kalkulasi Perkalian Silang & Simbol Result
    const crossA = numA * denB;
    const crossB = numB * denA;

    let symbol = '=';
    if (crossA > crossB) symbol = '>';
    if (crossA < crossB) symbol = '<';

    document.getElementById('symbol-result').innerText = symbol;
    document.getElementById('cross-calc-detail').innerText = 
        `Perkalian Silang: (${numA} × ${denB} = ${crossA}) VS (${numB} × ${denA} = ${crossB}) ➡️ Hasil: ${numA}/${denA} ${symbol} ${numB}/${denB}`;
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
    updateUI();
    loadQuestion();
};
