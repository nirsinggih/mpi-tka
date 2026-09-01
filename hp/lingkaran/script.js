* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #4f46e5;
    --primary-dark: #3730a3;
    --secondary: #06b6d4;
    --background: #f4f7ff;
    --card: #ffffff;
    --text: #1e293b;
    --muted: #64748b;
    --success: #16a34a;
    --danger: #dc2626;
    --warning: #f59e0b;
    --border: #e2e8f0;
}

body {
    font-family: "Nunito", sans-serif;
    background:
        radial-gradient(
            circle at top left,
            #dbeafe,
            transparent 35%
        ),
        var(--background);

    color: var(--text);

    min-height: 100vh;
}


/* ================= APP ================= */

.app {
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding-bottom: 30px;
}


/* ================= HEADER ================= */

.header {
    padding: 28px 20px 22px;

    background:
        linear-gradient(
            135deg,
            var(--primary),
            var(--secondary)
        );

    color: white;

    border-radius:
        0 0 30px 30px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    gap: 15px;

    box-shadow:
        0 8px 30px rgba(79, 70, 229, 0.25);
}

.kelas {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;

    opacity: 0.8;

    margin-bottom: 5px;
}

.header h1 {
    font-size: 30px;
    font-weight: 900;
}

.subtitle {
    font-size: 14px;

    margin-top: 5px;

    opacity: 0.9;
}

.progress-box {
    background: rgba(255, 255, 255, 0.2);

    padding: 10px 12px;

    border-radius: 15px;

    font-weight: 800;
    font-size: 13px;

    backdrop-filter: blur(8px);
}


/* ================= NAVIGATION ================= */

.navigation {
    display: flex;

    justify-content: space-around;

    gap: 5px;

    padding: 15px;

    background: white;

    margin: -5px 15px 20px;

    border-radius: 20px;

    box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.08);

    position: sticky;
    top: 10px;

    z-index: 100;
}

.nav-btn {
    border: none;

    background: transparent;

    padding: 10px 8px;

    border-radius: 14px;

    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 4px;

    cursor: pointer;

    color: var(--muted);

    font-family: inherit;

    font-size: 11px;

    transition: 0.3s;

    flex: 1;
}

.nav-btn:hover {
    background: #eef2ff;
}

.nav-btn.active {
    background: var(--primary);

    color: white;

    box-shadow:
        0 5px 15px rgba(79, 70, 229, 0.3);
}


/* ================= PAGE ================= */

.page {
    display: none;

    padding: 0 15px;

    animation: fade 0.4s ease;
}

.active-page {
    display: block;
}

@keyframes fade {

    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}


/* ================= HERO ================= */

.hero-card {
    background: white;

    border-radius: 25px;

    padding: 30px 20px;

    text-align: center;

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.06);

    margin-bottom: 20px;
}

.hero-card h2 {
    font-size: 23px;

    margin-bottom: 10px;
}

.hero-card p {
    color: var(--muted);

    line-height: 1.6;

    margin-bottom: 20px;
}


/* ================= BUTTON ================= */

.primary-btn {
    border: none;

    width: 100%;

    padding: 15px;

    border-radius: 15px;

    background:
        linear-gradient(
            135deg,
            var(--primary),
            var(--secondary)
        );

    color: white;

    font-family: inherit;

    font-size: 16px;

    font-weight: 800;

    cursor: pointer;

    transition: 0.3s;

    box-shadow:
        0 7px 20px rgba(79, 70, 229, 0.25);
}

.primary-btn:hover {
    transform: translateY(-2px);
}

.primary-btn:active {
    transform: scale(0.98);
}


/* ================= CIRCLE ANIMATION ================= */

.circle-animation {
    display: flex;

    justify-content: center;

    margin-bottom: 25px;
}

.circle {
    width: 160px;
    height: 160px;

    border-radius: 50%;

    background:
        linear-gradient(
            135deg,
            #6366f1,
            #22d3ee
        );

    position: relative;

    box-shadow:
        0 15px 35px rgba(79, 70, 229, 0.3);

    animation: floating 3s ease-in-out infinite;
}

@keyframes floating {

    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }

}

.radius-line {
    position: absolute;

    width: 70px;
    height: 3px;

    background: white;

    top: 50%;
    left: 50%;

    transform-origin: left;
}

