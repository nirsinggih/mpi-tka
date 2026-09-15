let semuaSoal = [];
let soalAktif = 0;
let jawabanSiswa = [];
let dataSiswa = null;
let judulQuiz = "";

document.addEventListener("DOMContentLoaded", async function() {

    dataSiswa = JSON.parse(
        localStorage.getItem("dataSiswa")
    );

    if (!dataSiswa) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("identitasMini").textContent =
        dataSiswa.nama + " • " + dataSiswa.sekolah;

    try {

        const response = await fetch("data/soal.json");

        if (!response.ok) {
            throw new Error("Gagal membaca soal.json");
        }

        const data = await response.json();

        judulQuiz = data.judul;

        document.getElementById("judulQuiz").textContent =
            judulQuiz;

        semuaSoal = [...data.soal];

        if (data.acak_soal) {
            semuaSoal = acakArray(semuaSoal);
        }

        if (data.acak_opsi) {

            semuaSoal.forEach(soal => {

                if (soal.opsi) {
                    soal.opsi = acakArray([...soal.opsi]);
                }

                if (soal.pasangan) {

                    soal.pasangan = acakArray(
                        [...soal.pasangan]
                    );

                }

            });

        }

        jawabanSiswa = new Array(
            semuaSoal.length
        ).fill(null);

        tampilkanSoal();

    } catch(error) {

        console.error(error);

        document.getElementById(
            "soalContainer"
        ).innerHTML = `
            <div class="alert alert-danger">
                Gagal memuat soal.
                <br>
                Pastikan file
                <strong>data/soal.json</strong>
                tersedia.
            </div>
        `;

    }

});


function acakArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}


function tampilkanSoal() {

    const soal = semuaSoal[soalAktif];

    const container =
        document.getElementById("soalContainer");

    document.getElementById("nomorSoal").textContent =
        `${soalAktif + 1}/${semuaSoal.length}`;

    const persen =
        ((soalAktif + 1) / semuaSoal.length) * 100;

    document.getElementById("progressBar")
        .style.width = persen + "%";


    let html = `
        <div class="soal-nomor">
            SOAL ${soalAktif + 1}
        </div>

        <div class="badge bg-secondary mb-3">
            ${namaTipeSoal(soal.tipe)}
        </div>

        <div class="soal-pertanyaan">
            ${soal.pertanyaan}
        </div>
    `;


    if (soal.tipe === "pilihan_ganda") {

        html += buatPilihanGanda(soal);

    }


    else if (
        soal.tipe === "pilihan_ganda_kompleks"
    ) {

        html += buatPilihanGandaKompleks(soal);

    }


    else if (soal.tipe === "benar_salah") {

        html += buatBenarSalah(soal);

    }


    else if (soal.tipe === "menjodohkan") {

        html += buatMenjodohkan(soal);

    }


    container.innerHTML = html;


    document.getElementById("btnSebelumnya")
        .disabled = soalAktif === 0;


    const btnBerikutnya =
        document.getElementById("btnBerikutnya");


    if (soalAktif === semuaSoal.length - 1) {

        btnBerikutnya.innerHTML =
            `<i class="fa-solid fa-check"></i>
             Selesai`;

    } else {

        btnBerikutnya.innerHTML =
            `Berikutnya
             <i class="fa-solid fa-arrow-right"></i>`;
    }


    tampilkanJawabanTersimpan();
}


function namaTipeSoal(tipe) {

    if (tipe === "pilihan_ganda")
        return "Pilihan Ganda";

    if (tipe === "pilihan_ganda_kompleks")
        return "Pilihan Ganda Kompleks";

    if (tipe === "benar_salah")
        return "Benar / Salah";

    if (tipe === "menjodohkan")
        return "Menjodohkan";

    return "Soal";
}


function buatPilihanGanda(soal) {

    let html = "";

    soal.opsi.forEach((opsi, index) => {

        const id = `opsi_${index}`;

        html += `
            <div class="opsi-item">

                <label for="${id}">

                    <input
                        type="radio"
                        name="jawaban"
                        id="${id}"
                        value="${escapeHTML(opsi)}">

                    ${escapeHTML(opsi)}

                </label>

            </div>
        `;

    });

    return html;
}


function buatPilihanGandaKompleks(soal) {

    let html = `
        <div class="alert alert-warning">
            <i class="fa-solid fa-circle-info"></i>
            Pilih semua jawaban yang benar.
        </div>
    `;

    soal.opsi.forEach((opsi, index) => {

        const id = `kompleks_${index}`;

        html += `
            <div class="opsi-item">

                <label for="${id}">

                    <input
                        type="checkbox"
                        name="jawabanKompleks"
                        id="${id}"
                        value="${escapeHTML(opsi)}">

                    ${escapeHTML(opsi)}

                </label>

            </div>
        `;

    });

    return html;
}


function buatBenarSalah(soal) {

    return `
        <div class="row g-3">

            <div class="col-6">

                <label class="btn btn-outline-success w-100 p-3">

                    <input
                        type="radio"
                        name="jawaban"
                        value="Benar">

                    <i class="fa-solid fa-check"></i>
                    Benar

                </label>

            </div>

            <div class="col-6">

                <label class="btn btn-outline-danger w-100 p-3">

                    <input
                        type="radio"
                        name="jawaban"
                        value="Salah">

                    <i class="fa-solid fa-xmark"></i>
                    Salah

                </label>

            </div>

        </div>
    `;
}


