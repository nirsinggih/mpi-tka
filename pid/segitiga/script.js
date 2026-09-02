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
   DATA SOAL
================================ */

const questions = [

    {
        question:
            "Segitiga memiliki berapa sisi?",

        answers: [
            "2 sisi",
            "3 sisi",
            "4 sisi",
            "5 sisi"
        ],

        correct: 1
    },

    {
        question:
            "Rumus keliling segitiga adalah...",

        answers: [
            "K = a + b + c",
            "K = a × t",
            "K = ½ × a × t",
            "K = s × s"
        ],

        correct: 0
    },

    {
        question:
            "Sebuah segitiga memiliki sisi 5 cm, 6 cm, dan 7 cm. Kelilingnya adalah...",

        answers: [
            "12 cm",
            "15 cm",
            "18 cm",
            "30 cm"
        ],

        correct: 2
    },

    {
        question:
            "Rumus luas segitiga adalah...",

        answers: [
            "L = a × t",
            "L = ½ × a × t",
            "L = s × s",
            "L = π × r²"
        ],

        correct: 1
    },

    {
        question:
            "Segitiga dengan tiga sisi sama panjang disebut...",

        answers: [
            "Segitiga siku-siku",
            "Segitiga sembarang",
            "Segitiga sama sisi",
            "Segitiga sama kaki"
        ],

        correct: 2
    },

    {
        question:
            "Segitiga yang memiliki satu sudut 90° disebut...",

        answers: [
            "Segitiga sama sisi",
            "Segitiga siku-siku",
            "Segitiga sembarang",
            "Segitiga lancip"
        ],

        correct: 1
    },

    {
        question:
            "Sebuah segitiga memiliki alas 10 cm dan tinggi 6 cm. Luasnya adalah...",

        answers: [
            "16 cm²",
            "30 cm²",
            "60 cm²",
            "80 cm²"
        ],

        correct: 1
    },

    {
        question:
            "Segitiga memiliki berapa titik sudut?",

        answers: [
            "2",
            "3",
            "4",
            "5"
        ],

        correct: 1
    },

    {
        question:
            "Jika sisi segitiga adalah 8 cm, 8 cm, dan 5 cm, jenis segitiga tersebut adalah...",

        answers: [
            "Segitiga sama sisi",
            "Segitiga sama kaki",
            "Segitiga siku-siku",
            "Segitiga sembarang"
        ],

        correct: 1
    },

    {
        question:
            "Satuan yang tepat untuk luas segitiga adalah...",

        answers: [
            "cm",
            "cm²",
            "cm³",
            "kg"
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
   LOAD QUESTION
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
            "❌ Jawaban belum tepat! Lihat jawaban hijau.";

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
   UPDATE SCORE
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
   HASIL
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
