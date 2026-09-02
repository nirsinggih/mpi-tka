// State Simulasi Penaksiran
let valA = 5.4;
let valB = 3.7;

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Penaksiran Ukuran
const questions = [
    {
        q: "Panjang sebuah pensil adalah 12,8 cm. Jika dibulatkan ke satuan cm terdekat menjadi...",
        options: ["12 cm", "13 cm", "12,5 cm", "14 cm"],
        answer: 1
    },
    {
        q: "Berat sekeranjang buah adalah 4,3 kg. Taksiran terbaik berat buah tersebut adalah...",
        options: ["4 kg", "5 kg", "3 kg", "4,5 kg"],
        answer: 0
    },
    {
        q: "Hasil taksiran dari penjumlahan 8,7 m + 4,2 m adalah...",
        options: ["12 m", "13 m", "14 m", "15 m"],
        answer: 1
    },
    {
        q: "Aturan pembulatan menyatakan jika angka desimal di belakang koma 5 atau lebih, maka...",
        options: ["Dibulatkan ke bawah", "Dibulatkan ke atas (+1)", "Nilainya tetap", "Dikurangi 1"],
        answer: 1
    },
    {
        q: "Ibu membeli 3,8 liter minyak goreng. Taksiran volume minyak tersebut ke liter terdekat adalah...",
        options: ["3 liter", "3,5 liter", "4 liter", "5 liter"],
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

// Adjust Values
function adjustVal(target, change) {
    if (target === 'a') {
        valA = Math.max(0.1, Math.min(20, parseFloat((valA + change).toFixed(1))));
    } else if (target === 'b') {
        valB = Math.max(0.1, Math.min(20, parseFloat((valB + change).toFixed(1))));
    }
    calculateTaksiran();
}

function calculateTaksiran() {
    document.getElementById('val-a').innerText = valA.toString().replace('.', ',');
    document.getElementById('val-b').innerText = valB.toString().replace('.', ',');

    const op = document.getElementById('op-select').value;

    // Pembulatan Terdekat
    const roundA = Math.round(valA);
    const roundB = Math.round(valB);

    let resTaksiran = 0;
    let resEksak = 0;

    if (op === '+') {
        resTaksiran = roundA + roundB;
        resEksak = valA + valB;
    } else if (op === '-') {
        resTaksiran = roundA - roundB;
        resEksak = valA - valB;
    } else if (op === '*') {
        resTaksiran = roundA * roundB;
        resEksak = valA * valB;
    }

    document.getElementById('step-detail-text').innerText = `A: ${valA.toString().replace('.', ',')} ➡️ ${roundA} | B: ${valB.toString().replace('.', ',')} ➡️ ${roundB}`;
    document.getElementById('eq-taksiran').innerText = `${roundA} ${op === '*' ? '×' : op} ${roundB}`;
    document.getElementById('res-taksiran').innerText = resTaksiran;
    
    document.getElementById('final-taksiran').innerText = resTaksiran;
    document.getElementById('final-eksak').innerText = parseFloat(resEksak.toFixed(2)).toString().replace('.', ',');
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
    calculateTaksiran();
    loadQuestion();
};
