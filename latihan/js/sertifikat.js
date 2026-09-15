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
            "sertifikatNama"
        ).textContent =
            hasil.nama;


        document.getElementById(
            "sertifikatKelas"
        ).textContent =
            hasil.kelas;


        document.getElementById(
            "sertifikatSekolah"
        ).textContent =
            hasil.sekolah;


        document.getElementById(
            "sertifikatQuiz"
        ).textContent =
            hasil.judul;


        document.getElementById(
            "sertifikatNilai"
        ).textContent =
            hasil.nilai;


        document.getElementById(
            "sertifikatPredikat"
        ).textContent =
            tentukanPredikat(
                hasil.nilai
            );


        document.getElementById(
            "sertifikatNomor"
        ).textContent =
            hasil.nomor || "-";


        document.getElementById(
            "sertifikatTanggal"
        ).textContent =
            hasil.tanggal;

    }
);


function tentukanPredikat(nilai) {

    if (nilai >= 90)
        return "SANGAT BAIK";

    if (nilai >= 80)
        return "BAIK";

    if (nilai >= 70)
        return "CUKUP";

    return "PERLU BELAJAR LAGI";

}


function cetakSertifikat() {

    window.print();

}


async function downloadJPG() {

    const sertifikat =
        document.getElementById(
            "sertifikat"
        );


    try {

        const canvas =
            await html2canvas(
                sertifikat,
                {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff"
                }
            );


        const link =
            document.createElement("a");


        const hasil =
            JSON.parse(
                localStorage.getItem(
                    "hasilQuiz"
                )
            );


        const namaFile =
            "Sertifikat-" +
            bersihkanNama(
                hasil.nama
            ) +
            ".jpg";


        link.download =
            namaFile;


        link.href =
            canvas.toDataURL(
                "image/jpeg",
                0.95
            );


        link.click();

    } catch(error) {

        console.error(error);

        alert(
            "Gagal membuat JPG. Silakan coba lagi."
        );

    }

}


function bersihkanNama(nama) {

    return nama
        .replace(
            /[^a-zA-Z0-9\s]/g,
            ""
        )
        .replace(
            /\s+/g,
            "-"
        );

}
