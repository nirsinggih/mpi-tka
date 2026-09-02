// State Data Frekuensi Nilai Ulangan
let scoreData = {
    n70: 5,
    n80: 8,
    n90: 4,
    n100: 3
};

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Pengambilan Informasi & Penggunaan Data
const questions = [
    {
        q: "Diketahui data siswa yang menyukai olahraga: Sepak Bola 12, Voli 8, Basket 10. Jumlah seluruh siswa adalah...",
        options: ["20 siswa", "30 siswa", "25 siswa", "32 siswa"],
        answer: 1
    },
    {
        q: "Diketahui data penjualan es krim: Cokelat 15, Vaniila 10, Stroberi 22. Modus jenis es krim tersebut adalah...",
        options: ["Cokelat", "Vaniila", "Stroberi", "Tidak ada"],
        answer: 2
    },
    {
        q: "Nilai ulangan terbanyak diperoleh 12 siswa dan terendah diperoleh 3 siswa. Selisih terbanyak dan terendah adalah...",
        options: ["9 siswa", "15 siswa", "4 siswa", "8 siswa"],
        answer: 0
    },
    {
        q: "Data tinggi badan (cm): 130, 135, 130, 140, 135, 130. Tinggi badan yang paling sering muncul adalah...",
        options: ["130 cm", "135 cm", "140 cm", "125 cm"],
        answer: 0
    },
    {
        q: "Langkah pertama untuk menghitung selisih antara data terbesar dan terkecil adalah...",
        options: ["Menjumlahkan semua data", "Mengurangkan nilai maksimum dengan minimum", "Membagi dua seluruh data", "Mengalikan frekuensi"],
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

// Adjust Score Values
function adjustScore(key, change) {
    scoreData[key] = Math.max(1, Math.min(20, scoreData[key] + change));
    document.getElementById(`val-${key}`).innerText = scoreData[key];

    calculateInfo();
}

function calculateInfo() {
    const n70 = scoreData.n70;
    const n80 = scoreData.n80;
    const n90 = scoreData.n90;
    const n100 = scoreData.n100;

    // Total
    const total = n70 + n80 + n90 + n100;

    // Array Kategori
    const list = [
        { label: "Nilai 70", val: n70 },
        { label: "Nilai 80", val: n80 },
        { label: "Nilai 90", val: n90 },
        { label: "Nilai 100", val: n100 }
    ];

    // Sort untuk mencari max (modus) dan min
    list.sort((a, b) => b.val - a.val);

    const modus = list[0];
    const min = list[list.length - 1];
    const selisih = modus.val - min.val;

    document.getElementById('res-total').innerText = `${total} Siswa`;
    document.getElementById('res-modus').innerText = `${modus.label} (${modus.val} Anak)`;
    document.getElementById('res-min').innerText = `${min.label} (${min.val} Anak)`;
    document.getElementById('res-selisih').innerText = `${selisih} Siswa`;
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
    calculateInfo();
    loadQuestion();
};