.r-label {
    position: absolute;

    top: 42%;
    right: 35px;

    color: white;

    font-size: 22px;

    font-weight: 900;
}


/* ================= INFO GRID ================= */

.info-grid {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 10px;
}

.info-card {
    background: white;

    padding: 15px 10px;

    border-radius: 18px;

    text-align: center;

    box-shadow:
        0 5px 20px rgba(0, 0, 0, 0.05);
}

.icon {
    font-size: 28px;

    margin-bottom: 8px;
}

.info-card h3 {
    font-size: 13px;

    margin-bottom: 5px;
}

.info-card p {
    font-size: 11px;

    color: var(--muted);

    line-height: 1.4;
}


/* ================= SECTION TITLE ================= */

.section-title {
    display: flex;

    gap: 12px;

    align-items: center;

    margin-bottom: 18px;
}

.section-title span {
    font-size: 32px;
}

.section-title h2 {
    font-size: 22px;
}

.section-title p {
    color: var(--muted);

    font-size: 13px;

    margin-top: 3px;
}


/* ================= CARD ================= */

.card,
.example-card,
.tips-card {
    background: white;

    padding: 20px;

    border-radius: 22px;

    margin-bottom: 18px;

    box-shadow:
        0 7px 25px rgba(0, 0, 0, 0.05);
}

.card h3 {
    margin-bottom: 15px;

    font-size: 18px;
}


/* ================= DIAGRAM ================= */

.diagram-container {
    display: flex;

    justify-content: center;

    padding: 20px 0;
}

.circle-diagram {
    width: 190px;
    height: 190px;

    border-radius: 50%;

    border: 5px solid var(--primary);

    position: relative;

    background:
        rgba(99, 102, 241, 0.08);
}

.center-dot {
    position: absolute;

    width: 12px;
    height: 12px;

    background: var(--danger);

    border-radius: 50%;

    top: 50%;
    left: 50%;

    transform:
        translate(-50%, -50%);
}

.radius-diagram {
    position: absolute;

    width: 92px;
    height: 3px;

    background: var(--danger);

    top: 50%;
    left: 50%;
}

.diameter-diagram {
    position: absolute;

    width: 180px;
    height: 3px;

    background: var(--secondary);

    top: 50%;
    left: 0;
}


/* ================= FORMULA LIST ================= */

.formula-list {
    display: flex;

    flex-direction: column;

    gap: 12px;
}

.formula-item {
    display: flex;

    gap: 12px;

    align-items: center;

    padding: 12px;

    background: #f8fafc;

    border-radius: 15px;
}

.formula-badge {
    min-width: 40px;
    height: 40px;

    border-radius: 50%;

    background: var(--primary);

    color: white;

    display: flex;

    align-items: center;
    justify-content: center;

    font-size: 18px;

    font-weight: 900;
}

.formula-item p {
    color: var(--muted);

    font-size: 13px;

    margin-top: 3px;
}


/* ================= TOPIC ================= */

.topic-card p {
    color: var(--muted);

    line-height: 1.6;

    margin-bottom: 15px;
}

.topic-icon {
    font-size: 35px;

    margin-bottom: 8px;
}


/* ================= FORMULA ================= */

.formula-box {
    padding: 20px;

    border-radius: 18px;

    background:
        linear-gradient(
            135deg,
            #eef2ff,
            #ecfeff
        );

    text-align: center;

    margin-top: 15px;
}

.formula-title {
    display: block;

    color: var(--muted);

    font-size: 13px;

    margin-bottom: 10px;
}

.formula {
    font-size: 23px;

    font-weight: 900;

    color: var(--primary);
}

.alternative {
    margin: 10px 0;

    font-size: 12px;
}


/* ================= RUMUS INFO ================= */

.rumus-info {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 10px;

    margin-top: 15px;
}

.rumus-info div {
    background: #f8fafc;

    padding: 12px;

    border-radius: 14px;
}

.rumus-info strong {
    display: block;

    font-size: 18px;

    color: var(--primary);
}

.rumus-info span {
    font-size: 11px;

    color: var(--muted);
}


/* ================= NOTE ================= */

.note {
    margin-top: 15px;

    background: #fef3c7;

    padding: 12px;

    border-radius: 12px;

    font-size: 13px;

    color: #92400e;
}


/* ================= TIPS ================= */

