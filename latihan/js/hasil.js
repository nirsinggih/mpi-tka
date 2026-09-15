document.addEventListener(
    "DOMContentLoaded",
    function() {


        const hasil =
            JSON.parse(
                localStorage.getItem(
                    "hasilQuiz"
                )
            );


        if (!hasil) {

            window.location.href =
                "index.html";

            return;

        }


        document.getElementById(
            "hasilNama"
        ).textContent =
            hasil.nama;


        document.getElementById(
            "hasilSekolah"
        ).textContent =
            hasil.sekolah;


        document.getElementById(
            "hasilKelas"
        ).textContent =
            "Kelas " +
            hasil.kelas;


        document.getElementById(
            "jumlahSoal"
        ).textContent =
            hasil.jumlahSoal;


        document.getElementById(
            "jumlahBenar"
        ).textContent =

            hasil.skor +
            " / " +
            hasil.skorMaksimal;


        document.getElementById(
            "nilai"
        ).textContent =
            hasil.nilai;


        document.getElementById(
            "predikat"
        ).textContent =

            tentukanPredikat(
                hasil.nilai
            );

    }
);


function tentukanPredikat(
    nilai
) {


    if (nilai >= 90)

        return "SANGAT BAIK";


    if (nilai >= 80)

        return "BAIK";


    if (nilai >= 70)

        return "CUKUP";


    return "PERLU BELAJAR LAGI";

}


function ulangQuiz() {


    localStorage.removeItem(
        "hasilQuiz"
    );


    window.location.href =
        "index.html";

}
