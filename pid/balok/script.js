// State Management Simulasi Balok
let p = 5;
let l = 3;
let t = 4;

// State Scoreboard & Kuis
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Khusus Balok (Sekolah Dasar)
const questions = [
    {
        q: "Sebuah akuarium berbentuk balok memiliki panjang 10 cm, lebar 4 cm, dan tinggi 5 cm. Berapakah volumenya?",
        options: ["200 cm³", "190 cm³", "100 cm³", "40 cm³"],
        answer: 0
    },
    {
        q: "Rumus untuk menghitung volume balok yang benar adalah...",
        options: ["V = s × s × s", "V = p × l × t", "V = p + l + t", "V = 2 × (p + l)"],
        answer: 1
    },
    {
        q: "Sebuah balok memilik panjang 6 cm dan lebar 3 cm. Jika volume balok 72 cm³, berapakah tingginya?",
        options: ["2 cm", "6 cm", "4 cm", "8 cm"],
        answer: 2
    },
    {
        q: "Kardus roti berbentuk balok memiliki volume 120 cm³. Jika panjangnya 6 cm dan tingginya 4 cm, berapa lebarnya?",
        options: ["5 cm", "10 cm", "6 cm", "4 cm"],
        answer: 0
    },
    {
        q: "Jumlah seluruh rusuk yang dimiliki oleh sebuah balok adalah...",
        options: ["6", "8", "12", "16"],
        answer: 2
    }
];

// Switch Tab Menu
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Simulasi Dimensi Balok (Panjang, Lebar, Tinggi)
function adjustDim(dimension, change) {
    if (dimension === 'p') {
        p += change;
        if (p < 1) p = 1;
        if (p > 20) p = 20;
        document.getElementById('p-val').innerText = `${p} cm`;
    } else if (dimension === 'l') {
        l += change;
        if (l < 1) l = 1;
        if (l > 20) l = 20;
        document.getElementById('l-val').innerText = `${l} cm`;
    } else if (dimension === 't') {
        t += change;
        if (t < 1) t = 1;
        if (t > 20) t = 20;
        document.getElementById('t-val').innerText = `${t} cm`;
    }

    updateCalculation();
}

function updateCalculation() {
    const totalVolume = p * l * t;
    document.getElementById('calc-breakdown').innerText = `${p} × ${l} × ${t}`;
    document.getElementById('calc-result').innerText = `${totalVolume} cm³`;
}

// Logika Kuis
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
    } else {
        btnElement.style.backgroundColor = '#e74c3c';
        btnElement.style.color = 'white';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0; // Rotasi balik ke soal pertama
    }
    loadQuestion();
}

// Logika Poin Scoreboard
function addScore(team, amount) {
    if (team === 'a') {
        scoreA += amount;
        if (scoreA < 0) scoreA = 0;
        document.getElementById('score-a').innerText = scoreA;
    } else if (team === 'b') {
        scoreB += amount;
        if (scoreB < 0) scoreB = 0;
        document.getElementById('score-b').innerText = scoreB;
    }
}

// Inisialisasi awal saat dimuat
window.onload = () => {
    loadQuestion();
    updateCalculation();
};
