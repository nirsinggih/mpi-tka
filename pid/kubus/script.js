// State Management
let currentSize = 3;
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Kuis
const questions = [
    {
        q: "Sebuah kubus memiliki panjang rusuk 4 cm. Berapakah volume kubus tersebut?",
        options: ["16 cm³", "64 cm³", "48 cm³", "32 cm³"],
        answer: 1
    },
    {
        q: "Rumus untuk mencari volume kubus adalah...",
        options: ["s × s", "p × l × t", "s × s × s", "6 × s²"],
        answer: 2
    },
    {
        q: "Jika volume sebuah kubus adalah 27 cm³, berapa panjang rusuknya?",
        options: ["3 cm", "9 cm", "6 cm", "4 cm"],
        answer: 0
    },
    {
        q: "Kubus memiliki rusuk sebanyak...",
        options: ["6", "8", "12", "10"],
        answer: 2
    },
    {
        q: "Panjang rusuk kubus A adalah 10 cm. Volume kubus A adalah...",
        options: ["100 cm³", "1000 cm³", "300 cm³", "500 cm³"],
        answer: 1
    }
];

// Tab Navigation System
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Interactive Simulation Logic
function adjustSize(change) {
    currentSize += change;
    if (currentSize < 1) currentSize = 1;
    if (currentSize > 10) currentSize = 10; // Batas maks interaksi

    document.getElementById('s-value').innerText = `Rusuk (s) = ${currentSize} cm`;
    document.getElementById('calc-breakdown').innerText = `${currentSize} × ${currentSize} × ${currentSize}`;
    document.getElementById('calc-result').innerText = `${Math.pow(currentSize, 3)} cm³`;
}

// Quiz & Arena Logic
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
        currentQuestionIndex = 0; // Loop kembali ke soal pertama
    }
    loadQuestion();
}

// Scoreboard System for 2 Teams
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

// Initialize on Load
window.onload = () => {
    loadQuestion();
};
