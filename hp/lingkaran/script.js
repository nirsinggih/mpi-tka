// ===============================
// NAVIGASI HALAMAN
// ===============================

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

const pageProgress = {
    beranda: "1 / 4",
    materi: "2 / 4",
    contoh: "3 / 4",
    kuis: "4 / 4"
};


function showPage(pageId, button) {

    // Sembunyikan semua halaman
    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });


    // Tampilkan halaman yang dipilih
    document
        .getElementById(pageId)
        .classList
        .add("active-page");


    // Hapus status aktif navigasi
    navButtons.forEach(function(btn) {
        btn.classList.remove("active");
    });


    // Tambahkan status aktif
    if (button) {
        button.classList.add("active");
    }


    // Ubah progress
    document.getElementById("progressText").textContent =
        pageProgress[pageId];


    // Scroll ke atas
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ===============================
// TOMBOL MULAI BELAJAR
// ===============================

function goMateri() {

    const materiButton = document.querySelectorAll(".nav-btn")[1];

    showPage(
        "materi",
        materiButton
    );

}



// ===============================
// DATA KUIS
// ===============================

const questions = [

    {
        question:
            "Apa nama jarak dari titik tengah lingkaran ke tepi lingkaran?",

        options: [
            "Diameter",
            "Jari-jari",
            "Keliling",
            "Luas"
        ],

        answer: 1
    },


    {
        question:
            "Sebuah lingkaran memiliki jari-jari 7 cm. Berapakah diameternya?",

        options: [
            "7 cm",
            "9 cm",
            "14 cm",
            "21 cm"
        ],

        answer: 2
    },


    {
        question:
            "Rumus keliling lingkaran adalah...",

        options: [
            "L = π × r × r",
            "K = 2 × π × r",
            "d = π × r",
            "r = 2 × d"
        ],

        answer: 1
    },


    {
        question:
            "Sebuah lingkaran memiliki jari-jari 7 cm. Berapakah kelilingnya? Gunakan π = 22/7.",

        options: [
            "22 cm",
            "44 cm",
            "77 cm",
            "154 cm"
        ],

        answer: 1
    },


    {
        question:
            "Sebuah lingkaran memiliki jari-jari 7 cm. Berapakah luasnya? Gunakan π = 22/7.",

        options: [
            "44 cm²",
            "77 cm²",
            "154 cm²",
            "308 cm²"
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
                document.createElement("button");


            button.classList.add(
                "option"
            );


            button.textContent =
                option;


            button.onclick =
                function() {

                    selectAnswer(
                        index,
                        button
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

function selectAnswer(
    selectedIndex,
    selectedButton
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


            if (index === correctAnswer) {

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
            "🎉 Benar! Hebat sekali!";


        feedback.classList.add(
            "correct-feedback"
        );

    } else {

        feedback.textContent =
            "❌ Jawaban belum tepat. Jangan menyerah, coba pelajari lagi!";


        feedback.classList.add(
            "wrong-feedback"
        );

    }


    document
        .getElementById("score")
        .textContent =
        score;


    document
        .getElementById(
            "nextButton"
        )
        .classList
        .remove("hidden");


    // Ubah tulisan tombol terakhir

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        document
            .getElementById(
                "nextButton"
            )
            .textContent =
            "Lihat Hasil 🏆";

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
            "🎉 Luar biasa! Kamu sudah sangat memahami materi lingkaran!";

    } else if (score >= 80) {

        resultMessage.textContent =
            "👏 Hebat! Pemahamanmu tentang lingkaran sudah sangat baik.";

    } else if (score >= 60) {

        resultMessage.textContent =
            "👍 Bagus! Tetap belajar agar semakin memahami lingkaran.";

    } else {

        resultMessage.textContent =
            "💪 Jangan menyerah! Yuk pelajari kembali materi dan coba lagi.";

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