function buatMenjodohkan(soal) {

    const jawabanPilihan =
        soal.pasangan.map(
            p => p.jawaban
        );

    const pilihanAcak =
        acakArray([...jawabanPilihan]);

    let html = "";

    soal.pasangan.forEach((pasangan, index) => {

        html += `

            <div class="match-row">

                <div class="match-question">

                    ${escapeHTML(
                        pasangan.pertanyaan
                    )}

                </div>

                <div>

                    <select
                        class="form-select"
                        data-match-index="${index}">

                        <option value="">
                            -- Pilih Jawaban --
                        </option>

                        ${pilihanAcak.map(j =>
                            `<option value="${escapeHTML(j)}">
                                ${escapeHTML(j)}
                            </option>`
                        ).join("")}

                    </select>

                </div>

            </div>
        `;

    });

    return html;
}


function simpanJawaban() {

    const soal = semuaSoal[soalAktif];


    if (
        soal.tipe === "pilihan_ganda" ||
        soal.tipe === "benar_salah"
    ) {

        const pilihan =
            document.querySelector(
                'input[name="jawaban"]:checked'
            );

        jawabanSiswa[soalAktif] =
            pilihan ? pilihan.value : null;

    }


    else if (
        soal.tipe === "pilihan_ganda_kompleks"
    ) {

        const pilihan =
            document.querySelectorAll(
                'input[name="jawabanKompleks"]:checked'
            );

        jawabanSiswa[soalAktif] =
            Array.from(pilihan)
                .map(item => item.value);

    }


    else if (
        soal.tipe === "menjodohkan"
    ) {

        const selects =
            document.querySelectorAll(
                "[data-match-index]"
            );

        const hasil = [];

        selects.forEach(select => {

            hasil.push(select.value);

        });

        jawabanSiswa[soalAktif] = hasil;

    }

}


function tampilkanJawabanTersimpan() {

    const jawaban =
        jawabanSiswa[soalAktif];

    if (!jawaban) return;


    const soal =
        semuaSoal[soalAktif];


    if (
        soal.tipe === "pilihan_ganda" ||
        soal.tipe === "benar_salah"
    ) {

        const radio =
            document.querySelector(
                `input[name="jawaban"][value="${CSS.escape(jawaban)}"]`
            );

        if (radio) {
            radio.checked = true;
        }

    }


    else if (
        soal.tipe === "pilihan_ganda_kompleks"
    ) {

        jawaban.forEach(item => {

            const checkbox =
                document.querySelector(
                    `input[name="jawabanKompleks"][value="${CSS.escape(item)}"]`
                );

            if (checkbox) {
                checkbox.checked = true;
            }

        });

    }


    else if (
        soal.tipe === "menjodohkan"
    ) {

        const selects =
            document.querySelectorAll(
                "[data-match-index]"
            );

        jawaban.forEach(
            (nilai, index) => {

                if (selects[index]) {
                    selects[index].value = nilai;
                }

            }
        );

    }

}


document
    .getElementById("btnBerikutnya")
    .addEventListener("click", function() {

        simpanJawaban();

        if (
            soalAktif ===
            semuaSoal.length - 1
        ) {

            if (
                confirm(
                    "Apakah Bapak/Ibu yakin ingin mengakhiri quiz?"
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

    });


document
    .getElementById("btnSebelumnya")
    .addEventListener("click", function() {

        simpanJawaban();

        if (soalAktif > 0) {

            soalAktif--;

            tampilkanSoal();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });


function hitungNilai() {

    let benar = 0;

    semuaSoal.forEach(
        (soal, index) => {

            const jawaban =
                jawabanSiswa[index];


            if (
                soal.tipe === "pilihan_ganda" ||
                soal.tipe === "benar_salah"
            ) {

                if (
                    jawaban === soal.jawaban
                ) {

                    benar++;

                }

            }


            else if (
                soal.tipe === "pilihan_ganda_kompleks"
            ) {

                if (
                    Array.isArray(jawaban)
                    &&
                    arraySama(
                        jawaban,
                        soal.jawaban
                    )
                ) {

                    benar++;

                }

            }


            else if (
                soal.tipe === "menjodohkan"
            ) {

                if (
                    Array.isArray(jawaban)
                ) {

                    let benarPasangan = 0;

                    soal.pasangan.forEach(
                        (pasangan, i) => {

                            if (
                                jawaban[i] ===
                                pasangan.jawaban
                            ) {

                                benarPasangan++;

                            }

                        }
                    );

                    if (
                        benarPasangan ===
                        soal.pasangan.length
                    ) {

                        benar++;

                    }

                }

            }

        }
    );


    const nilai =
        Math.round(
            (benar / semuaSoal.length) * 100
        );


    const hasil = {

        nama: dataSiswa.nama,

        sekolah: dataSiswa.sekolah,

        kelas: dataSiswa.kelas,

        nomor: dataSiswa.nomor,

        judul: judulQuiz,

        jumlahSoal: semuaSoal.length,

        benar: benar,

        nilai: nilai,

        tanggal: new Date()
            .toLocaleDateString(
                "id-ID",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            )

    };


    localStorage.setItem(
        "hasilQuiz",
        JSON.stringify(hasil)
    );


    window.location.href =
        "hasil.html";

}


function arraySama(a, b) {

    if (!Array.isArray(a) ||
        !Array.isArray(b)) {

        return false;

    }

    if (a.length !== b.length) {

        return false;

    }

    const x =
        [...a].sort();

    const y =
        [...b].sort();

    return x.every(
        (value, index) =>
            value === y[index]
    );

}


function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
