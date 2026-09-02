// State Simulasi
let numA = 24;
let numB = 6;
let currentOp = 'add'; // 'add', 'sub', 'mul', 'div'

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Operasi Hitung Bilangan Cacah
const questions = [
    {
        q: "Berapakah hasil dari 125 + 75 - 50?",
        options: ["150", "200", "125", "175"],
        answer: 0
    },
    {
        q: "Hasil perhitungan dari 15 + 5 × 4 adalah...",
        options: ["80", "35", "60", "45"],
        answer: 1
    },
    {
        q: "Sebuah toko memiliki 8 kotak pensil. Setiap kotak berisi 12 pensil. Berapa total pensil?",
        options: ["84", "96", "108", "72"],
        answer: 1
    },
    {
        q: "Hasil dari (40 - 10) ÷ 5 adalah...",
        options: ["6", "38", "8", "12"],
        answer: 0
    },
    {
        q: "Pak Budi membagikan 144 kelereng secara merata kepada 12 anak. Berapa kelereng yang diterima setiap anak?",
        options: ["10", "14", "12", "16"],
        answer: 2
    }
];

// Navigation Switch
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// Adjust Numbers
function adjustValue(type, change) {
    if (type === 'numA') numA = Math.max(0, Math.min(200, numA + change));
    if (type === 'numB') numB = Math.max(1, Math.min(50, numB + change)); // B minimal 1 mencegah pembagian 0

    updateCalculatorUI();
}

// Set Operation Type
function setOp(op, element) {
    currentOp = op;
    document.querySelectorAll('.btn-op').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    updateCalculatorUI();
}

function updateCalculatorUI() {
    document.getElementById('numA-val').innerText = numA;
    document.getElementById('numB-val').innerText = numB;

    let res = 0;
    let opSymbol = '+';
    let desc = '';

    if (currentOp === 'add') {
        opSymbol = '+';
        res = numA + numB;
        desc = `Penjumlahan: Menggabungkan ${numA} dan ${numB}.`;
    } else if (currentOp === 'sub') {
        opSymbol = '-';
        // Memastikan hasil tidak negatif untuk bilangan cacah
        if (numA < numB) numA = numB;
        document.getElementById('numA-val').innerText = numA;
        res = numA - numB;
        desc = `Pengurangan: Mengurangi ${numA} sebanyak ${numB}.`;
    } else if (currentOp === 'mul') {
        opSymbol = '×';
        res = numA * numB;
        desc = `Perkalian: Menjumlahkan ${numB} sebanyak ${numA} kali.`;
    } else if (currentOp === 'div') {
        opSymbol = '÷';
        res = (numA / numB).toFixed(2);
        if (numA % numB === 0) res = numA / numB; // Tampilkan bulat jika tidak ada sisa
        desc = `Pembagian: Membagi ${numA} ke dalam ${numB} kelompok sama rata.`;
    }

    document.getElementById('display-eq').innerText = `${numA} ${opSymbol} ${numB}`;
    document.getElementById('display-result').innerText = res;
    document.getElementById('visual-desc').innerText = desc;
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
