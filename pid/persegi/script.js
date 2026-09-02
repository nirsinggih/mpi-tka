/* ===============================
   NAVIGASI HALAMAN
================================ */

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


/* ===============================
   DATA SOAL KUIS
================================ */

const questions = [

    {
        question:
            "Persegi memiliki berapa sisi?",

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
            "Bagaimana panjang keempat sisi pada persegi?",

        answers: [
            "Berbeda semua",
            "Dua sisi sama",
            "Semua sama panjang",
            "Tidak memiliki sisi"
        ],

        correct: 2
    },


    {
        question:
            "Rumus keliling persegi adalah...",

        answers: [
            "K = s × s",
            "K = 4 × s",
            "K = p × l",
            "K = s + 1"
        ],

        correct: 1
    },


    {
        question:
            "Rumus luas persegi adalah...",

        answers: [
            "L = s × s",
            "L = 4 × s",
            "L = p + l",
            "L = 2 × s"
        ],

        correct: 0
    },


    {
        question:
            "Sebuah persegi memiliki sisi 5 cm. Luasnya adalah...",

        answers: [
            "10 cm²",
            "20 cm²",
            "25 cm²",
            "30 cm²"
        ],

        correct: 2
    },


    {
        question:
            "Sebuah persegi memiliki sisi 8 cm. Kelilingnya adalah...",

        answers: [
            "16 cm",
            "24 cm",
            "32 cm",
            "64 cm"
        ],

        correct: 2
    },


    {
        question:
            "Persegi memiliki berapa sudut siku-siku?",

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
            "Jika panjang sisi persegi adalah 10 cm, luasnya adalah...",

        answers: [
            "20 cm²",
            "40 cm²",
            "100 cm²",
            "1000 cm²"
        ],

        correct: 2
    },


    {
        question:
            "Jika keliling persegi adalah 24 cm, panjang satu sisinya adalah...",

        answers: [
            "4 cm",
            "6 cm",
            "8 cm",
            "12 cm"
        ],

        correct: 1
    },


    {
        question:
            "Satuan yang tepat untuk menyatakan luas persegi adalah...",

        answers: [
            "cm",
            "cm²",
            "cm³",
            "liter"
        ],

        correct: 1
    }

];


/* ===============================
   VARIABEL QUIZ
================================ */

let currentQuestion = 0;

let currentTeam = "red";

let scoreRed = 0;

let scoreBlue = 0;

let answered = false;


/* ===============================
   MULAI QUIZ
================================ */

function startQuiz() {

    currentQuestion = 0;

    currentTeam = "red";

    scoreRed = 0;

    scoreBlue = 0;

    updateScore();

    showPage("quiz");

    loadQuestion();

}


/* ===============================
   TAMPILKAN SOAL
================================ */

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


/* ===============================
   CEK JAWABAN
================================ */

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


/* ===============================
   UPDATE SKOR
================================ */

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


/* ===============================
   HASIL PERTANDINGAN
================================ */

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


/* ===============================
   RESET
================================ */

function resetAll() {

    currentQuestion = 0;

    currentTeam = "red";

    scoreRed = 0;

    scoreBlue = 0;

    updateScore();

    showPage("home");

          }
