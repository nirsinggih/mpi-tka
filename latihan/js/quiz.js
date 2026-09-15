let semuaSoal = [];

let soalAktif = 0;

let jawabanSiswa = [];

let dataSiswa = null;

let judulQuiz = "";

let fileSoal = "";


/* =========================
   LOAD QUIZ
========================= */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        /* =========================
           AMBIL DATA SISWA
        ========================= */

        dataSiswa =
            JSON.parse(
                localStorage.getItem(
                    "dataSiswa"
                )
            );


        if (!dataSiswa) {

            window.location.href =
                "mtk-sd.html";

            return;

        }


        /* =========================
           TAMPILKAN IDENTITAS
        ========================= */

        const identitasMini =
            document.getElementById(
                "identitasMini"
            );


        if (identitasMini) {

            identitasMini.textContent =

                dataSiswa.nama +
                " • " +
                dataSiswa.sekolah;

        }


        try {

            /* =========================
               AMBIL FILE SOAL
            ========================= */

            fileSoal =
                localStorage.getItem(
                    "fileSoal"
                );


            if (!fileSoal) {

                throw new Error(
                    "File soal belum ditentukan."
                );

            }


            /* =========================
               BACA FILE JSON
            ========================= */

            const response =
                await fetch(
                    fileSoal
                );


            if (!response.ok) {

                throw new Error(
                    "Gagal membaca file soal: " +
                    fileSoal
                );

            }


            /* =========================
               UBAH JSON MENJADI DATA
            ========================= */

            const data =
                await response.json();


            /* =========================
               JUDUL QUIZ
            ========================= */

            judulQuiz =
                data.judul ||
                "Quiz";


            const judulElement =
                document.getElementById(
                    "judulQuiz"
                );


            if (judulElement) {

                judulElement.textContent =
                    judulQuiz;

            }


            /* =========================
               CEK DATA SOAL
            ========================= */

            if (
                !Array.isArray(
                    data.soal
                )
            ) {

                throw new Error(
                    "Data soal tidak ditemukan atau format JSON tidak benar."
                );

            }


            if (
                data.soal.length === 0
            ) {

                throw new Error(
                    "File soal tidak memiliki soal."
                );

            }


            /* =========================
               SALIN SOAL
            ========================= */

            semuaSoal =
                [...data.soal];


            /* =========================
               ACAK SOAL
            ========================= */

            if (
                data.acak_soal === true
            ) {

                semuaSoal =
                    acakArray(
                        semuaSoal
                    );

            }


            /* =========================
               ACAK OPSI
            ========================= */

            if (
                data.acak_opsi === true
            ) {

                semuaSoal.forEach(
                    soal => {

                        if (
                            Array.isArray(
                                soal.opsi
                            )
                        ) {

                            soal.opsi =
                                acakArray(
                                    [
                                        ...soal.opsi
                                    ]
                                );

                        }

                    }
                );

            }


            /* =========================
               SIAPKAN JAWABAN SISWA
            ========================= */

            jawabanSiswa =
                new Array(
                    semuaSoal.length
                ).fill(null);


            /* =========================
               TAMPILKAN SOAL PERTAMA
            ========================= */

            tampilkanSoal();


        } catch(error) {

            console.error(
                "ERROR QUIZ:",
                error
            );


            const container =
                document.getElementById(
                    "soalContainer"
                );


            if (container) {

                container.innerHTML = `

                    <div class="alert alert-danger">

                        <h5>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            Gagal Memuat Soal
                        </h5>

                        <hr>

                        <p class="mb-2">

                            <strong>
                                File soal:
                            </strong>

                            ${escapeHTML(
                                fileSoal ||
                                localStorage.getItem(
                                    "fileSoal"
                                ) ||
                                "-"
                            )}

                        </p>

                        <p class="mb-0">

                            <strong>
                                Detail:
                            </strong>

                            ${escapeHTML(
                                error.message
                            )}

                        </p>

                    </div>

                `;

            }

        }

    }
);


/* =========================
   ACAK ARRAY
========================= */

function acakArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }


    return array;

}


/* =========================
   TAMPILKAN SOAL
========================= */

