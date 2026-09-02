// State Simulasi
let val = 2;

// Nama Satuan & Tingkatannya (0: ml, 1: cl, 2: dl, 3: l, 4: dal, 5: hl, 6: kl)
const units = ["ml", "cl", "dl", "l", "dal", "hl", "kl"];

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Satuan Volume Baku
const questions = [
    {
        q: "Hasil konversi dari 3 liter (l) ke mililiter (ml) adalah...",
        options: ["30 ml", "300 ml", "3.000 ml", "30.000 ml"],
        answer: 2
    },
    {
        q: "Sebuah botol berisi 500 ml air. Nilai tersebut sama dengan...",
        options: ["5 liter", "0,5 liter", "50 liter", "0,05 liter"],
        answer: 1
    },
    {
        q: "Satuan volume 1 liter nilainya setara dengan...",
        options: ["1 cm³", "1 m³", "1 dm³", "1 mm³"],
        answer: 2
    },
    {
        q: "Hasil dari 2 kl + 500 liter dalam satuan liter (l) adalah...",
        options: ["700 liter", "2.500 liter", "502 liter", "25.000 liter"],
        answer: 1
    },
    {
        q: "Satuan 1 mililiter (ml) sering disingkat dan setara dengan...",
        options: ["1 cc (cm³)", "1 dm³", "1 m³", "10 l"],
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
