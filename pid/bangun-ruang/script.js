// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Data Grid Proyeksi 3x3 (1 = Terisi, 0 = Kosong)
const modelsData = {
    tangga: {
        name: "Bentuk Tangga",
        info: "Konstruksi bertingkat 3 baris dari rendah ke tinggi.",
        depan: [
            [0,0,1],
            [0,1,1],
            [1,1,1]
        ],
        atas: [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ],
        samping: [
            [0,0,1],
            [0,1,1],
            [1,1,1]
        ]
    },
    piramida: {
        name: "Piramida Bertingkat",
        info: "Konstruksi simetris bertingkat dengan puncak di tengah.",
        depan: [
            [0,1,0],
            [1,1,1],
            [1,1,1]
        ],
        atas: [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ],
        samping: [
            [0,1,0],
            [1,1,1],
            [1,1,1]
        ]
    },
    hurufL: {
        name: "Blok Huruf L",
        info: "Konstruksi membentuk sudut siku-siku seperti huruf L.",
        depan: [
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ],
        atas: [
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ],
        samping: [
            [0,0,1],
            [0,0,1],
            [1,1,1]
        ]
    },
    terowongan: {
        name: "Blok Berlubang",
        info: "Konstruksi blok dengan bagian tengah bawah terbuka.",
        depan: [
            [1,1,1],
            [1,0,1],
            [1,0,1]
        ],
        atas: [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ],
        samping: [
            [1,1,1],
            [1,1,1],
            [1,1,1]
        ]
    }
};

// Bank Soal Visualisasi Spasial
const questions = [
    {
        q: "Jika sebuah kubus dilihat tepat dari arah atas, bentuk bangun datar yang terlihat adalah...",
        options: ["Persegi", "Segitiga", "Persegi Panjang", "Lingkaran"],
        answer: 0
    },
    {
        q: "Sebuah tabung diletakkan berdiri tegak. Dari arah samping, bentuk proyeksi yang terlihat adalah...",
        options: ["Lingkaran", "Persegi Panjang", "Segitiga", "Oval"],
        answer: 1
    },
    {
        q: "Kerucut jika dilihat dari arah bawah (alasnya) akan tampak berbentuk...",
        options: ["Segitiga", "Lingkaran", "Trapesium", "Persegi"],
        answer: 1
    },
    {
        q: "Sebuah limas segi empat jika dilihat langsung dari tampak atas akan kelihatan berupa...",
        options: ["Persegi dengan silang garis diagonal", "Segitiga sama kaki", "Lingkaran kecil", "Persegi panjang polos"],
        answer: 0
    },
    {
        q: "Kemampuan membayangkan tampilan objek 3D dari berbagai arah pandang dinamakan...",
        options: ["Kalkulasi Luas", "Visualisasi Spasial", "Simetri Putar", "Rotasi Angka"],
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

// Select Model & Render Proyeksi Grid
function selectModel(key, btnElement) {
    document.querySelectorAll('.btn-model').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const model = modelsData[key];
    document.getElementById('model-name').innerText = model.name;
    document.getElementById('model-info').innerText = model.info;

    renderGrid('grid-depan', model.depan, 'filled-depan');
    renderGrid('grid-atas', model.atas, 'filled-atas');
    renderGrid('grid-samping', model.samping, 'filled-samping');
}

function renderGrid(containerId, matrix, fillClass) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (matrix[r][c] === 1) {
                cell.classList.add(fillClass);
            }
            container.appendChild(cell);
        }
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
    selectModel('tangga', document.querySelector('.btn-model.active'));
    loadQuestion();
};
