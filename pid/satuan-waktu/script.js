// State Simulasi
let val = 2;

// Nilai faktor konversi relatif ke satuan terkecil (Detik)
const timeInSeconds = {
    detik: 1,
    menit: 60,
    jam: 3600,
    hari: 86400,
    pekan: 604800,       // 7 hari
    bulan: 2592000,      // 30 hari
    tahun: 31536000      // 365 hari
};

const unitLabels = {
    detik: "Detik",
    menit: "Menit",
    jam: "Jam",
    hari: "Hari",
    pekan: "Pekan",
    bulan: "Bulan",
    tahun: "Tahun"
};

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Satuan Waktu
const questions = [
    {
        q: "Hasil dari 3 jam jika diubah ke dalam satuan menit adalah...",
        options: ["120 menit", "180 menit", "300 menit", "360 menit"],
        answer: 1
    },
    {
        q: "Siswa belajar di sekolah selama 300 menit. Berapa jam durasi belajar tersebut?",
        options: ["3 jam", "4 jam", "5 jam", "6 jam"],
        answer: 2
    },
    {
        q: "Sebuah acara berlangsung selama 2 pekan. Durasi acara tersebut setara dengan...",
        options: ["10 hari", "14 hari", "24 hari", "30 hari"],
        answer: 1
    },
    {
        q: "1 jam 15 menit jika diubah seluruhnya ke dalam satuan detik menjadi...",
        options: ["4.500 detik", "3.615 detik", "75 detik", "2.700 detik"],
        answer: 0
    },
    {
        q: "Jumlah bulan dalam waktu 4 tahun adalah...",
        options: ["40 bulan", "48 bulan", "52 bulan", "60 bulan"],
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

// Adjust Input Value
function adjustValue(change) {
    val = Math.max(1, Math.min(100, val + change));
    updateConversionUI();
}

function updateConversionUI() {
    document.getElementById('input-val').innerText = val;

    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;

    const totalSeconds = val * timeInSeconds[fromUnit];
    const convertedVal = totalSeconds / timeInSeconds[toUnit];

    // Format tampilan angka pecahan desimal maksimal 2 tempat
    const displayRes = Number.isInteger(convertedVal) ? convertedVal : convertedVal.toFixed(2);

    document.getElementById('eq-from').innerText = `${val} ${unitLabels[fromUnit]}`;
    document.getElementById('eq-to').innerText = `${displayRes} ${unitLabels[toUnit]}`;
    document.getElementById('final-result').innerText = `${displayRes} ${unitLabels[toUnit]}`;

    // Penjelasan Langkah
    let stepText = "";
    if (timeInSeconds[fromUnit] > timeInSeconds[toUnit]) {
        const factor = timeInSeconds[fromUnit] / timeInSeconds[toUnit];
        stepText = `Satuan lebih besar ke kecil ➡️ Dikali ${factor.toLocaleString()}`;
    } else if (timeInSeconds[fromUnit] < timeInSeconds[toUnit]) {
        const factor = timeInSeconds[toUnit] / timeInSeconds[fromUnit];
        stepText = `Satuan lebih kecil ke besar ➡️ Dibagi ${factor.toLocaleString()}`;
    } else {
        stepText = "Satuan sama → Nilai tidak berubah.";
    }

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