function tampilkanSoal() {

    const soal =
        semuaSoal[
            soalAktif
        ];


    if (!soal) {

        return;

    }


    const container =
        document.getElementById(
            "soalContainer"
        );


    /* =========================
       NOMOR SOAL
    ========================= */

    const nomorElement =
        document.getElementById(
            "nomorSoal"
        );


    if (nomorElement) {

        nomorElement.textContent =

            `${soalAktif + 1}/${semuaSoal.length}`;

    }


    /* =========================
       PROGRESS BAR
    ========================= */

    const persen =

        (
            (soalAktif + 1) /
            semuaSoal.length
        ) * 100;


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (progressBar) {

        progressBar.style.width =
            persen + "%";

    }


    /* =========================
       PERTANYAAN
    ========================= */

    let html = `

        <div class="soal-nomor">

            SOAL ${soalAktif + 1}

        </div>

        <div class="badge bg-secondary mb-3">

            ${namaTipeSoal(
                soal.tipe
            )}

        </div>

        <div class="soal-pertanyaan">

            ${escapeHTML(
                soal.pertanyaan
            )}

        </div>

    `;


    /* =========================
       PILIHAN GANDA
    ========================= */

    if (
        soal.tipe ===
        "pilihan_ganda"
    ) {

        html +=
            buatPilihanGanda(
                soal
            );

    }


    /* =========================
       PILIHAN GANDA KOMPLEKS
    ========================= */

    else if (
        soal.tipe ===
        "pilihan_ganda_kompleks"
    ) {

        html +=
            buatPilihanGandaKompleks(
                soal
            );

    }


    /* =========================
       BENAR SALAH KOMPLEKS
    ========================= */

    else if (
        soal.tipe ===
        "benar_salah_kompleks"
    ) {

        html +=
            buatBenarSalahKompleks(
                soal
            );

    }


    /* =========================
       TIPE TIDAK DIKENALI
    ========================= */

    else {

        html += `

            <div class="alert alert-danger">

                <strong>
                    Tipe soal tidak dikenali:
                </strong>

                ${escapeHTML(
                    soal.tipe
                )}

            </div>

        `;

    }


    container.innerHTML =
        html;


    /* =========================
       TOMBOL SEBELUMNYA
    ========================= */

    const btnSebelumnya =
        document.getElementById(
            "btnSebelumnya"
        );


    if (btnSebelumnya) {

        btnSebelumnya.disabled =
            soalAktif === 0;

    }


    /* =========================
       TOMBOL BERIKUTNYA
    ========================= */

    const btnBerikutnya =
        document.getElementById(
            "btnBerikutnya"
        );


    if (btnBerikutnya) {

        if (
            soalAktif ===
            semuaSoal.length - 1
        ) {

            btnBerikutnya.innerHTML = `

                <i class="fa-solid fa-check"></i>

                Selesai

            `;

        }

        else {

            btnBerikutnya.innerHTML = `

                Berikutnya

                <i class="fa-solid fa-arrow-right"></i>

            `;

        }

    }


    /* =========================
       TAMPILKAN JAWABAN LAMA
    ========================= */

    tampilkanJawabanTersimpan();

}


/* =========================
   NAMA TIPE SOAL
========================= */

function namaTipeSoal(
    tipe
) {

    if (
        tipe ===
        "pilihan_ganda"
    ) {

        return "Pilihan Ganda";

    }


    if (
        tipe ===
        "pilihan_ganda_kompleks"
    ) {

        return "Pilihan Ganda Kompleks";

    }


    if (
        tipe ===
        "benar_salah_kompleks"
    ) {

        return "Benar / Salah Kompleks";

    }


    return "Soal";

}


/* =========================
   PILIHAN GANDA
========================= */

function buatPilihanGanda(
    soal
) {

    let html = "";


    if (
        !Array.isArray(
            soal.opsi
        )
    ) {

        return `

            <div class="alert alert-danger">

                Pilihan jawaban tidak tersedia.

            </div>

        `;

    }


    soal.opsi.forEach(
        (
            opsi,
            index
        ) => {

            const id =
                `opsi_${soal.id}_${index}`;


            html += `

                <div class="opsi-item">

                    <label
                        for="${id}">

                        <input

                            type="radio"

                            name="jawaban"

                            id="${id}"

                            value="${escapeHTML(
                                opsi
                            )}">

                        ${escapeHTML(
                            opsi
                        )}

                    </label>

                </div>

            `;

        }
    );


    return html;

}


/* =========================
   PILIHAN GANDA KOMPLEKS
========================= */

function buatPilihanGandaKompleks(
    soal
) {

    let html = `

        <div class="alert alert-warning">

            <i class="fa-solid fa-circle-info"></i>

            Pilih semua jawaban yang benar.

        </div>

    `;


    if (
        !Array.isArray(
            soal.opsi
        )
    ) {

        return html + `

            <div class="alert alert-danger">

                Pilihan jawaban tidak tersedia.

            </div>

        `;

    }


    soal.opsi.forEach(
        (
            opsi,
            index
        ) => {

            const id =
                `kompleks_${soal.id}_${index}`;


            html += `

                <div class="opsi-item">

                    <label
                        for="${id}">

                        <input

                            type="checkbox"

                            name="jawabanKompleks"

                            id="${id}"

                            value="${escapeHTML(
                                opsi
                            )}">

                        ${escapeHTML(
                            opsi
                        )}

                    </label>

                </div>

            `;

        }
    );


    return html;

}


