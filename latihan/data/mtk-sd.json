document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formIdentitas");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // ==============================
        // AMBIL DATA IDENTITAS
        // ==============================

        const nama =
            document.getElementById("nama").value.trim();

        const sekolah =
            document.getElementById("sekolah").value.trim();

        const kelas =
            document.getElementById("kelas").value.trim();

        const nomor =
            document.getElementById("nomor").value.trim();


        // ==============================
        // VALIDASI
        // ==============================

        if (!nama) {

            alert("Nama siswa wajib diisi.");

            document.getElementById("nama").focus();

            return;

        }


        if (!sekolah) {

            alert("Asal sekolah wajib diisi.");

            document.getElementById("sekolah").focus();

            return;

        }


        if (!kelas) {

            alert("Kelas wajib diisi.");

            document.getElementById("kelas").focus();

            return;

        }


        // ==============================
        // DATA SISWA
        // ==============================

        const dataSiswa = {

            nama: nama,

            sekolah: sekolah,

            kelas: kelas,

            nomor: nomor

        };


        // ==============================
        // SIMPAN IDENTITAS
        // ==============================

        localStorage.setItem(
            "dataSiswa",
            JSON.stringify(dataSiswa)
        );


        // ==============================
        // SIMPAN FILE SOAL
        // ==============================

        /*
            FILE_SOAL berasal dari halaman
            mapel.

            Contoh:

            mtk-sd.html
            ↓
            data/mtk-sd.json
        */

        if (typeof FILE_SOAL !== "undefined") {

            localStorage.setItem(
                "fileSoal",
                FILE_SOAL
            );

        } else {

            alert(
                "File soal belum ditentukan."
            );

            return;

        }


        // ==============================
        // HAPUS HASIL QUIZ SEBELUMNYA
        // ==============================

        localStorage.removeItem("hasilQuiz");


        // ==============================
        // MENUJU HALAMAN QUIZ
        // ==============================

        window.location.href = "quiz.html";

    });

});
