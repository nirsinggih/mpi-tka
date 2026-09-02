// State Data Frekuensi Buah
let fruitData = {
    apel: 4,
    jeruk: 6,
    pisang: 3
};

let currentMode = 'tabel'; // 'tabel', 'piktogram', 'batang'

// State Kuis & Skor
let scoreA = 0;
let scoreB = 0;
let currentQuestionIndex = 0;

// Bank Soal Penyajian Data
const questions = [
    {
        q: "Bentuk penyajian data yang menggunakan gambar atau simbol dinamakan...",
        options: ["Tabel Frekuensi", "Diagram Batang", "Piktogram", "Diagram Garis"],
        answer: 2
    },
    {
        q: "Pada piktogram, jika 1 gambar buku mewakili 5 buku, maka 4 gambar buku menyatakan...",
        options: ["9 buku", "15 buku", "20 buku", "25 buku"],
        answer: 2
    },
    {
        q: "Pada diagram batang, tinggi atau panjang batang menunjukkan...",
        options: ["Kategori Data", "Frekuensi / Jumlah Data", "Judul Data", "Nomor Urut"],
        answer: 1
    },
    {
        q: "Data terbanyak yang paling sering muncul dalam penyajian data disebut...",
        options: ["Mean", "Modus", "Median", "Tabel"],
        answer: 1
    },
    {
        q: "Siswa kelas 5 mendata buah favorit: Apel 5, Jeruk 8, Pisang 4. Modus dari data tersebut adalah...",
        options: ["Apel", "Jeruk", "Pisang", "Semua sama"],
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

// Adjust Fruit Quantities
function adjustFruit(type, change) {
    fruitData[type] = Math.max(1, Math.min(10, fruitData[type] + change));
    document.getElementById(`val-${type}`).innerText = fruitData[type];

    renderVisual();
}

// Switch Mode View
function setMode(mode, element) {
    currentMode = mode;
    document.querySelectorAll('.btn-mode').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    const titles = {
        tabel: "Penyajian Data: Tabel Frekuensi",
        piktogram: "Penyajian Data: Piktogram (Gambar)",
        batang: "Penyajian Data: Diagram Batang"
    };
    document.getElementById('display-title').innerText = titles[mode];

    renderVisual();
}

// Dynamic Rendering Engine
function renderVisual() {
    const area = document.getElementById('visual-render-area');
    area.innerHTML = '';

    if (currentMode === 'tabel') {
        const table = document.createElement('table');
        table.className = 'data-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nama Buah</th>
                    <th>Banyaknya (Frekuensi)</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>🍎 Apel</td><td>${fruitData.apel}</td></tr>
                <tr><td>🍊 Jeruk</td><td>${fruitData.jeruk}</td></tr>
                <tr><td>🍌 Pisang</td><td>${fruitData.pisang}</td></tr>
            </tbody>
        `;
        area.appendChild(table);

    } else if (currentMode === 'piktogram') {
        const container = document.createElement('div');
        container.className = 'piktogram-container';

        const items = [
            { name: "Apel", icon: "🍎", count: fruitData.apel },
            { name: "Jeruk", icon: "🍊", count: fruitData.jeruk },
            { name: "Pisang", icon: "🍌", count: fruitData.pisang }
        ];

        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'pikto-row';
            row.innerHTML = `
                <div class="pikto-label">${item.name}</div>
                <div class="pikto-icons">${item.icon.repeat(item.count)}</div>
            `;
            container.appendChild(row);
        });

        area.appendChild(container);

    } else if (currentMode === 'batang') {
        const container = document.createElement('div');
        container.className = 'bar-chart-container';

        const items = [
            { name: "Apel", count: fruitData.apel },
            { name: "Jeruk", count: fruitData.jeruk },
            { name: "Pisang", count: fruitData.pisang }
        ];

        const maxVal = 10; // Max skala 10

        items.forEach(item => {
            const heightPercent = (item.count / maxVal) * 100;
            const wrapper = document.createElement('div');
            wrapper.className = 'bar-wrapper';
            wrapper.innerHTML = `
                <div class="bar" style="height: ${heightPercent}%;">${item.count}</div>
                <div class="bar-label">${item.name}</div>
            `;
            container.appendChild(wrapper);
        });

        area.appendChild(container);
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
    renderVisual();
    loadQuestion();
};
