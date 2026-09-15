let semuaSoal = [];

let soalAktif = 0;

let jawabanSiswa = [];

let dataSiswa = null;

let judulQuiz = "";


document.addEventListener(
    "DOMContentLoaded",
    async function() {


        dataSiswa =
            JSON.parse(
                localStorage.getItem(
                    "dataSiswa"
                )
            );


        if (!dataSiswa) {

            window.location.href =
                "index.html";

            return;

        }


        document.getElementById(
            "identitasMini"
        ).textContent =

            dataSiswa.nama +
            " • " +
            dataSiswa.sekolah;


        try {


            const response =
                await fetch(
                    "data/soal.json"
                );


            if (!response.ok) {

                throw new Error(
                    "Gagal membaca soal.json"
                );

            }


            const data =
                await response.json();


            judulQuiz =
                data.judul;


            document.getElementById(
                "judulQuiz"
            ).textContent =
                judulQuiz;


            semuaSoal =
                [...data.soal];


            if (data.acak_soal) {

                semuaSoal =
                    acakArray(
                        semuaSoal
                    );

            }


            if (data.acak_opsi) {

                semuaSoal.forEach(
                    soal => {


                        if (
                            soal.opsi
                        ) {

                            soal.opsi =
                                acakArray(
                                    [...soal.opsi]
                                );

                        }

                    }
                );

            }


            jawabanSiswa =
                new Array(
                    semuaSoal.length
                ).fill(null);


            tampilkanSoal();


        } catch(error) {


            console.error(error);


            document.getElementById(
                "soalContainer"
            ).innerHTML = `

                <div class="alert alert-danger">

                    <strong>
                        Gagal memuat soal.
                    </strong>

                    <br>

                    Pastikan file
                    <strong>
                        data/soal.json
                    </strong>
                    tersedia.

                    <br><br>

                    Detail:
                    ${escapeHTML(error.message)}

                </div>

            `;

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
        semuaSoal[soalAktif];


    const container =
        document.getElementById(
            "soalContainer"
        );


    document.getElementById(
        "nomorSoal"
    ).textContent =

        `${soalAktif + 1}/${semuaSoal.length}`;


    const persen =
        (
            (soalAktif + 1) /
            semuaSoal.length
        ) * 100;


    document.getElementById(
        "progressBar"
    ).style.width =
        persen + "%";


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


    if (
        soal.tipe ===
        "pilihan_ganda"
    ) {


        html +=
            buatPilihanGanda(
                soal
            );

    }


    else if (
        soal.tipe ===
        "pilihan_ganda_kompleks"
    ) {


        html +=
            buatPilihanGandaKompleks(
                soal
            );

    }


    else if (
        soal.tipe ===
        "benar_salah_kompleks"
    ) {


        html +=
            buatBenarSalahKompleks(
                soal
            );

    }


    else {


        html += `

            <div class="alert alert-danger">

                Tipe soal tidak dikenali:

                ${escapeHTML(
                    soal.tipe
                )}

            </div>

        `;

    }


    container.innerHTML =
        html;


    document.getElementById(
        "btnSebelumnya"
    ).disabled =
        soalAktif === 0;


    const btnBerikutnya =
        document.getElementById(
            "btnBerikutnya"
        );


    if (
        soalAktif ===
        semuaSoal.length - 1
    ) {


        btnBerikutnya.innerHTML = `

            <i class="fa-solid fa-check"></i>

            Selesai

        `;

    } else {


        btnBerikutnya.innerHTML = `

            Berikutnya

            <i class="fa-solid fa-arrow-right"></i>

        `;

    }


    tampilkanJawabanTersimpan();

}


/* =========================
   NAMA TIPE
========================= */

function namaTipeSoal(tipe) {


    if (
        tipe ===
        "pilihan_ganda"
    )

        return "Pilihan Ganda";


    if (
        tipe ===
        "pilihan_ganda_kompleks"
    )

        return "Pilihan Ganda Kompleks";


    if (
        tipe ===
        "benar_salah_kompleks"
    )

        return "Benar / Salah Kompleks";


    return "Soal";

}


/* =========================
   PILIHAN GANDA
========================= */

function buatPilihanGanda(
    soal
) {


    let html = "";


    soal.opsi.forEach(
        (opsi, index) => {


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


    soal.opsi.forEach(
        (opsi, index) => {


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


    soal.pernyataan.forEach(
        (item, index) => {


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
        semuaSoal[soalAktif];


    /* PILIHAN GANDA */

    if (
        soal.tipe ===
        "pilihan_ganda"
    ) {


        const pilihan =
            document.querySelector(
                'input[name="jawaban"]:checked'
            );


        jawabanSiswa[soalAktif] =
            pilihan
                ? pilihan.value
                : null;

    }


    /* PILIHAN GANDA KOMPLEKS */

    else if (
        soal.tipe ===
        "pilihan_ganda_kompleks"
    ) {


        const pilihan =
            document.querySelectorAll(
                'input[name="jawabanKompleks"]:checked'
            );


        jawabanSiswa[soalAktif] =

            Array.from(
                pilihan
            ).map(
                item => item.value
            );

    }


    /* BENAR SALAH KOMPLEKS */

    else if (
        soal.tipe ===
        "benar_salah_kompleks"
    ) {


        const hasil = [];


        soal.pernyataan.forEach(
            (item, index) => {


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


        jawabanSiswa[soalAktif] =
            hasil;

    }

}


/* =========================
   TAMPILKAN JAWABAN
========================= */

function tampilkanJawabanTersimpan() {


    const jawaban =
        jawabanSiswa[soalAktif];


    if (!jawaban)
        return;


    const soal =
        semuaSoal[soalAktif];


    /* PG */

    if (
        soal.tipe ===
        "pilihan_ganda"
    ) {


        const radio =
            document.querySelector(
                `input[name="jawaban"][value="${CSS.escape(jawaban)}"]`
            );


        if (radio)
            radio.checked = true;

    }


    /* PG KOMPLEKS */

    else if (
        soal.tipe ===
        "pilihan_ganda_kompleks"
    ) {


        jawaban.forEach(
            item => {


                const checkbox =
                    document.querySelector(
                        `input[name="jawabanKompleks"][value="${CSS.escape(item)}"]`
                    );


                if (checkbox)
                    checkbox.checked =
                        true;

            }
        );

    }


    /* BENAR SALAH KOMPLEKS */

    else if (
        soal.tipe ===
        "benar_salah_kompleks"
    ) {


        jawaban.forEach(
            (nilai, index) => {


                if (!nilai)
                    return;


                const radio =
                    document.querySelector(
                        `input[name="bs_${soal.id}_${index}"][value="${nilai}"]`
                    );


                if (radio)
                    radio.checked =
                        true;

            }
        );

    }

}


/* =========================
   TOMBOL BERIKUTNYA
========================= */

document
    .getElementById(
        "btnBerikutnya"
    )
    .addEventListener(
        "click",
        function() {


            simpanJawaban();


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


            } else {


                soalAktif++;


                tampilkanSoal();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        }
    );


/* =========================
   TOMBOL SEBELUMNYA
========================= */

document
    .getElementById(
        "btnSebelumnya"
    )
    .addEventListener(
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


/* =========================
   HITUNG NILAI
========================= */

function hitungNilai() {


    let totalSkor = 0;


    let totalMaksimal = 0;


    semuaSoal.forEach(
        (soal, index) => {


            const jawaban =
                jawabanSiswa[index];


            /* PG */

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


            /* PG KOMPLEKS */

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


            /* BENAR SALAH KOMPLEKS */

            else if (
                soal.tipe ===
                "benar_salah_kompleks"
            ) {


                const jumlah =
                    soal.pernyataan.length;


                totalMaksimal +=
                    jumlah;


                if (
                    Array.isArray(
                        jawaban
                    )
                ) {


                    soal.pernyataan.forEach(
                        (item, i) => {


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


    const nilai =

        totalMaksimal > 0

            ? Math.round(
                (
                    totalSkor /
                    totalMaksimal
                ) * 100
            )

            : 0;


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


    localStorage.setItem(

        "hasilQuiz",

        JSON.stringify(
            hasil
        )

    );


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


    return String(text)

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
