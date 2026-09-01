/* ==========================================
   NAVIGASI HALAMAN
========================================== */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
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


/* ==========================================
   DATA SOAL
========================================== */

const questions = [

    {
        question:
            "Sebuah lingkaran memiliki jari-jari 7 cm. Berapakah kelilingnya?",

        answers: [
            "22 cm",
            "44 cm",
            "49 cm",
            "154 cm"
        ],

        correct: 1
    },

    {
        question:
            "Rumus luas lingkaran adalah...",

        answers: [
            "L = π × r²",
            "L = 2 × π × r",
            "L = π × d",
            "L = r + r"
        ],

        correct: 0
    },

    {
        question:
            "Diameter sebuah lingkaran dengan jari-jari 10 cm adalah...",

        answers: [
            "5 cm",
            "10 cm",
            "20 cm",
            "100 cm"
        ],

        correct: 2
    },

    {
        question:
            "Sebuah lingkaran memiliki diameter 14 cm. Berapakah kelilingnya?",

        answers: [
            "22 cm",
            "44 cm",
            "49 cm",
            "154 cm"
        ],

        correct: 1
    },

    {
        question:
            "Sebuah lingkaran memiliki jari-jari 7 cm. Berapakah luasnya?",

        answers: [
            "44 cm²",
            "77 cm²",
            "154 cm²",
            "308 cm²"
        ],

        correct: 2
    },

    {
        question:
            "Jari-jari adalah...",

        answers: [
            "Jarak dari pusat ke tepi lingkaran",
            "Garis terpanjang lingkaran",
            "Panjang seluruh tepi lingkaran",
            "Daerah di dalam lingkaran"
        ],

        correct: 0
    },

    {
        question:
            "Jika diameter lingkaran 20 cm, maka jari-jarinya adalah...",

        answers: [
            "5 cm",
            "10 cm",
            "20 cm",
            "40 cm"
        ],

        correct: 1
    },

    {
        question:
            "Keliling lingkaran dapat dihitung dengan rumus...",

        answers: [
            "K = π × r²",
            "K = 2 × π × r",
            "K = r × r",
            "K = d ÷ 2"
        ],

        correct: 1
    },

    {
        question:
            "Sebuah lingkaran memiliki jari-jari 14 cm. Nilai π yang cocok digunakan adalah...",

        answers: [
            "1,14",
            "2,14",
            "3,14",
            "22/7"
        ],

        correct: 3
    },

    {
        question:
            "Satuan yang tepat untuk luas lingkaran adalah...",

        answers: [
            "cm",
            "cm²",
            "cm³",
            "liter"
        ],

        correct: 1
    }

];


/* ==========================================
   VARIABEL QUIZ
========================================== */

let currentQuestion = 0;

let currentTeam = "red";

let scoreRed = 0;

let scoreBlue = 0;

let answered = false;


/* ==========================================
   MULAI QUIZ
========================================== */

function startQuiz() {

    currentQuestion = 0;

    currentTeam = "red";

    scoreRed = 0;

    scoreBlue = 0;

    updateScore();

    showPage("quiz");

    loadQuestion();

}


/* ==========================================
   LOAD QUESTION
========================================== */

function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    document
        .getElementById("questionNumber")
        .textContent =
        currentQuestion + 1;

    document
        .getElementById("questionText")
        .textContent =
        question.question;


    /* TURN */

    const turnIndicator =
        document.getElementById("turnIndicator");

    if (currentTeam === "red") {

        turnIndicator.textContent =
            "🔴 GILIRAN TIM MERAH";

        turnIndicator.style.background =
            "#ef4444";

    } else {

        turnIndicator.textContent =
            "🔵 GILIRAN TIM BIRU";

        turnIndicator.style.background =
            "#2563eb";

    }


    /* ANSWERS */

    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.classList.add("answer-btn");

        button.textContent = answer;

        button.onclick = () => {

            checkAnswer(index);

        };

        answersContainer.appendChild(button);

    });


    document
        .getElementById("feedback")
        .textContent = "";

}


/* ==========================================
   CHECK ANSWER
========================================== */

function checkAnswer(selectedAnswer) {

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


    /* BENAR */

    if (selectedAnswer === question.correct) {

        buttons[selectedAnswer]
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


    /* SALAH */

    else {

        buttons[selectedAnswer]
            .classList
            .add("wrong");


        buttons[question.correct]
            .classList
            .add("correct");


        feedback.textContent =
            "❌ Belum tepat. Jawaban yang benar ditandai hijau.";

    }


    updateScore();


    /* PINDAH SOAL */

    setTimeout(() => {

        currentQuestion++;


        /* SELESAI */

        if (currentQuestion >= questions.length) {

            showResult();

            return;

        }


        /* GANTI TIM */

        if (currentTeam === "red") {

            currentTeam = "blue";

        } else {

            currentTeam = "red";

        }


        loadQuestion();

    }, 2200);

}


/* ==========================================
   UPDATE SCORE
========================================== */

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


/* ==========================================
   HASIL QUIZ
========================================== */

function showResult() {

    document
        .getElementById("finalRed")
        .textContent =
        scoreRed;


    document
        .getElementById("finalBlue")
        .textContent =
        scoreBlue;


    const winnerText =
        document.getElementById("winnerText");


    if (scoreRed > scoreBlue) {

        winnerText.innerHTML =
            "🏆 SELAMAT! TIM MERAH MENANG! 🔴";


    }

    else if (scoreBlue > scoreRed) {

        winnerText.innerHTML =
            "🏆 SELAMAT! TIM BIRU MENANG! 🔵";


    }

    else {

        winnerText.innerHTML =
            "🤝 HASIL IMBANG! KALIAN SAMA HEBATNYA!";

    }


    showPage("result");

}


/* ==========================================
   RESET SEMUA
========================================== */

function resetAll() {

    currentQuestion = 0;

    currentTeam = "red";

    scoreRed = 0;

    scoreBlue = 0;

    updateScore();

    showPage("home");

      }