.tips-card {
    background:
        linear-gradient(
            135deg,
            #fefce8,
            #fff7ed
        );
}

.tips-card h3 {
    margin-bottom: 15px;
}

.tips-item {
    padding: 12px;

    background: rgba(255, 255, 255, 0.7);

    border-radius: 12px;

    margin-bottom: 10px;
}

.tips-item p {
    color: var(--muted);

    font-size: 13px;

    margin-top: 4px;
}


/* ================= EXAMPLE ================= */

.example-number {
    display: inline-block;

    background: var(--primary);

    color: white;

    padding: 6px 12px;

    border-radius: 20px;

    font-size: 12px;

    font-weight: 800;

    margin-bottom: 12px;
}

.example-card h3 {
    margin-bottom: 10px;
}

.question {
    background: #f8fafc;

    padding: 14px;

    border-radius: 14px;

    line-height: 1.6;

    margin-bottom: 15px;
}

.solution {
    font-size: 14px;

    line-height: 1.9;
}

.answer {
    margin-top: 15px;

    padding: 14px;

    background: #dcfce7;

    border-radius: 12px;

    color: #166534;
}


/* ================= QUIZ ================= */

.quiz-start,
.result-container {
    background: white;

    padding: 35px 25px;

    border-radius: 25px;

    text-align: center;

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.06);
}

.quiz-icon,
.result-icon {
    font-size: 60px;

    margin-bottom: 15px;
}

.quiz-start h2,
.result-container h2 {
    margin-bottom: 10px;
}

.quiz-start p,
.result-container p {
    color: var(--muted);

    line-height: 1.6;

    margin-bottom: 25px;
}


.quiz-container {
    background: white;

    padding: 20px;

    border-radius: 25px;

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.06);
}

.quiz-top {
    display: flex;

    justify-content: space-between;

    gap: 10px;

    margin-bottom: 25px;
}

#questionNumber {
    color: var(--primary);

    font-weight: 800;

    font-size: 13px;
}

#questionText {
    margin-top: 5px;

    font-size: 20px;

    line-height: 1.4;
}

.score-display {
    background: #fef3c7;

    padding: 8px 12px;

    border-radius: 12px;

    height: fit-content;

    font-weight: 800;
}


/* ================= OPTIONS ================= */

.options-container {
    display: flex;

    flex-direction: column;

    gap: 12px;
}

.option {
    width: 100%;

    border: 2px solid var(--border);

    background: white;

    padding: 15px;

    border-radius: 15px;

    text-align: left;

    font-family: inherit;

    font-size: 15px;

    font-weight: 700;

    cursor: pointer;

    transition: 0.25s;
}

.option:hover {
    border-color: var(--primary);

    background: #eef2ff;
}

.option.correct {
    background: #dcfce7;

    border-color: var(--success);

    color: #166534;
}

.option.wrong {
    background: #fee2e2;

    border-color: var(--danger);

    color: #991b1b;
}

.option:disabled {
    cursor: default;
}


/* ================= FEEDBACK ================= */

.feedback {
    margin-top: 15px;

    padding: 13px;

    border-radius: 12px;

    font-weight: 700;

    text-align: center;

    display: none;
}

.feedback.show {
    display: block;
}

.feedback.correct-feedback {
    background: #dcfce7;

    color: #166534;
}

.feedback.wrong-feedback {
    background: #fee2e2;

    color: #991b1b;
}

.next-btn {
    margin-top: 15px;
}


/* ================= RESULT ================= */

.final-score {
    font-size: 55px;

    font-weight: 900;

    color: var(--primary);

    margin: 15px 0;
}

.final-score small {
    font-size: 20px;

    color: var(--muted);
}


/* ================= FOOTER ================= */

footer {
    text-align: center;

    margin-top: 25px;

    padding: 15px;

    color: var(--muted);

    font-size: 11px;

    line-height: 1.7;
}


/* ================= UTILITY ================= */

.hidden {
    display: none !important;
}


/* ================= DESKTOP ================= */

@media (min-width: 700px) {

    body {
        padding: 20px 0;
    }

    .app {
        background: transparent;
    }

}


/* ================= MOBILE KECIL ================= */

@media (max-width: 360px) {

    .header h1 {
        font-size: 25px;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .navigation {
        padding: 10px 5px;
    }

    .nav-btn {
        font-size: 10px;
    }

}
