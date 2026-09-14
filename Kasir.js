/* Daftar barang dan harga */
const daftarBarang = {

    laptop: 5000000,
    mouse: 75000,
    keyboard: 150000,
    monitor: 1500000,
    headset: 200000,
    flashdisk: 80000

};


/* Keranjang belanja */
let keranjang = [];


/* Mengecek barang dan mengisi harga otomatis */
function cekBarang() {

    let nama = document.getElementById("namaBarang").value;

    if (daftarBarang[nama]) {

        document.getElementById("hargaBarang").value =
            daftarBarang[nama];

    }

}


/* Menambahkan barang ke keranjang */
function tambahBarang() {

    let nama = document.getElementById("namaBarang").value;

    let harga = Number(
        document.getElementById("hargaBarang").value
    );

    let jumlah = Number(
        document.getElementById("jumlahBarang").value
    );


    /* Validasi input barang dan jumlah */
    if (nama === "" || harga <= 0 || jumlah <= 0) {

        alert("Silakan isi jumlah dengan benar");

        return;
    }


    /* Memasukkan barang ke dalam keranjang */
    keranjang.push({

        nama: nama,
        harga: harga,
        jumlah: jumlah,
        subtotal: harga * jumlah

    });


    /* Menampilkan isi keranjang */
    tampilkanKeranjang();


    /* Mengosongkan input setelah barang ditambahkan */
    document.getElementById("namaBarang").value = "";

    document.getElementById("hargaBarang").value = "";

    document.getElementById("jumlahBarang").value = "";

}


/* Menampilkan daftar barang di keranjang */
function tampilkanKeranjang() {

    let daftar =
        document.getElementById("daftarKeranjang");

    daftar.innerHTML = "";

    let subtotal = 0;


    /* Mengulang semua barang yang ada di keranjang */
    keranjang.forEach((barang, index) => {

        subtotal += barang.subtotal;


        /* Membuat baris barang pada tabel */
        daftar.innerHTML += `

            <tr>

                <td>${barang.nama}</td>

                <td>${formatRupiah(barang.harga)}</td>

                <td>${barang.jumlah}</td>

                <td>${formatRupiah(barang.subtotal)}</td>

                <td>

                    <button class="hapus"
                        onclick="hapusBarang(${index})">

                        Hapus

                    </button>

                </td>

            </tr>

        `;

    });


    /* Menghitung total transaksi */
    hitungTotal(subtotal);

}


/* Menghapus barang dari keranjang */
function hapusBarang(index) {

    keranjang.splice(index, 1);

    tampilkanKeranjang();

}


/* Menghitung subtotal, diskon, dan total */
function hitungTotal(subtotal) {

    let diskon = 0;


    /* Menghitung diskon berdasarkan subtotal */
    if (subtotal >= 500000) {

        diskon = subtotal * 10 / 100;

    } else if (subtotal >= 300000) {

        diskon = subtotal * 5 / 100;

    }


    /* Menghitung total setelah diskon */
    let total = subtotal - diskon;


    /* Menampilkan subtotal */
    document.getElementById("hasilSubtotal").innerText =
        formatRupiah(subtotal);


    /* Menampilkan diskon */
    document.getElementById("hasilDiskon").innerText =
        formatRupiah(diskon);


    /* Menampilkan total */
    document.getElementById("hasilTotal").innerText =
        formatRupiah(total);

}


/* Menghitung pembayaran dan uang kembalian */
function hitungKembalian() {

    /* Mengambil total dari halaman */
    let totalText =
        document.getElementById("hasilTotal").innerText;


    /* Mengubah tulisan total menjadi angka */
    let total = Number(
        totalText.replace("Rp", "").replace(/\./g, "")
    );


    /* Mengambil uang yang diberikan pelanggan */
    let uang = Number(
        document.getElementById("uangPelanggan").value
    );


    /* Mengecek apakah uang sudah dimasukkan */
    if (uang <= 0) {

        alert("Masukkan uang pelanggan terlebih dahulu");

        return;

    }


    /* Mengecek apakah uang pelanggan cukup */
    if (uang < total) {

        alert("Maaf uang anda kurang");

        return;

    }


    /* Menghitung uang kembalian */
    let kembalian = uang - total;


    /* Menampilkan uang pelanggan */
    document.getElementById("hasilUangPelanggan").innerText =
        formatRupiah(uang);


    /* Menampilkan uang kembalian */
    document.getElementById("hasilKembalian").innerText =
        formatRupiah(kembalian);

}


/* Mengubah angka menjadi format Rupiah */
function formatRupiah(angka) {

    return "Rp" + angka.toLocaleString("id-ID");

}


/* Mereset seluruh transaksi */
function resetKasir() {

    /* Mengosongkan keranjang */
    keranjang = [];


/* Mengosongkan semua input */
document.getElementById("namaBarang").value = "";

document.getElementById("hargaBarang").value = "";

document.getElementById("jumlahBarang").value = "";

document.getElementById("uangPelanggan").value = "";


/* Mengosongkan daftar keranjang */
document.getElementById("daftarKeranjang").innerHTML = "";


/* Mengembalikan hasil transaksi ke Rp0 */
document.getElementById("hasilSubtotal").innerText = "Rp0";

document.getElementById("hasilDiskon").innerText = "Rp0";

document.getElementById("hasilTotal").innerText = "Rp0";

document.getElementById("hasilUangPelanggan").innerText = "Rp0";

document.getElementById("hasilKembalian").innerText = "Rp0";

}