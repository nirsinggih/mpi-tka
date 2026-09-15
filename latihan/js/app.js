document
    .getElementById("formIdentitas")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();


            const nama =
                document
                    .getElementById("nama")
                    .value
                    .trim();


            const sekolah =
                document
                    .getElementById("sekolah")
                    .value
                    .trim();


            const kelas =
                document
                    .getElementById("kelas")
                    .value;


            const nomor =
                document
                    .getElementById("nomor")
                    .value
                    .trim();


            if (
                !nama ||
                !sekolah ||
                !kelas
            ) {

                alert(
                    "Mohon lengkapi identitas siswa."
                );

                return;

            }


            const siswa = {

                nama: nama,

                sekolah: sekolah,

                kelas: kelas,

                nomor: nomor

            };


            localStorage.setItem(
                "dataSiswa",
                JSON.stringify(siswa)
            );


            localStorage.removeItem(
                "hasilQuiz"
            );


            window.location.href =
                "quiz.html";

        }
    );
