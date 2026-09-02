/* =================================
   NAVIGASI
================================= */

function showPage(pageId) {

    document.querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    document
        .getElementById(pageId)
        .classList
        .add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =================================
   DATA SOAL
================================= */

const questions = [

    {
        question:
            "Persegi panjang memiliki berapa sisi?",

        answers: [
            "3 sisi",
            "4 sisi",
            "5 sisi",
            "6 sisi"
        ],

        correct: 1
    },

    {
        question:
            "Rumus luas persegi panjang adalah...",

        answers: [
            "L = p + l",
            "L = p × l",
            "L = 2 × p",
            "L = p × p"
        ],

        correct: 1
    },

    {
        question:
            "Rumus keliling persegi panjang adalah...",

        answers: [
            "K = p × l",
            "K = 2 × (p + l)",
            "K = p + l",
            "K = p²"
        ],

        correct: 1
    },

    {
        question:
            "Sebuah persegi panjang memiliki panjang 10 cm dan lebar 5 cm. Luasnya adalah...",

        answers: [
            "15 cm²",
            "30 cm²",
            "50 cm²",
            "100 cm²"
        ],

        correct: 2
    },

    {
        question:
            "Sebuah persegi panjang memiliki panjang 10 cm dan lebar 5 cm. Kelilingnya adalah...",

        answers: [
            "15 cm",
            "20 cm",
            "30 cm",
            "50 cm"
        ],

        correct: 2
    },

    {
        question:
            "Sisi yang lebih panjang pada persegi panjang disebut...",

        answers: [
            "Lebar",
            "Tinggi",
            "Panjang",
            "Diagonal"
        ],

        correct: 2
    },

    {
        question:
            "Persegi panjang memiliki berapa sudut siku-siku?",

        answers: [
            "1",
            "2",
            "3",
            "4"
        ],

        correct: 3
    },

    {
        question:
            "Jika panjang sebuah persegi panjang 12 cm dan lebarnya 4 cm, luasnya adalah...",

        answers: [
            "16 cm²",
            "32 cm²",
            "48 cm²",
            "96 cm²"
        ],

        correct: 2
    },

    {
        question:
            "Jika panjang sebuah persegi panjang 8 cm dan lebarnya 3 cm, kelilingnya adalah...",

        answers: [
            "11 cm",
            "16 cm",
            "22 cm",
            "24 cm"
        ],

        correct: 2
    },

    {
        question:
            "Satuan yang tepat untuk luas persegi panjang adalah...",

        answers: [
            "cm",
            "cm²",
            "cm³",
            "liter"
        ],

        correct: 1
    }

];


/* =================================
   VARIABEL QUIZ
================================= */

let currentQuestion = 0;
let currentTeam = "red";

let scoreRed = 0;
let scoreBlue = 0;

let answered = false;


/* =================================
   MULAI QUIZ
================================= */

function startQuiz() {

    currentQuestion = 0;

    currentTeam = "red";

    scoreRed = 0;
    scoreBlue = 0;

    updateScore();

    showPage("quiz");

    loadQuestion();

}


/* =================================
   TAMPILKAN SOAL
================================= */

function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];


    document
        .getElementById("questionNumber")
        .textContent =
        currentQuestion + 1;


    document
        .getElementById("questionText")
        .textContent =
        question.question;


    const turn =
        document.getElementById("turnIndicator");


    if (currentTeam === "red") {

        turn.textContent =
            "🔴 GILIRAN TIM MERAH";

        turn.style.background =
            "#ef4444";

    } else {

        turn.textContent =
            "🔵 GILIRAN TIM BIRU";

        turn.style.background =
            "#2563eb";

    }


    const container =
        document.getElementById("answers");

    container.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            answer;


        button.onclick = () => {

            checkAnswer(index);

        };


        container.appendChild(button);

    });


    document
        .getElementById("feedback")
        .textContent = "";

}


/* =================================
   CEK JAWABAN
================================= */

function checkAnswer(selected) {

    if (answered) return;

    answered = true;


    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(".answer-btn");


    buttons.forEach(button => {

        button.disabled = true;

    });


    const feedback =
        document.getElementById("feedback");


    if (selected === question.correct) {

        buttons[selected]
            .classList
            .add("correct");


        if (currentTeam === "red") {

            scoreRed += 10;

        } else {

            scoreBlue += 10;

        }


        feedback.textContent =
            "🎉 BENAR! +10 POIN";

    }

    else {

        buttons[selected]
            .classList
            .add("wrong");


        buttons[question.correct]
            .classList
            .add("correct");


        feedback.textContent =
            "❌ Belum tepat! Jawaban benar berwarna hijau.";

    }


    updateScore();


    setTimeout(() => {

        currentQuestion++;


        if (currentQuestion >= questions.length) {

            showResult();

            return;

        }


        if (currentTeam === "red") {

            currentTeam = "blue";

        } else {

            currentTeam = "red";

        }


        loadQuestion();

    }, 2200);

}


/* =================================
   UPDATE SKOR
================================= */

function updateScore() {

    document
        .getElementById("scoreRed")
        .textContent =
        scoreRed;


    document
        .getElementById("scoreBlue")
        .textContent =
        scoreBlue;

}


/* =================================
   HASIL
================================= */

function showResult() {

    document
        .getElementById("finalRed")
        .textContent =
        scoreRed;


    document
        .getElementById("finalBlue")
        .textContent =
        scoreBlue;


    const winner =
        document.getElementById("winnerText");


    if (scoreRed > scoreBlue) {

        winner.textContent =
            "🏆 SELAMAT! TIM MERAH MENANG! 🔴";

    }

    else if (scoreBlue > scoreRed) {

        winner.textContent =
            "🏆 SELAMAT! TIM BIRU MENANG! 🔵";

    }

    else {

        winner.textContent =
            "🤝 HASIL IMBANG! KALIAN SAMA HEBATNYA!";

    }


    showPage("result");

}


/* =================================
   RESET
================================= */

function resetAll() {

    currentQuestion = 0;

    currentTeam = "red";

    scoreRed = 0;

    scoreBlue = 0;

    updateScore();

    showPage("home");

                                }
