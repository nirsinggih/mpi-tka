// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Pecahan Senilai
const questions = [
    {
        q: "Manakah pecahan di bawah ini yang SENILAI dengan 1/2?",
        options: ["2/4", "2/3", "3/5", "1/4"],
        answer: 0
    },
    {
        q: "Jika pembilang dan penyebut dari 2/3 dikalikan 3, maka pecahan senilainya adalah...",
        options: ["4/6", "6/9", "5/6", "6/6"],
        answer: 1
    },
    {
        q: "Bentuk paling sederhana (pecahan senilai pembagian) dari 4/8 adalah...",
        options: ["2/3", "1/4", "1/2", "3/4"],
        answer: 2
    },
    {
        q: "Gambar potongan pizza memperlihatkan 3/6 bagian. Pecahan ini nilainya sama dengan...",
        options: ["1/3", "1/2", "2/5", "3/4"],
        answer: 1
    },
    {
        q: "Isilah titik-titik berikut: 3/5 = .../15",
        options: ["6", "9", "12", "5"],
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

// Simulasi Visual SVG Lingkaran Interaktif
function setMultiplier(n, element) {
    document.querySelectorAll('.btn-factor').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const num = 1 * n;
    const den = 2 * n;

    // Update Teks Simbol Matematika
    document.getElementById('math-process-text').innerHTML = 
        `(${1} × ${n}) / (${2} × ${n}) = <strong>${num}/${den}</strong>`;
    
    document.getElementById('visual-caption').innerText = 
        `${num} dari ${den} Bagian Diarsir (${num}/${den})`;

    drawPieChart(num, den);
}

function drawPieChart(shaded, total) {
    const svg = document.getElementById('pie-chart');
    svg.innerHTML = ''; // Clear SVG

    const cx = 50, cy = 50, r = 45;
    let startAngle = 0;

    for (let i = 0; i < total; i++) {
        const angle = 360 / total;
        const endAngle = startAngle + angle;

        const x1 = cx + r * Math.cos(Math.PI * startAngle / 180);
        const y1 = cy + r * Math.sin(Math.PI * startAngle / 180);
        const x2 = cx + r * Math.cos(Math.PI * endAngle / 180);
        const y2 = cy + r * Math.sin(Math.PI * endAngle / 180);

        const largeArc = angle > 180 ? 1 : 0;
        const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', i < shaded ? '#e11d48' : '#e2e8f0');
        path.setAttribute('stroke', '#ffffff');
        path.setAttribute('stroke-width', '1.5');

        svg.appendChild(path);
        startAngle = endAngle;
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
    drawPieChart(1, 2);
    loadQuestion();
};
