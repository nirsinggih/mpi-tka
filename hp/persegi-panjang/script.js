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


function showPage(pageId, button) {

    // Sembunyikan semua halaman
    pages.forEach(function(page) {

        page.classList.remove(
            "active-page"
        );

    });


    // Tampilkan halaman pilihan
    document
        .getElementById(pageId)
        .classList
        .add("active-page");


    // Reset tombol navigasi
    navButtons.forEach(function(btn) {

        btn.classList.remove(
            "active"
        );

    });


    // Aktifkan tombol pilihan
    if (button) {

        button.classList.add(
            "active"
        );

    }


    // Progress
    document
        .getElementById("progressText")
        .textContent =
        pageProgress[pageId];


    // Scroll ke atas
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
            "Persegi panjang memiliki berapa sisi?",

        options: [

            "3 sisi",

            "4 sisi",

            "5 sisi",

            "6 sisi"

        ],

        answer: 1

    },


    {

        question:
            "Sisi yang berhadapan pada persegi panjang memiliki...",

        options: [

            "Panjang yang berbeda",

            "Panjang yang sama",

            "Bentuk melengkung",

            "Tidak memiliki ukuran"

        ],

        answer: 1

    },


    {

        question:
            "Rumus luas persegi panjang adalah...",

        options: [

            "L = p + l",

            "L = 2 × (p + l)",

            "L = p × l",

            "L = p ÷ l"

        ],

        answer: 2

    },


    {

        question:
            "Sebuah persegi panjang memiliki panjang 10 cm dan lebar 5 cm. Berapakah kelilingnya?",

        options: [

            "15 cm",

            "30 cm",

            "50 cm",

            "60 cm"

        ],

        answer: 1

    },


    {

        question:
            "Sebuah persegi panjang memiliki panjang 12 cm dan lebar 4 cm. Berapakah luasnya?",

        options: [

            "16 cm²",

            "24 cm²",

            "48 cm²",

            "96 cm²"

        ],

        answer: 2

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


    // Reset feedback
    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "feedback";


    feedback.textContent =
        "";


    // Sembunyikan tombol berikutnya
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

function selectAnswer(selectedIndex) {

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


            // Jawaban benar
            if (
                index === correctAnswer
            ) {

                button.classList.add(
                    "correct"
                );

            }


            // Jawaban salah
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
            "🎉 Benar! Hebat sekali!";


        feedback.classList.add(
            "correct-feedback"
        );

    } else {

        feedback.textContent =
            "❌ Jawaban belum tepat. Yuk pelajari lagi!";


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


    // Jika soal terakhir
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
            "🏆 Sempurna! Kamu sangat menguasai persegi panjang!";

    } else if (score >= 80) {

        resultMessage.textContent =
            "🎉 Hebat! Pemahamanmu sudah sangat baik!";

    } else if (score >= 60) {

        resultMessage.textContent =
            "👍 Bagus! Terus belajar agar semakin hebat.";

    } else {

        resultMessage.textContent =
            "💪 Jangan menyerah! Pelajari kembali materi dan coba lagi.";

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
