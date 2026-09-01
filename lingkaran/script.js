/* =========================================================
   MPI MATEMATIKA SD
   KELILING & LUAS LINGKARAN
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   SISTEM SLIDE
   ========================================================= */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;


/* Menampilkan slide tertentu */
function goToSlide(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= slides.length) {
        index = slides.length - 1;
    }

    currentSlide = index;


    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === currentSlide
        );

    });


    updateNavigation();

}


/* Slide berikutnya */
function nextSlide() {

    if (currentSlide < slides.length - 1) {

        goToSlide(currentSlide + 1);

    }

}


/* Slide sebelumnya */
function previousSlide() {

    if (currentSlide > 0) {

        goToSlide(currentSlide - 1);

    }

}


/* =========================================================
   NAVIGASI
   ========================================================= */

function updateNavigation() {

    const pageNumber =
        document.getElementById("pageNumber");

    const progressBar =
        document.getElementById("progressBar");


    if (pageNumber) {

        pageNumber.textContent =
            `${currentSlide + 1} / ${slides.length}`;

    }


    if (progressBar) {

        const progress =
            ((currentSlide + 1) / slides.length) * 100;

        progressBar.style.width =
            progress + "%";

    }

}


/* =========================================================
   KEYBOARD / REMOTE
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowRight") {

            nextSlide();

        }


        if (event.key === "ArrowLeft") {

            previousSlide();

        }

    }
);


/* =========================================================
   DATA KUIS
   ========================================================= */

const questions = [

    {
        question:
            "Sebuah lingkaran memiliki diameter 14 cm. Berapa kelilingnya?",

        choices: [
            "22 cm",
            "44 cm",
            "88 cm",
            "154 cm"
        ],

        answer: 1
    },


    {
        question:
            "Jika jari-jari lingkaran 7 cm, berapa luasnya?",

        choices: [
            "44 cm²",
            "88 cm²",
            "154 cm²",
            "308 cm²"
        ],

        answer: 2
    },


    {
        question:
            "Diameter lingkaran 20 cm. Berapa jari-jarinya?",

        choices: [
            "5 cm",
            "10 cm",
            "20 cm",
            "40 cm"
        ],

        answer: 1
    },


    {
        question:
            "Rumus luas lingkaran yang benar adalah ...",

        choices: [
            "π × d",
            "2 × π × r",
            "π × r × r",
            "d × d"
        ],

        answer: 2
    },


    {
        question:
            "Lingkaran berjari-jari 10 cm. Gunakan π = 3,14. Berapa kelilingnya?",

        choices: [
            "31,4 cm",
            "62,8 cm",
            "100 cm",
            "314 cm"
        ],

        answer: 1
    },


    {
        question:
            "Satuan yang tepat untuk luas lingkaran adalah ...",

        choices: [
            "cm",
            "cm²",
            "cm³",
            "kg"
        ],

        answer: 1
    },


    {
        question:
            "Jika diameter lingkaran 28 cm, jari-jarinya adalah ...",

        choices: [
            "7 cm",
            "14 cm",
            "28 cm",
            "56 cm"
        ],

        answer: 1
    },


    {
        question:
            "Keliling lingkaran dengan r = 14 cm dan π = 22/7 adalah ...",

        choices: [
            "44 cm",
            "88 cm",
            "154 cm",
            "176 cm"
        ],

        answer: 1
    },


    {
        question:
            "Sebuah lingkaran mempunyai jari-jari 21 cm. Berapa luasnya?",

        choices: [
            "132 cm²",
            "441 cm²",
            "1.386 cm²",
            "2.772 cm²"
        ],

        answer: 2
    },


    {
        question:
            "Jika keliling lingkaran 44 cm dan π = 22/7, berapa jari-jarinya?",

        choices: [
            "5 cm",
            "7 cm",
            "14 cm",
            "22 cm"
        ],

        answer: 1
    }

];


/* =========================================================
   VARIABEL KUIS
   ========================================================= */

let currentQuestion = 0;

let currentTeam = 0;

let scores = [0, 0];

let quizStarted = false;


/*
0 = Tim A
1 = Tim B
*/


/* =========================================================
   ELEMENT HTML
   ========================================================= */

const scoreA =
    document.getElementById("scoreA");

const scoreB =
    document.getElementById("scoreB");

const turn =
    document.getElementById("turn");

const question =
    document.getElementById("question");

const choices =
    document.getElementById("choices");

const feedback =
    document.getElementById("feedback");

const startQuizButton =
    document.getElementById("startQuizButton");

const nextQuestionButton =
    document.getElementById("nextQuestionButton");


/* =========================================================
   UPDATE SKOR
   ========================================================= */

function updateScores() {

    if (scoreA) {

        scoreA.textContent =
            scores[0];

    }


    if (scoreB) {

        scoreB.textContent =
            scores[1];

    }

}


