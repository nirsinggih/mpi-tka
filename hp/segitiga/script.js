// ===============================
// NAVIGASI HALAMAN
// ===============================

const pages =
    document.querySelectorAll(".page");

const navButtons =
    document.querySelectorAll(".nav-btn");


const pageProgress = {

    beranda: "1 / 4",

    materi: "2 / 4",

    contoh: "3 / 4",

    kuis: "4 / 4"

};


function showPage(
    pageId,
    button
) {

    pages.forEach(function(page) {

        page.classList.remove(
            "active-page"
        );

    });


    document
        .getElementById(pageId)
        .classList
        .add("active-page");


    navButtons.forEach(function(btn) {

        btn.classList.remove(
            "active"
        );

    });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    document
        .getElementById("progressText")
        .textContent =
        pageProgress[pageId];


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// ===============================
// MULAI BELAJAR
// ===============================

function goMateri() {

    const materiButton =
        document.querySelectorAll(
            ".nav-btn"
        )[1];


    showPage(
        "materi",
        materiButton
    );

}



// ===============================
// DATA SOAL KUIS
// ===============================

const questions = [

    {

        question:
            "Segitiga memiliki berapa sisi?",

        options: [

            "2 sisi",

            "3 sisi",

            "4 sisi",

            "5 sisi"

        ],

        answer: 1

    },


    {

        question:
            "Segitiga yang memiliki 3 sisi sama panjang disebut...",

        options: [

            "Segitiga sembarang",

            "Segitiga siku-siku",

            "Segitiga sama sisi",

            "Segitiga sama kaki"

        ],

        answer: 2

    },


    {

        question:
            "Sebuah segitiga memiliki sisi 5 cm, 7 cm, dan 8 cm. Berapakah kelilingnya?",

        options: [

            "18 cm",

            "20 cm",

            "21 cm",

            "40 cm"

        ],

        answer: 1

    },


    {

        question:
            "Rumus luas segitiga adalah...",

        options: [

            "L = alas × tinggi",

            "L = ½ × alas × tinggi",

            "L = sisi × sisi",

            "K = a + b + c"

        ],

        answer: 1

    },


    {

        question:
            "Sebuah segitiga memiliki alas 10 cm dan tinggi 6 cm. Berapakah luasnya?",

        options: [

            "16 cm²",

            "30 cm²",

            "60 cm²",

            "120 cm²"

        ],

        answer: 1

    }

];



// ===============================
// VARIABEL KUIS
// ===============================

let currentQuestion = 0;

let score = 0;

let answered = false;



// ===============================
// MULAI KUIS
// ===============================

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    answered = false;


    document
        .getElementById("quizStart")
        .classList
        .add("hidden");


    document
        .getElementById("resultContainer")
        .classList
        .add("hidden");


    document
        .getElementById("quizContainer")
        .classList
        .remove("hidden");


    showQuestion();

}



// ===============================
// TAMPILKAN SOAL
// ===============================

function showQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    document
        .getElementById("questionNumber")
        .textContent =
        "Soal " +
        (currentQuestion + 1) +
        " dari " +
        questions.length;


    document
        .getElementById("questionText")
        .textContent =
        question.question;


    document
        .getElementById("score")
        .textContent =
        score;


    const optionsContainer =
        document.getElementById(
            "optionsContainer"
        );


    optionsContainer.innerHTML = "";


    question.options.forEach(
        function(option, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.classList.add(
                "option"
            );


            button.textContent =
                option;


            button.onclick =
                function() {

                    selectAnswer(
                        index
                    );

                };


            optionsContainer.appendChild(
                button
            );

        }
    );


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "feedback";


    feedback.textContent =
        "";


    document
        .getElementById(
            "nextButton"
        )
        .classList
        .add("hidden");

}



// ===============================
// PILIH JAWABAN
// ===============================

function selectAnswer(
    selectedIndex
) {

    if (answered) {

        return;

    }


    answered = true;


    const correctAnswer =
        questions[currentQuestion]
        .answer;


    const optionButtons =
        document.querySelectorAll(
            ".option"
        );


    optionButtons.forEach(
        function(button, index) {

            button.disabled = true;


            if (
                index === correctAnswer
            ) {

                button.classList.add(
                    "correct"
                );

            }


            if (
                index === selectedIndex &&
                index !== correctAnswer
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.classList.add(
        "show"
    );


    if (
        selectedIndex === correctAnswer
    ) {

        score += 20;


        feedback.textContent =
            "🎉 Benar! Jawaban kamu tepat!";


        feedback.classList.add(
            "correct-feedback"
        );

    } else {

        feedback.textContent =
            "❌ Jawaban belum tepat. Coba pelajari lagi ya!";


        feedback.classList.add(
            "wrong-feedback"
        );

    }


    document
        .getElementById("score")
        .textContent =
        score;


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    nextButton.classList.remove(
        "hidden"
    );


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Lihat Hasil 🏆";

    } else {

        nextButton.textContent =
            "Soal Berikutnya ➡️";

    }

}



// ===============================
// SOAL BERIKUTNYA
// ===============================

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        showQuestion();

    } else {

        showResult();

    }

}



// ===============================
// HASIL KUIS
// ===============================

function showResult() {

    document
        .getElementById(
            "quizContainer"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "resultContainer"
        )
        .classList
        .remove("hidden");


    document
        .getElementById(
            "finalScore"
        )
        .textContent =
        score;


    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    if (score === 100) {

        resultMessage.textContent =
            "🏆 Luar biasa! Kamu sudah menguasai materi segitiga!";

    } else if (score >= 80) {

        resultMessage.textContent =
            "🎉 Hebat! Pemahamanmu tentang segitiga sangat baik!";

    } else if (score >= 60) {

        resultMessage.textContent =
            "👍 Bagus! Terus belajar agar semakin hebat.";

    } else {

        resultMessage.textContent =
            "💪 Jangan menyerah! Pelajari kembali materi lalu coba lagi.";

    }

}



// ===============================
// ULANGI KUIS
// ===============================

function restartQuiz() {

    document
        .getElementById(
            "resultContainer"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "quizStart"
        )
        .classList
        .remove("hidden");


    score = 0;

    currentQuestion = 0;


    document
        .getElementById(
            "score"
        )
        .textContent =
        "0";

      }
