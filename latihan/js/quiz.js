document.addEventListener("DOMContentLoaded", async function () {

    // =========================================================
    // 1. AMBIL DATA SISWA
    // =========================================================
    const dataSiswaJSON = localStorage.getItem("dataSiswa");

    if (!dataSiswaJSON) {
        alert("Data siswa belum diisi. Silakan kembali ke halaman awal.");
        window.location.href = "mtk-sd.html";
        return;
    }

    let dataSiswa;

    try {
        dataSiswa = JSON.parse(dataSiswaJSON);
    } catch (error) {
        console.error("Data siswa tidak valid:", error);
        alert("Data siswa tidak valid. Silakan isi ulang.");
        localStorage.removeItem("dataSiswa");
        window.location.href = "mtk-sd.html";
        return;
    }


    // =========================================================
    // 2. AMBIL LOKASI FILE SOAL
    // =========================================================
    const fileSoal = localStorage.getItem("fileSoal");

    if (!fileSoal) {
        alert("File soal belum ditentukan.");
        window.location.href = "mtk-sd.html";
        return;
    }


    // =========================================================
    // 3. VARIABEL QUIZ
    // =========================================================
    let dataQuiz = null;
    let daftarSoal = [];
    let jawabanSiswa = [];
    let nomorSoalSekarang = 0;


    // =========================================================
    // 4. AMBIL DATA JSON SOAL
    // =========================================================
    try {

        /*
         * CACHE BUSTING
         *
         * ?v=Date.now() membuat URL selalu berbeda
         * sehingga browser tidak menggunakan JSON lama dari cache.
         *
         * cache: "no-store" meminta browser tidak menyimpan
         * hasil fetch ini ke cache.
         */
        const response = await fetch(fileSoal + "?v=" + Date.now(), {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(
                "File soal tidak ditemukan. HTTP Status: " + response.status
            );
        }

        dataQuiz = await response.json();

    } catch (error) {

        console.error("Gagal memuat soal:", error);

        alert(
            "Soal gagal dimuat.\n\n" +
            "Pastikan file JSON tersedia dan formatnya benar.\n\n" +
            "File: " + fileSoal
        );

        return;
    }


    // =========================================================
    // 5. VALIDASI DATA SOAL
    // =========================================================
    if (!dataQuiz.soal || !Array.isArray(dataQuiz.soal)) {

        alert(
            "Format file soal tidak valid.\n\n" +
            "Pastikan terdapat bagian \"soal\" dalam file JSON."
        );

        return;
    }


    // =========================================================
    // 6. SIMPAN DATA SOAL
    // =========================================================
    daftarSoal = dataQuiz.soal.map(function (soal) {

        const soalBaru = {
            ...soal
        };

        // Salin array agar data JSON asli tidak berubah
        if (Array.isArray(soal.opsi)) {
            soalBaru.opsi = [...soal.opsi];
        }

        if (Array.isArray(soal.pernyataan)) {
            soalBaru.pernyataan = soal.pernyataan.map(function (item) {
                return {
                    ...item
                };
            });
        }

        return soalBaru;
    });


    // =========================================================
    // 7. ACAK SOAL
    // =========================================================
    if (dataQuiz.acak_soal === true) {
        daftarSoal = acakArray(daftarSoal);
    }


    // =========================================================
    // 8. ACAK OPSI
    // =========================================================
    if (dataQuiz.acak_opsi === true) {

        daftarSoal.forEach(function (soal) {

            if (
                soal.tipe === "pilihan_ganda" ||
                soal.tipe === "pilihan_ganda_kompleks"
            ) {

                if (Array.isArray(soal.opsi)) {
                    soal.opsi = acakArray(soal.opsi);
                }
            }

        });
    }


    // =========================================================
    // 9. SIAPKAN ARRAY JAWABAN SISWA
    // =========================================================
    jawabanSiswa = daftarSoal.map(function (soal) {

        if (soal.tipe === "pilihan_ganda_kompleks") {
            return [];
        }

        if (soal.tipe === "benar_salah_kompleks") {
            return [];
        }

        return null;
    });


    // =========================================================
    // 10. TAMPILKAN JUDUL QUIZ
    // =========================================================
    const elemenJudul = document.getElementById("judulQuiz");

    if (elemenJudul) {
        elemenJudul.textContent =
            dataQuiz.judul || "Quiz TKA";
    }


    // =========================================================
    // 11. TAMPILKAN IDENTITAS SISWA
    // =========================================================
    const elemenNama = document.getElementById("namaSiswa");

    if (elemenNama) {
        elemenNama.textContent = dataSiswa.nama || "";
    }


    // =========================================================
    // 12. TAMPILKAN JUMLAH SOAL
    // =========================================================
    const elemenJumlahSoal = document.getElementById("jumlahSoal");

    if (elemenJumlahSoal) {
        elemenJumlahSoal.textContent = daftarSoal.length;
    }


    // =========================================================
    // 13. TAMPILKAN SOAL PERTAMA
    // =========================================================
    tampilkanSoal();


    // =========================================================
    // 14. FUNGSI ACAK ARRAY
    // =========================================================
    function acakArray(array) {

        const hasil = [...array];

        for (let i = hasil.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [
                hasil[i],
                hasil[j]
            ] = [
                hasil[j],
                hasil[i]
            ];
        }

        return hasil;
    }


    // =========================================================
    // 15. FUNGSI ESCAPE HTML
    // =========================================================
    function escapeHTML(text) {

        if (text === null || text === undefined) {
            return "";
        }

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    // =========================================================
    // 16. TAMPILKAN SOAL
    // =========================================================
    function tampilkanSoal() {

        const soal = daftarSoal[nomorSoalSekarang];

        if (!soal) {
            return;
        }


        // -----------------------------------------------------
        // Nomor soal
        // -----------------------------------------------------
        const elemenNomor = document.getElementById("nomorSoal");

        if (elemenNomor) {
            elemenNomor.textContent =
                "Soal " + (nomorSoalSekarang + 1) +
                " dari " + daftarSoal.length;
        }


        // -----------------------------------------------------
        // Pertanyaan
        // -----------------------------------------------------
        const elemenPertanyaan =
            document.getElementById("pertanyaan");

        if (elemenPertanyaan) {

            elemenPertanyaan.innerHTML =
                escapeHTML(soal.pertanyaan || "");
        }


        // -----------------------------------------------------
        // Container jawaban
        // -----------------------------------------------------
        const containerJawaban =
            document.getElementById("containerJawaban");

        if (!containerJawaban) {
            console.error(
                "Elemen #containerJawaban tidak ditemukan."
            );
            return;
        }

        containerJawaban.innerHTML = "";


        // =====================================================
        // PILIHAN GANDA
        // =====================================================
        if (soal.tipe === "pilihan_ganda") {

            if (!Array.isArray(soal.opsi)) {
                containerJawaban.innerHTML =
                    '<div class="alert alert-danger">' +
                    'Opsi jawaban tidak ditemukan.' +
                    '</div>';

                return;
            }


            soal.opsi.forEach(function (opsi, index) {

                const id =
                    "opsi_" +
                    nomorSoalSekarang +
                    "_" +
                    index;

                const checked =
                    jawabanSiswa[nomorSoalSekarang] === opsi
                        ? "checked"
                        : "";

                const html = `
                    <div class="form-check answer-option mb-3">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="jawaban"
                            id="${id}"
                            value="${escapeHTML(opsi)}"
                            ${checked}
                        >

                        <label
                            class="form-check-label w-100"
                            for="${id}"
                        >
                            <strong>${String.fromCharCode(65 + index)}.</strong>
                            ${escapeHTML(opsi)}
                        </label>
                    </div>
                `;

                containerJawaban.insertAdjacentHTML(
                    "beforeend",
                    html
                );
            });


            containerJawaban
                .querySelectorAll('input[name="jawaban"]')
                .forEach(function (input) {

                    input.addEventListener("change", function () {

                        jawabanSiswa[nomorSoalSekarang] =
                            this.value;

                    });
                });
        }


        // =====================================================
        // PILIHAN GANDA KOMPLEKS
        // =====================================================
        else if (
            soal.tipe === "pilihan_ganda_kompleks"
        ) {

            if (!Array.isArray(soal.opsi)) {

                containerJawaban.innerHTML =
                    '<div class="alert alert-danger">' +
                    'Opsi jawaban tidak ditemukan.' +
                    '</div>';

                return;
            }


            const jawabanSebelumnya =
                Array.isArray(
                    jawabanSiswa[nomorSoalSekarang]
                )
                    ? jawabanSiswa[nomorSoalSekarang]
                    : [];


            soal.opsi.forEach(function (opsi, index) {

                const id =
                    "opsi_" +
                    nomorSoalSekarang +
                    "_" +
                    index;

                const checked =
                    jawabanSebelumnya.includes(opsi)
                        ? "checked"
                        : "";

                const html = `
                    <div class="form-check answer-option mb-3">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            name="jawaban[]"
                            id="${id}"
                            value="${escapeHTML(opsi)}"
                            ${checked}
                        >

                        <label
                            class="form-check-label w-100"
                            for="${id}"
                        >
                            <strong>${String.fromCharCode(65 + index)}.</strong>
                            ${escapeHTML(opsi)}
                        </label>
                    </div>
                `;

                containerJawaban.insertAdjacentHTML(
                    "beforeend",
                    html
                );
            });


            containerJawaban
                .querySelectorAll('input[name="jawaban[]"]')
                .forEach(function (input) {

                    input.addEventListener(
                        "change",
                        function () {

                            const semuaDipilih =
                                Array.from(
                                    containerJawaban.querySelectorAll(
                                        'input[name="jawaban[]"]:checked'
                                    )
                                ).map(function (item) {
                                    return item.value;
                                });

                            jawabanSiswa[nomorSoalSekarang] =
                                semuaDipilih;
                        }
                    );
                });
        }


        // =====================================================
        // BENAR / SALAH KOMPLEKS
        // =====================================================
        else if (
            soal.tipe === "benar_salah_kompleks"
        ) {

            if (!Array.isArray(soal.pernyataan)) {

                containerJawaban.innerHTML =
                    '<div class="alert alert-danger">' +
                    'Pernyataan soal tidak ditemukan.' +
                    '</div>';

                return;
            }


            const jawabanSebelumnya =
                Array.isArray(
                    jawabanSiswa[nomorSoalSekarang]
                )
                    ? jawabanSiswa[nomorSoalSekarang]
                    : [];


            soal.pernyataan.forEach(function (
                pernyataan,
                index
            ) {

                const jawaban =
                    jawabanSebelumnya[index] || "";


                const html = `
                    <div class="border rounded p-3 mb-3">

                        <div class="fw-semibold mb-3">
                            ${index + 1}.
                            ${escapeHTML(pernyataan.teks)}
                        </div>

                        <div class="d-flex gap-2 flex-wrap">

                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="bs_${nomorSoalSekarang}_${index}"
                                    id="benar_${nomorSoalSekarang}_${index}"
                                    value="Benar"
                                    ${jawaban === "Benar" ? "checked" : ""}
                                >

                                <label
                                    class="form-check-label"
                                    for="benar_${nomorSoalSekarang}_${index}"
                                >
                                    Benar
                                </label>
                            </div>

                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="bs_${nomorSoalSekarang}_${index}"
                                    id="salah_${nomorSoalSekarang}_${index}"
                                    value="Salah"
                                    ${jawaban === "Salah" ? "checked" : ""}
                                >

                                <label
                                    class="form-check-label"
                                    for="salah_${nomorSoalSekarang}_${index}"
                                >
                                    Salah
                                </label>
                            </div>

                        </div>

                    </div>
                `;

                containerJawaban.insertAdjacentHTML(
                    "beforeend",
                    html
                );
            });


            containerJawaban
                .querySelectorAll(
                    'input[type="radio"]'
                )
                .forEach(function (input) {

                    input.addEventListener(
                        "change",
                        function () {

                            if (
                                !Array.isArray(
                                    jawabanSiswa[
                                        nomorSoalSekarang
                                    ]
                                )
                            ) {

                                jawabanSiswa[
                                    nomorSoalSekarang
                                ] = [];
                            }


                            const nama =
                                this.name;

                            const bagian =
                                nama.split("_");

                            const index =
                                parseInt(
                                    bagian[
                                        bagian.length - 1
                                    ]
                                );


                            jawabanSiswa[
                                nomorSoalSekarang
                            ][index] = this.value;
                        }
                    );
                });
        }


        // =====================================================
        // TIPE SOAL TIDAK DIKENAL
        // =====================================================
        else {

            containerJawaban.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Tipe soal
                    <strong>${escapeHTML(soal.tipe)}</strong>
                    belum didukung.
                </div>
            `;
        }


        // =====================================================
        // UPDATE TOMBOL NAVIGASI
        // =====================================================
        updateNavigasi();
    }


    // =========================================================
    // 17. NAVIGASI SOAL
    // =========================================================
    function updateNavigasi() {

        const tombolSebelumnya =
            document.getElementById("btnSebelumnya");

        const tombolBerikutnya =
            document.getElementById("btnBerikutnya");

        const tombolSelesai =
            document.getElementById("btnSelesai");


        // -----------------------------------------------------
        // Tombol sebelumnya
        // -----------------------------------------------------
        if (tombolSebelumnya) {

            tombolSebelumnya.disabled =
                nomorSoalSekarang === 0;
        }


        // -----------------------------------------------------
        // Tombol berikutnya
        // -----------------------------------------------------
        if (tombolBerikutnya) {

            tombolBerikutnya.style.display =
                nomorSoalSekarang === daftarSoal.length - 1
                    ? "none"
                    : "inline-block";
        }


        // -----------------------------------------------------
        // Tombol selesai
        // -----------------------------------------------------
        if (tombolSelesai) {

            tombolSelesai.style.display =
                nomorSoalSekarang === daftarSoal.length - 1
                    ? "inline-block"
                    : "none";
        }
    }


    // =========================================================
    // 18. TOMBOL SEBELUMNYA
    // =========================================================
    const btnSebelumnya =
        document.getElementById("btnSebelumnya");

    if (btnSebelumnya) {

        btnSebelumnya.addEventListener(
            "click",
            function () {

                if (nomorSoalSekarang > 0) {

                    nomorSoalSekarang--;

                    tampilkanSoal();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            }
        );
    }


    // =========================================================
    // 19. TOMBOL BERIKUTNYA
    // =========================================================
    const btnBerikutnya =
        document.getElementById("btnBerikutnya");

    if (btnBerikutnya) {

        btnBerikutnya.addEventListener(
            "click",
            function () {

                if (
                    nomorSoalSekarang <
                    daftarSoal.length - 1
                ) {

                    nomorSoalSekarang++;

                    tampilkanSoal();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            }
        );
    }


    // =========================================================
    // 20. TOMBOL SELESAI
    // =========================================================
    const btnSelesai =
        document.getElementById("btnSelesai");

    if (btnSelesai) {

        btnSelesai.addEventListener(
            "click",
            function () {

                const yakin = confirm(
                    "Apakah Bapak/Ibu yakin ingin menyelesaikan quiz?"
                );

                if (!yakin) {
                    return;
                }

                hitungHasil();
            }
        );
    }


    // =========================================================
    // 21. HITUNG HASIL
    // =========================================================
    function hitungHasil() {

        let totalSkor = 0;
        let totalMaksimal = 0;


        daftarSoal.forEach(function (
            soal,
            index
        ) {

            const jawaban =
                jawabanSiswa[index];


            // =================================================
            // PILIHAN GANDA
            // =================================================
            if (soal.tipe === "pilihan_ganda") {

                totalMaksimal += 1;

                if (
                    jawaban !== null &&
                    jawaban !== undefined &&
                    String(jawaban) ===
                    String(soal.jawaban)
                ) {

                    totalSkor += 1;
                }
            }


            // =================================================
            // PILIHAN GANDA KOMPLEKS
            // =================================================
            else if (
                soal.tipe === "pilihan_ganda_kompleks"
            ) {

                totalMaksimal += 1;


                const jawabanBenar =
                    Array.isArray(soal.jawaban)
                        ? [...soal.jawaban]
                        : [];


                const jawabanDipilih =
                    Array.isArray(jawaban)
                        ? [...jawaban]
                        : [];


                jawabanBenar.sort();
                jawabanDipilih.sort();


                const sama =
                    JSON.stringify(jawabanBenar) ===
                    JSON.stringify(jawabanDipilih);


                if (sama) {
                    totalSkor += 1;
                }
            }


            // =================================================
            // BENAR SALAH KOMPLEKS
            // =================================================
            else if (
                soal.tipe === "benar_salah_kompleks"
            ) {

                const pernyataan =
                    Array.isArray(soal.pernyataan)
                        ? soal.pernyataan
                        : [];


                totalMaksimal +=
                    pernyataan.length;


                pernyataan.forEach(
                    function (
                        item,
                        indexPernyataan
                    ) {

                        const jawabanBenar =
                            item.jawaban;


                        const jawabanDipilih =
                            Array.isArray(jawaban)
                                ? jawaban[
                                    indexPernyataan
                                ]
                                : null;


                        if (
                            jawabanDipilih &&
                            jawabanDipilih ===
                            jawabanBenar
                        ) {

                            totalSkor += 1;
                        }
                    }
                );
            }

        });


        // =====================================================
        // HITUNG NILAI 0 - 100
        // =====================================================
        let nilai = 0;

        if (totalMaksimal > 0) {

            nilai = Math.round(
                (
                    totalSkor /
                    totalMaksimal
                ) * 100
            );
        }


        // =====================================================
        // STATUS KKM
        // =====================================================
        const kkm =
            Number(dataQuiz.kkm || 0);


        const status =
            nilai >= kkm
                ? "Tuntas"
                : "Belum Tuntas";


        // =====================================================
        // DATA HASIL QUIZ
        // =====================================================
        const hasilQuiz = {

            nama:
                dataSiswa.nama || "",

            sekolah:
                dataSiswa.sekolah || "",

            kelas:
                dataSiswa.kelas || "",

            nomor:
                dataSiswa.nomor || "",

            judul:
                dataQuiz.judul || "Quiz TKA",

            mapel:
                dataQuiz.mapel || "",

            jenjang:
                dataQuiz.jenjang || "",

            kkm:
                kkm,

            jumlahSoal:
                daftarSoal.length,

            skor:
                totalSkor,

            skorMaksimal:
                totalMaksimal,

            nilai:
                nilai,

            status:
                status,

            tanggal:
                new Date().toLocaleString(
                    "id-ID"
                )
        };


        // =====================================================
        // SIMPAN HASIL
        // =====================================================
        localStorage.setItem(
            "hasilQuiz",
            JSON.stringify(hasilQuiz)
        );


        // =====================================================
        // PINDAH KE HALAMAN HASIL
        // =====================================================
        window.location.href = "hasil.html";
    }

});
