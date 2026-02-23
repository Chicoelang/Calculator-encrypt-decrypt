# 🔐 Kalkulator Enkripsi-Dekripsi

Program kalkulator enkripsi-dekripsi berbasis web dengan berbagai metode cipher klasik.

## 📋 Deskripsi

Aplikasi web sederhana yang memungkinkan pengguna untuk mengenkripsi dan mendekripsi teks menggunakan 5 metode cipher klasik yang berbeda:

1. **Vigenere Cipher** (26 huruf alfabet)
2. **Affine Cipher**
3. **Playfair Cipher** (26 huruf alfabet)
4. **Hill Cipher**
5. **Enigma Cipher**

## 🚀 Cara Menggunakan

### Instalasi dan Menjalankan

1. **Download atau Clone** folder project ini
2. **Buka file** `index.html` di browser favorit Anda (Chrome, Firefox, Edge, dll)
3. Aplikasi siap digunakan! Tidak perlu instalasi tambahan.

### Cara Pakai

1. **Pilih Metode Cipher** dari dropdown menu
2. **Masukkan Teks** yang ingin dienkripsi/dekripsi
3. **Masukkan Kunci** sesuai dengan format yang diminta setiap cipher
4. **Klik Tombol**:
   - 🔒 **Enkripsi** - untuk mengenkripsi teks
   - 🔓 **Dekripsi** - untuk mendekripsi teks
   - 🗑️ **Bersihkan** - untuk mengosongkan form
5. **Hasil** akan muncul di kotak output
6. **Salin Hasil** dengan klik tombol 📋 Salin Hasil

### 🌙 Dark Mode

Aplikasi dilengkapi dengan **Dark Mode** untuk kenyamanan mata:

- **Klik tombol 🌙** di pojok kanan atas untuk toggle Dark Mode
- Preferensi Dark Mode **disimpan otomatis** di browser Anda
- **Light Mode** (☀️): Tema terang dengan gradien ungu
- **Dark Mode** (🌙): Tema gelap dengan warna biru gelap yang nyaman di mata

**Fitur Dark Mode:**
- ✅ Transisi smooth dan animasi yang halus
- ✅ Semua elemen otomatis menyesuaikan (input, button, teks)
- ✅ Preferensi disimpan di localStorage browser
- ✅ Responsive di semua ukuran layar

## 📚 Penjelasan Cipher

### 1. Vigenere Cipher (26 huruf alfabet)

**Deskripsi**: Menggunakan kata kunci untuk menggeser setiap huruf plaintext.

**Format Kunci**: Kata/huruf alfabet (A-Z)

**Contoh**:
- Kunci: `KEY`
- Plaintext: `HELLO`
- Ciphertext: `RIJVS`

**Cara Kerja**:
- Setiap huruf plaintext digeser sebanyak nilai huruf kunci
- Kunci diulang jika lebih pendek dari plaintext

---

### 2. Affine Cipher

**Deskripsi**: Menggunakan fungsi matematika E(x) = (ax + b) mod 26

**Format Kunci**: `a,b` (contoh: `5,8`)

**Contoh**:
- Kunci: `5,8`
- Plaintext: `HELLO`
- Ciphertext: `RCLLA`

**Aturan**:
- Nilai `a` harus relatif prima dengan 26
- Nilai `a` yang valid: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25
- Nilai `b` bisa 0-25

---

### 3. Playfair Cipher (26 huruf alfabet)

**Deskripsi**: Menggunakan matriks 5x5 untuk enkripsi berpasangan huruf.

**Format Kunci**: Kata/huruf alfabet (A-Z)

**Contoh**:
- Kunci: `PLAYFAIR`
- Plaintext: `HELLO`
- Ciphertext: `DMYRANR` (hasil dapat bervariasi)

**Catatan**:
- Huruf J dianggap sama dengan I
- Teks diproses berpasangan
- Jika ada huruf kembar, akan disisipkan X

---

### 4. Hill Cipher

**Deskripsi**: Menggunakan matriks 2x2 untuk enkripsi.

**Format Kunci**: `a,b,c,d` untuk matriks [[a,b],[c,d]]

**Contoh**:
- Kunci: `3,3,2,5`
- Plaintext: `HELP`
- Ciphertext: `ZEBU` (contoh)

**Aturan**:
- Kunci harus 4 angka
- Determinan matriks harus relatif prima dengan 26
- Teks diproses berpasangan

**Contoh kunci yang valid**:
- `3,3,2,5`
- `5,8,17,3`

---

### 5. Enigma Cipher

