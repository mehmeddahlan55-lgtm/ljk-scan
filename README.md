# Koreksi Lembar Jawab

Aplikasi PWA untuk membaca lembar pilihan ganda 50 nomor (A-E) dari foto HP. Pembuat: **Aras Hidayat, S.Pd · SMA Negeri 3 Paloh**.

## Cara unggah ke GitHub Pages
1. Ekstrak `koreksi-ljk-github.zip`.
2. Buat repositori GitHub baru, lalu unggah **seluruh isi folder** hasil ekstrak ke root repositori.
3. Buka **Settings → Pages**, pilih sumber `Deploy from a branch`, branch `main`, folder `/ (root)`, lalu simpan.
4. Buka alamat GitHub Pages yang diberikan. HTTPS diperlukan untuk akses kamera.

## Memasang di HP
- **Android (Chrome):** buka alamat aplikasi, pilih menu ⋮ → *Install app* atau *Tambahkan ke layar utama*.
- **iPhone/iPad (Safari):** buka alamat aplikasi, tekan tombol Bagikan → *Add to Home Screen*.
- Aplikasi dapat dibuka ulang tanpa jaringan setelah aset pertama kali termuat. Saat online, HTML aplikasi diperbarui dengan strategi network-first.

## Cara mencetak lembar
1. Di menu Pengaturan → Lembar Jawab, unduh PDF A4 atau F4.
2. Cetak pada skala **100% / ukuran aktual**, jangan pilih *fit to page* jika printer mengubah ukuran.
3. Satu halaman berisi tiga kartu horizontal. Potong mengikuti dua garis putus-putus. Empat kotak hitam harus tetap utuh.
4. Isian jawaban yang disarankan: pensil 2B atau pulpen gelap. Kolom nama pada lembar hanya panduan; nama diketik di aplikasi.

## Cara menggunakan dalam tiga langkah
1. **Pengaturan:** buat jenis ujian, isi mapel/kelas dan pilih 40 atau 50 soal. Isi kunci dengan mengetuk grid atau tempel teks, lalu tekan *Simpan & Lanjut*.
2. **Pindai:** buka kamera atau pilih foto galeri. Foto dapat berisi satu kartu atau tiga kartu sekaligus. Aplikasi hanya memproses foto di perangkat; tidak mengunggah gambar. Periksa tanda *Cek ulang* dan koreksi jawaban jika perlu.
3. **Simpan & lihat hasil:** ketik nama siswa, simpan hasil, lalu buka menu Hasil untuk peringkat, analisis soal, detail, dan ekspor CSV. Ekspor cadangan JSON secara berkala di menu Riwayat.

## Catatan penggunaan dan akurasi
- Format baca yang didukung adalah lembar standar dari PDF yang disediakan, dengan empat kotak penanda terlihat lengkap. Foto miring/perspektif diluruskan otomatis.
- Jawaban yang meragukan diberi label **Cek ulang**, bukan dipaksakan menjadi pilihan. Dua atau lebih gelembung terisi diberi label **Ganda**.
- Pemrosesan dilakukan pada canvas di browser. Data ujian tersimpan di `localStorage` perangkat dengan kunci `koreksi-ljk-v2`; tema di `koreksi-ljk-tema`; tanggal sampul di `koreksi-ljk-sampul`. Hapus data situs/browser dapat menghapus hasil, jadi ekspor cadangan.
- Lakukan uji coba **5–10 lembar asli** dengan kondisi kamera dan printer sekolah sebelum dipakai untuk ujian resmi. Periksa khusus lembar yang terkena bayangan, lipatan, tulisan keluar gelembung, atau tanda silang.
- Tulisan tangan nama tidak dibaca otomatis; masukkan nama melalui kolom aplikasi.
- Ikon sampul bawaan merupakan simbol lembar jawab generik, bukan lambang resmi sekolah; ganti dengan logo resmi bila tersedia.
- Belum diverifikasi pada semua model HP, kondisi kamera, printer, dan Safari iOS sungguhan. Tes browser sintetis bukan jaminan nol kesalahan pada kertas nyata.

## Hasil uji otomatis
- Chromium + Playwright membaca **13 dari 13 kartu sintetis tanpa salah baca** dari lima foto A4/F4 dan satu kartu lepas; dua tanda samar sengaja dimasukkan dan keduanya diberi status *Cek ulang*.
- Alur pembuatan ujian, tempel kunci, pindai tiga kartu, koreksi manual, simpan, peringkat/analisis/detail, CSV, cadangan, dan pemulihan lulus.
- Ujian 40 soal mengabaikan nomor 41–50. Kamera otomatis, tombol foto manual, dan fallback galeri saat izin ditolak lulus pada simulasi kamera Chromium.
- Tidak ada overflow horizontal pada lebar 360, 390, dan 1440 piksel; font input 16 px. Tema terang/gelap dan aturan sampul harian lulus.
- Hasil tersebut adalah uji otomatis atas foto sintetis dan bukan pengukuran akurasi pada tulisan tangan atau foto HP sungguhan. Uji 5–10 lembar asli sebelum pemakaian resmi.

## Pengembangan
Jalankan `python build.py` untuk membuat `dist/` dan `koreksi-ljk-github.zip`. Jalankan `APK=1 python build.py` untuk menambahkan aset tambahan PWABuilder. Semua file aplikasi (HTML, CSS, JavaScript) berada dalam satu `index.html`.