/* =========================
   BENAR SALAH KOMPLEKS
========================= */

function buatBenarSalahKompleks(
    soal
) {

    let html = `

        <div class="alert alert-warning">

            <i class="fa-solid fa-circle-info"></i>

            Tentukan Benar atau Salah
            untuk setiap pernyataan.

        </div>

    `;


    if (
        !Array.isArray(
            soal.pernyataan
        )
    ) {

        return html + `

            <div class="alert alert-danger">

                Pernyataan soal tidak tersedia.

            </div>

        `;

    }


    soal.pernyataan.forEach(
        (
            item,
            index
        ) => {

            html += `

                <div class="bs-item">

                    <div class="bs-pernyataan">

                        ${index + 1}.

                        ${escapeHTML(
                            item.teks
                        )}

                    </div>


                    <div class="bs-options">

                        <label>

                            <input

                                type="radio"

                                name="bs_${soal.id}_${index}"

                                value="Benar">

                            <i class="fa-solid fa-check text-success"></i>

                            Benar

                        </label>


                        <label>

                            <input

                                type="radio"

                                name="bs_${soal.id}_${index}"

                                value="Salah">

                            <i class="fa-solid fa-xmark text-danger"></i>

                            Salah

                        </label>

                    </div>

                </div>

            `;

        }
    );


    return html;

}


/* =========================
   SIMPAN JAWABAN
========================= */

function simpanJawaban() {

    const soal =
        semuaSoal[
            soalAktif
        ];


    if (!soal) {

        return;

    }


    /* =========================
       PILIHAN GANDA
    ========================= */

    if (
        soal.tipe ===
        "pilihan_ganda"
    ) {

        const pilihan =
            document.querySelector(
                'input[name="jawaban"]:checked'
            );


        jawabanSiswa[
            soalAktif
        ] =

            pilihan
                ? pilihan.value
                : null;

    }


    /* =========================
       PILIHAN GANDA KOMPLEKS
    ========================= */

    else if (
        soal.tipe ===
        "pilihan_ganda_kompleks"
    ) {

        const pilihan =
            document.querySelectorAll(
                'input[name="jawabanKompleks"]:checked'
            );


        jawabanSiswa[
            soalAktif
        ] =

            Array.from(
                pilihan
            ).map(
                item =>
                    item.value
            );

    }


    /* =========================
       BENAR SALAH KOMPLEKS
    ========================= */

    else if (
        soal.tipe ===
        "benar_salah_kompleks"
    ) {

        const hasil = [];


        soal.pernyataan.forEach(
            (
                item,
                index
            ) => {

                const pilihan =
                    document.querySelector(
                        `input[name="bs_${soal.id}_${index}"]:checked`
                    );


                hasil.push(

                    pilihan
                        ? pilihan.value
                        : null

                );

            }
        );


        jawabanSiswa[
            soalAktif
        ] = hasil;

    }

}


/* =========================
   TAMPILKAN JAWABAN TERSIMPAN
========================= */

function tampilkanJawabanTersimpan() {

    const jawaban =
        jawabanSiswa[
            soalAktif
        ];


    if (
        jawaban === null ||
        jawaban === undefined
    ) {

        return;

    }


    const soal =
        semuaSoal[
            soalAktif
        ];


    /* =========================
       PILIHAN GANDA
    ========================= */

    if (
        soal.tipe ===
        "pilihan_ganda"
    ) {

        const radio =
            document.querySelector(
                `input[name="jawaban"][value="${CSS.escape(
                    jawaban
                )}"]`
            );


        if (radio) {

            radio.checked =
                true;

        }

    }


    /* =========================
       PILIHAN GANDA KOMPLEKS
    ========================= */

    else if (
        soal.tipe ===
        "pilihan_ganda_kompleks"
    ) {

        if (
            !Array.isArray(
                jawaban
            )
        ) {

            return;

        }


        jawaban.forEach(
            item => {

                const checkbox =
                    document.querySelector(
                        `input[name="jawabanKompleks"][value="${CSS.escape(
                            item
                        )}"]`
                    );


                if (checkbox) {

                    checkbox.checked =
                        true;

                }

            }
        );

    }


    /* =========================
       BENAR SALAH KOMPLEKS
    ========================= */

    else if (
        soal.tipe ===
        "benar_salah_kompleks"
    ) {

        if (
            !Array.isArray(
                jawaban
            )
        ) {

            return;

        }


        jawaban.forEach(
            (
                nilai,
                index
            ) => {

                if (!nilai) {

                    return;

                }


                const radio =
                    document.querySelector(
                        `input[name="bs_${soal.id}_${index}"][value="${CSS.escape(
                            nilai
                        )}"]`
                    );


                if (radio) {

                    radio.checked =
                        true;

                }

            }
        );

    }

}