**Deskripsi**: Simulasi mesin Enigma dengan 3 rotor.

**Format Kunci**: `rotor1,rotor2,rotor3,pos1,pos2,pos3` atau kosongkan untuk default

**Contoh**:
- Kunci: `1,2,3,0,0,0` (atau kosongkan)
- Plaintext: `HELLO`
- Ciphertext: `MFNCP` (contoh)

**Aturan**:
- Nomor rotor: 1, 2, atau 3
- Posisi rotor: 0-25
- Enigma bersifat reciprocal (enkripsi = dekripsi dengan kunci sama)
- Kosongkan kunci untuk menggunakan default (1,2,3,0,0,0)

## 📁 Struktur File

```
Kriptografi/
│
├── index.html              # File HTML utama
│
├── css/
│   └── style.css          # Styling aplikasi
│
├── js/
│   ├── app.js             # Logika utama aplikasi
│   │
│   └── ciphers/           # Folder untuk semua cipher
│       ├── vigenere.js    # Implementasi Vigenere Cipher
│       ├── affine.js      # Implementasi Affine Cipher
│       ├── playfair.js    # Implementasi Playfair Cipher
│       ├── hill.js        # Implementasi Hill Cipher
│       └── enigma.js      # Implementasi Enigma Cipher
│
└── README.md              # Dokumentasi (file ini)
```

## 💻 Teknologi yang Digunakan

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dan animasi
- **JavaScript (Vanilla)** - Logika cipher dan interaktivitas
- **Bahasa Pemrograman**: JavaScript murni (tidak menggunakan framework)
- **GUI**: Web-based interface

## ✨ Fitur

- ✅ 5 metode cipher yang berbeda
- ✅ Interface yang user-friendly
- ✅ **Dark Mode** 🌙 - Toggle antara tema terang dan gelap
- ✅ Validasi input dan error handling
- ✅ Notifikasi sukses/error
- ✅ Copy hasil ke clipboard
- ✅ Responsive design (mobile-friendly)
- ✅ Clean code dengan komentar
- ✅ Tidak memerlukan instalasi library tambahan
- ✅ **LocalStorage** - Menyimpan preferensi dark mode

## 🎯 Contoh Penggunaan

### Vigenere Cipher
```
Teks: HALO DUNIA
Kunci: KUNCI
Hasil Enkripsi: RSZO XCROI
```

### Affine Cipher
```
Teks: HELLO
Kunci: 5,8
Hasil Enkripsi: RCLLA
```

### Playfair Cipher
```
Teks: HELLO
Kunci: KEYWORD
Hasil: [tergantung implementasi]
```

### Hill Cipher
```
Teks: HELP
Kunci: 6,24,1,13
Hasil: [tergantung implementasi]
```

### Enigma Cipher
```
Teks: HELLO
Kunci: 1,2,3,0,0,0 (atau kosong)
Hasil: [tergantung posisi rotor]
```

## 🔧 Troubleshooting

**Q: Hasil enkripsi tidak muncul?**
- A: Pastikan Anda sudah memasukkan teks dan kunci yang valid

**Q: Error "kunci tidak valid"?**
- A: Periksa format kunci sesuai dengan petunjuk setiap cipher

**Q: Tombol tidak berfungsi?**
- A: Pastikan JavaScript diaktifkan di browser Anda

**Q: Hasil dekripsi tidak sama dengan plaintext awal?**
- A: Pastikan menggunakan kunci yang sama untuk enkripsi dan dekripsi

**Q: Dark Mode tidak tersimpan?**
- A: Pastikan browser tidak di mode Private/Incognito yang membatasi localStorage

**Q: Tombol Dark Mode tidak muncul?**
- A: Refresh browser dengan Ctrl+F5, pastikan file CSS dan JS sudah termuat dengan benar

## 📝 Catatan Penting

- Semua cipher bekerja dengan huruf alfabet A-Z
- Huruf kecil otomatis diubah ke huruf besar
- Spasi dan karakter khusus biasanya dipertahankan atau dihilangkan tergantung cipher
- Enkripsi ini adalah cipher klasik untuk pembelajaran, tidak aman untuk penggunaan sebenarnya

## 👨‍💻 Pengembang

Dibuat untuk tugas Kriptografi

## 📅 Versi

**Versi 1.0** - 22 Februari 2026

## 📄 Lisensi

Project ini dibuat untuk keperluan edukasi dan pembelajaran kriptografi.

---

**Selamat Menggunakan! 🎉**

Jika ada pertanyaan atau masalah, silakan hubungi pengembang.