/* =========================================================
   MEMULAI KUIS
   ========================================================= */

function startQuiz() {

    currentQuestion = 0;

    currentTeam = 0;

    scores = [0, 0];

    quizStarted = true;


    updateScores();


    if (startQuizButton) {

        startQuizButton.classList.add(
            "hidden"
        );

    }


    if (nextQuestionButton) {

        nextQuestionButton.classList.add(
            "hidden"
        );

    }


    showQuestion();

}


/* =========================================================
   MENAMPILKAN SOAL
   ========================================================= */

function showQuestion() {

    if (!questions[currentQuestion]) {

        finishQuiz();

        return;

    }


    const q =
        questions[currentQuestion];


    /* Giliran tim */

    if (turn) {

        if (currentTeam === 0) {

            turn.textContent =
                "🔵 Giliran TIM A";

        } else {

            turn.textContent =
                "🟢 Giliran TIM B";

        }

    }


    /* Pertanyaan */

    if (question) {

        question.innerHTML =
            `
            Soal ${currentQuestion + 1}
            dari ${questions.length}

            <br><br>

            ${q.question}
            `;

    }


    /* Bersihkan pilihan */

    if (choices) {

        choices.innerHTML = "";

    }


    /* Bersihkan feedback */

    if (feedback) {

        feedback.textContent = "";

    }


    /* Buat tombol pilihan */

    q.choices.forEach(
        function (choiceText, index) {

            const button =
                document.createElement("button");


            button.className =
                "choice";


            button.textContent =
                String.fromCharCode(65 + index)
                + ". "
                + choiceText;


            button.addEventListener(
                "click",
                function () {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            choices.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   CEK JAWABAN
   ========================================================= */

function checkAnswer(
    selectedAnswer,
    selectedButton
) {

    const q =
        questions[currentQuestion];


    /*
    Mencegah jawaban dipilih
    berkali-kali.
    */

    const allButtons =
        choices.querySelectorAll(
            ".choice"
        );


    allButtons.forEach(
        function (button) {

            button.disabled = true;

        }
    );


    /* Jawaban benar */

    if (
        selectedAnswer ===
        q.answer
    ) {

        selectedButton.classList.add(
            "correct"
        );


        scores[currentTeam] += 10;


        if (feedback) {

            feedback.textContent =
                "✅ BENAR! Tim mendapatkan +10 poin.";

        }

    }

    /*
    Jawaban salah
    */

    else {

        selectedButton.classList.add(
            "wrong"
        );


        allButtons[
            q.answer
        ].classList.add(
            "correct"
        );


        if (feedback) {

            feedback.textContent =
                "❌ Belum tepat. Jawaban yang benar adalah "
                + q.choices[q.answer]
                + ".";

        }

    }


    updateScores();


    /* Tampilkan tombol berikutnya */

    if (nextQuestionButton) {

        nextQuestionButton.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   SOAL BERIKUTNYA
   ========================================================= */

function nextQuestion() {

    currentQuestion++;


    /*
    Jika semua soal selesai
    */

    if (
        currentQuestion >=
        questions.length
    ) {

        finishQuiz();

        return;

    }


    /*
    Ganti tim.

    Tim A → Tim B
    Tim B → Tim A
    */

    currentTeam =
        currentTeam === 0
            ? 1
            : 0;


    showQuestion();

}


/* =========================================================
   SELESAI KUIS
   ========================================================= */

function finishQuiz() {

    quizStarted = false;


    let result = "";


    if (
        scores[0] >
        scores[1]
    ) {

        result =
            "🏆 TIM A MENANG!";

    }

    else if (
        scores[1] >
        scores[0]
    ) {

        result =
            "🏆 TIM B MENANG!";

    }

    else {

        result =
            "🤝 HASIL AKHIR: SERI!";

    }


    if (turn) {

        turn.textContent =
            "🎉 Kuis Selesai";

    }


    if (question) {

        question.innerHTML =
            `
            ${result}

            <br><br>

            Kuis telah selesai!
            `;

    }


    if (choices) {

        choices.innerHTML = "";

    }


    if (feedback) {

        feedback.innerHTML =
            `
            🔵 TIM A:
            <b>${scores[0]} poin</b>

            &nbsp;&nbsp; | &nbsp;&nbsp;

            🟢 TIM B:
            <b>${scores[1]} poin</b>
            `;

    }


    if (nextQuestionButton) {

        nextQuestionButton.classList.add(
            "hidden"
        );

    }


    /*
    Ubah tombol menjadi
    tombol ulangi kuis.
    */

    if (startQuizButton) {

        startQuizButton.textContent =
            "↻ Ulangi Kuis";


        startQuizButton.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   INISIALISASI
   ========================================================= */

goToSlide(0);

updateScores();
