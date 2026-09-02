// State Simulasi FPB & KPK
let numA = 12;
let numB = 18;

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal FPB & KPK
const questions = [
    {
        q: "FPB dari bilangan 12 dan 18 adalah...",
        options: ["3", "6", "12", "36"],
        answer: 1
    },
    {
        q: "KPK dari bilangan 6 dan 8 adalah...",
        options: ["12", "16", "24", "48"],
        answer: 2
    },
    {
        q: "Manakah di bawah ini yang merupakan kelipatan persekutuan dari 3 dan 4?",
        options: ["6", "8", "12", "16"],
        answer: 2
    },
    {
        q: "Lampu A menyala setiap 4 detik, Lampu B setiap 6 detik. Kedua lampu menyala bersamaan setiap...",
        options: ["10 detik", "12 detik", "24 detik", "18 detik"],
        answer: 1
    },
    {
        q: "Ibu memiliki 20 kue mangkok dan 30 kue lapis untuk dimasukkan ke dalam beberapa wadah sama banyak. Berapa wadah paling banyak yang dibutuhkan (FPB)?",
        options: ["5", "10", "15", "20"],
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

// Helper Functions FPB & KPK
function getFactors(n) {
    let factors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) factors.push(i);
    }
    return factors;
}

function getGCD(a, b) {
    return b === 0 ? a : getGCD(b, a % b);
}

function getLCM(a, b) {
    return (a * b) / getGCD(a, b);
}

// Adjust Input Values
function adjustVal(type, change) {
    if (type === 'numA') numA = Math.max(1, Math.min(100, numA + change));
    if (type === 'numB') numB = Math.max(1, Math.min(100, numB + change));

    updateCalculatorUI();
}

function updateCalculatorUI() {
    document.getElementById('numA-val').innerText = numA;
    document.getElementById('numB-val').innerText = numB;

    const factorsA = getFactors(numA);
    const factorsB = getFactors(numB);
    const fpb = getGCD(numA, numB);
    const kpk = getLCM(numA, numB);

    document.getElementById('factors-a').innerText = factorsA.join(', ');
    document.getElementById('factors-b').innerText = factorsB.join(', ');

    document.getElementById('label-num-fpb').innerText = `${numA} & ${numB}`;
    document.getElementById('label-num-kpk').innerText = `${numA} & ${numB}`;

    document.getElementById('fpb-val').innerText = fpb;
    document.getElementById('kpk-val').innerText = kpk;

    document.getElementById('step-detail').innerHTML = 
        `1. Faktor Persekutuan Terbesar (FPB) = <strong>${fpb}</strong><br>` +
        `2. Kelipatan Persekutuan Terkecil (KPK) = <strong>${kpk}</strong> (diperoleh dari: ${numA} × ${numB} ÷ ${fpb})`;
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
