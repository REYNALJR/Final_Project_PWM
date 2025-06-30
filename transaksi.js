document.getElementById("formTransaksi").addEventListener("submit", function(e) {
  e.preventDefault();

  const jenis = document.getElementById("jenisTransaksi").value;
  const nama = document.getElementById("namaBarang").value.trim();
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const harga = parseInt(document.getElementById("harga").value);
  const keterangan = document.getElementById("keterangan").value.trim(); // ✅ ambil input keterangan

  if (!nama || isNaN(jumlah) || isNaN(harga)) {
    alert("Harap isi nama, jumlah, dan harga dengan benar.");
    return;
  }

  const tanggal = new Date().toISOString().split("T")[0];
  let total = jumlah * harga;
  if (jenis === "pengeluaran") total = -total;

  const ringkasan = `
📝 Konfirmasi Transaksi:
Jenis      : ${jenis.charAt(0).toUpperCase() + jenis.slice(1)}
Nama       : ${nama}
Jumlah     : ${jumlah}
Harga      : Rp${harga}
${keterangan ? "Keterangan : " + keterangan : ""}
Total      : Rp${Math.abs(total)}

Lanjut simpan transaksi ini?
`;

  const konfirmasi = confirm(ringkasan);
  if (!konfirmasi) return;

  const username = localStorage.getItem("usernameAktif");
  const key = `transaksi_${username}`;
  const data = JSON.parse(localStorage.getItem(key)) || [];

  data.push({ nama, jumlah, harga, keterangan, total, tanggal }); // ✅ simpan keterangan juga
  localStorage.setItem(key, JSON.stringify(data));

  alert(`✅ Transaksi ${jenis} berhasil disimpan.`);
  this.reset();
});
