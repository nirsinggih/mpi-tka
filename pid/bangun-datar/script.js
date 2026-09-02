// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Data Bangun Datar untuk Simulasi
const shapesData = {
    square: {
        title: "Persegi",
        desc: "Memiliki 4 sisi sama panjang dan 4 sudut siku-siku (90°).",
        sides: 4,
        angles: 4,
        svg: '<rect x="40" y="40" width="120" height="120" fill="#10b981" stroke="#047857" stroke-width="4" />'
    },
    rect: {
        title: "Persegi Panjang",
        desc: "Memiliki 2 pasang sisi sejajar yang sama panjang dan 4 sudut siku-siku.",
        sides: 4,
        angles: 4,
        svg: '<rect x="20" y="50" width="160" height="100" fill="#06b6d4" stroke="#0e7490" stroke-width="4" />'
    },
    triangle: {
        title: "Segitiga",
        desc: "Bangun datar dengan 3 sisi dan 3 titik sudut.",
        sides: 3,
        angles: 3,
        svg: '<polygon points="100,30 30,160 170,160" fill="#ef4444" stroke="#b91c1c" stroke-width="4" />'
    },
    circle: {
        title: "Lingkaran",
        desc: "Bangun datar tak berhingga sisi lurus, dibatasi 1 garis lengkung bundar.",
        sides: "1 (lengkung)",
        angles: 0,
        svg: '<circle cx="100" cy="100" r="75" fill="#f59e0b" stroke="#b45309" stroke-width="4" />'
    },
    rhombus: {
        title: "Belah Ketupat",
        desc: "Memiliki 4 sisi sama panjang dengan sudut berhadapan sama besar (bukan siku-siku).",
        sides: 4,
        angles: 4,
        svg: '<polygon points="100,20 170,100 100,180 30,100" fill="#8b5cf6" stroke="#6d28d9" stroke-width="4" />'
    },
    trapezoid: {
        title: "Trapesium",
        desc: "Memiliki tepat 1 pasang sisi yang sejajar.",
        sides: 4,
        angles: 4,
        svg: '<polygon points="50,40 150,40 180,160 20,160" fill="#ec4899" stroke="#be185d" stroke-width="4" />'
    }
};

// Bank Soal Bangun Datar
const questions = [
    {
        q: "Bangun datar yang memiliki 3 sisi dan 3 titik sudut adalah...",
        options: ["Persegi", "Segitiga", "Trapesium", "Lingkaran"],
        answer: 1
    },
    {
        q: "Manakah bangun datar di bawah ini yang dibatasi oleh 1 garis lengkung?",
        options: ["Belah Ketupat", "Jajar Genjang", "Lingkaran", "Persegi Panjang"],
        answer: 2
    },
    {
        q: "Persegi memiliki ... sisi yang sama panjang.",
        options: ["2", "3", "4", "6"],
        answer: 2
    },
    {
        q: "Bangun segi empat yang hanya memiliki tepat SATU pasang sisi sejajar dinamakan...",
        options: ["Trapesium", "Persegi Panjang", "Jajar Genjang", "Belah Ketupat"],
        answer: 0
    },
    {
        q: "Ciri khas utama dari Persegi Panjang dibandingkan Persegi adalah...",
        options: ["Tidak punya sudut siku-siku", "Sisi yang berhadapan saja yang sama panjang", "Memiliki 3 sisi", "Satu sisinya melengkung"],
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

// Visual Shape Selector
function selectShape(key, btnElement) {
    document.querySelectorAll('.btn-shape').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const data = shapesData[key];
    document.getElementById('info-title').innerText = data.title;
    document.getElementById('info-desc').innerText = data.desc;

    document.getElementById('display-title').innerText = `Visual Bentuk: ${data.title}`;
    document.getElementById('shape-svg').innerHTML = data.svg;
    document.getElementById('stat-sides').innerText = data.sides;
    document.getElementById('stat-angles').innerText = data.angles;
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
    loadQuestion();
};