/* =========================
   TOMBOL BERIKUTNYA
========================= */

const btnBerikutnya =
    document.getElementById(
        "btnBerikutnya"
    );


if (btnBerikutnya) {

    btnBerikutnya.addEventListener(
        "click",
        function() {

            simpanJawaban();


            /* =========================
               SOAL TERAKHIR
            ========================= */

            if (
                soalAktif ===
                semuaSoal.length - 1
            ) {

                if (
                    confirm(
                        "Apakah yakin ingin mengakhiri quiz?"
                    )
                ) {

                    hitungNilai();

                }

            }

            else {

                soalAktif++;


                tampilkanSoal();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        }
    );

}


/* =========================
   TOMBOL SEBELUMNYA
========================= */

const btnSebelumnya =
    document.getElementById(
        "btnSebelumnya"
    );


if (btnSebelumnya) {

    btnSebelumnya.addEventListener(
        "click",
        function() {

            simpanJawaban();


            if (
                soalAktif > 0
            ) {

                soalAktif--;


                tampilkanSoal();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        }
    );

}


/* =========================
   HITUNG NILAI
========================= */

function hitungNilai() {

    let totalSkor = 0;

    let totalMaksimal = 0;


    semuaSoal.forEach(
        (
            soal,
            index
        ) => {

            const jawaban =
                jawabanSiswa[
                    index
                ];


            /* =========================
               PILIHAN GANDA
            ========================= */

            if (
                soal.tipe ===
                "pilihan_ganda"
            ) {

                totalMaksimal += 1;


                if (
                    jawaban ===
                    soal.jawaban
                ) {

                    totalSkor += 1;

                }

            }


            /* =========================
               PILIHAN GANDA KOMPLEKS
            ========================= */

            else if (
                soal.tipe ===
                "pilihan_ganda_kompleks"
            ) {

                totalMaksimal += 1;


                if (
                    Array.isArray(
                        jawaban
                    )
                    &&
                    arraySama(
                        jawaban,
                        soal.jawaban
                    )
                ) {

                    totalSkor += 1;

                }

            }


            /* =========================
               BENAR SALAH KOMPLEKS
            ========================= */

            else if (
                soal.tipe ===
                "benar_salah_kompleks"
            ) {

                const jumlah =
                    Array.isArray(
                        soal.pernyataan
                    )
                        ? soal.pernyataan.length
                        : 0;


                totalMaksimal +=
                    jumlah;


                if (
                    Array.isArray(
                        jawaban
                    )
                ) {

                    soal.pernyataan.forEach(
                        (
                            item,
                            i
                        ) => {

                            if (
                                jawaban[i] ===
                                item.jawaban
                            ) {

                                totalSkor += 1;

                            }

                        }
                    );

                }

            }

        }
    );


    /* =========================
       NILAI AKHIR
    ========================= */

    const nilai =

        totalMaksimal > 0

            ? Math.round(

                (
                    totalSkor /
                    totalMaksimal
                ) * 100

            )

            : 0;


    /* =========================
       DATA HASIL
    ========================= */

    const hasil = {

        nama:
            dataSiswa.nama,

        sekolah:
            dataSiswa.sekolah,

        kelas:
            dataSiswa.kelas,

        nomor:
            dataSiswa.nomor,

        judul:
            judulQuiz,

        jumlahSoal:
            semuaSoal.length,

        skor:
            totalSkor,

        skorMaksimal:
            totalMaksimal,

        nilai:
            nilai,

        tanggal:
            new Date()
                .toLocaleDateString(
                    "id-ID",
                    {
                        day:
                            "numeric",

                        month:
                            "long",

                        year:
                            "numeric"
                    }
                )

    };


    /* =========================
       SIMPAN HASIL
    ========================= */

    localStorage.setItem(

        "hasilQuiz",

        JSON.stringify(
            hasil
        )

    );


    /* =========================
       KE HALAMAN HASIL
    ========================= */

    window.location.href =
        "hasil.html";

}


/* =========================
   BANDINGKAN ARRAY
========================= */

function arraySama(
    a,
    b
) {

    if (
        !Array.isArray(a) ||
        !Array.isArray(b)
    ) {

        return false;

    }


    if (
        a.length !==
        b.length
    ) {

        return false;

    }


    const x =
        [...a].sort();


    const y =
        [...b].sort();


    return x.every(
        (
            value,
            index
        ) =>

            value ===
            y[index]

    );

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(
    text
) {

    return String(
        text
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
