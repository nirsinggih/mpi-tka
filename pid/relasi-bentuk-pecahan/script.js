// State Konverter
let num = 1;
let den = 4;

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Relasi Bentuk Pecahan
const questions = [
    {
        q: "Bentuk desimal dari pecahan 1/2 adalah...",
        options: ["0,2", "0,5", "0,25", "0,75"],
        answer: 1
    },
    {
        q: "Bentuk persen dari 3/4 adalah...",
        options: ["30%", "50%", "75%", "80%"],
        answer: 2
    },
    {
        q: "Bentuk pecahan paling sederhana dari 0,6 adalah...",
        options: ["3/5", "6/10", "1/2", "2/5"],
        answer: 0
    },
    {
        q: "Bentuk desimal dari 40% adalah...",
        options: ["0,04", "0,4", "4,0", "0,25"],
        answer: 1
    },
    {
        q: "Pecahan 1/5 jika diubah ke bentuk persen dan desimal berturut-turut menjadi...",
        options: ["20% dan 0,2", "50% dan 0,5", "25% dan 0,25", "10% dan 0,1"],
        answer: 0
    }
];

// Navigation Switch
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// Interactive Converter Logic
function adjustValue(type, change) {
    if (type === 'num') num = Math.max(1, Math.min(20, num + change));
    if (type === 'den') den = Math.max(1, Math.min(20, den + change));

    updateConverterUI();
}

function updateConverterUI() {
    document.getElementById('num-val').innerText = num;
    document.getElementById('den-val').innerText = den;

    const desimalVal = (num / den).toFixed(2);
    const persenVal = ((num / den) * 100).toFixed(0);

    // Update Tampilan 3 Bentuk
    document.getElementById('display-biasa').innerText = `${num}/${den}`;
    document.getElementById('display-desimal').innerText = desimalVal;
    document.getElementById('display-persen').innerText = `${persenVal}%`;

    // Update Langkah Penjelasan
    document.getElementById('step-desimal').innerText = `Desimal = ${num} ÷ ${den} = ${desimalVal}`;
    document.getElementById('step-persen').innerText = `Persen = ${desimalVal} × 100% = ${persenVal}%`;
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
    updateConverterUI();
    loadQuestion();
};
