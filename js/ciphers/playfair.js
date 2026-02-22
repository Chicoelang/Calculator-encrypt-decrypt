// Playfair Cipher - Menggunakan 26 huruf alfabet

const PlayfairCipher = {
    // Buat matriks 5x5 dari kunci (J digabung dengan I)
    createMatrix: function(key) {
        key = key.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (key.length === 0) {
            throw new Error("Kunci harus berisi minimal satu huruf!");
        }
        
        let matrix = [];
        let used = new Set();
        let keyString = key + 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // J dihilangkan, diganti I
        
        for (let char of keyString) {
            if (char === 'J') char = 'I'; // J = I
            if (!used.has(char) && char >= 'A' && char <= 'Z') {
                matrix.push(char);
                used.add(char);
            }
            if (matrix.length === 25) break;
        }
        
        // Ubah jadi matriks 5x5
        let matrix5x5 = [];
        for (let i = 0; i < 5; i++) {
            matrix5x5.push(matrix.slice(i * 5, (i + 1) * 5));
        }
        
        return matrix5x5;
    },

    // Cari posisi huruf di matriks
    findPosition: function(matrix, char) {
        if (char === 'J') char = 'I';
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (matrix[i][j] === char) {
                    return { row: i, col: j };
                }
            }
        }
        return null;
    },

    // Buat pasangan huruf (digraph)
    createPairs: function(text) {
        text = text.toUpperCase().replace(/[^A-Z]/g, '');
        let pairs = [];
        
        for (let i = 0; i < text.length; i += 2) {
            let first = text[i];
            let second = i + 1 < text.length ? text[i + 1] : 'X';
            
            // Jika kedua huruf sama, sisipkan X
            if (first === second) {
                second = 'X';
                i--; // Mundur satu untuk proses huruf yang sama lagi
            }
            
            pairs.push(first + second);
        }
        
        return pairs;
    },

    // Enkripsi teks menggunakan Playfair Cipher
    encrypt: function(plaintext, key) {
        if (!plaintext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let matrix = this.createMatrix(key);
        let pairs = this.createPairs(plaintext);
        let result = "";

        for (let pair of pairs) {
            let pos1 = this.findPosition(matrix, pair[0]);
            let pos2 = this.findPosition(matrix, pair[1]);
            
            if (!pos1 || !pos2) continue;
            
            if (pos1.row === pos2.row) {
                // Baris sama: geser kanan
                result += matrix[pos1.row][(pos1.col + 1) % 5];
                result += matrix[pos2.row][(pos2.col + 1) % 5];
            } else if (pos1.col === pos2.col) {
                // Kolom sama: geser bawah
                result += matrix[(pos1.row + 1) % 5][pos1.col];
                result += matrix[(pos2.row + 1) % 5][pos2.col];
            } else {
                // Buat persegi panjang: tukar kolom
                result += matrix[pos1.row][pos2.col];
                result += matrix[pos2.row][pos1.col];
            }
        }
        
        return result;
    },

    // Dekripsi teks menggunakan Playfair Cipher
    decrypt: function(ciphertext, key) {
        if (!ciphertext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let matrix = this.createMatrix(key);
        ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
        
        // Pastikan panjang genap
        if (ciphertext.length % 2 !== 0) {
            ciphertext += 'X';
        }
        
        let result = "";

        for (let i = 0; i < ciphertext.length; i += 2) {
            let pos1 = this.findPosition(matrix, ciphertext[i]);
            let pos2 = this.findPosition(matrix, ciphertext[i + 1]);
            
            if (!pos1 || !pos2) continue;
            
            if (pos1.row === pos2.row) {
                // Baris sama: geser kiri
                result += matrix[pos1.row][(pos1.col - 1 + 5) % 5];
                result += matrix[pos2.row][(pos2.col - 1 + 5) % 5];
            } else if (pos1.col === pos2.col) {
                // Kolom sama: geser atas
                result += matrix[(pos1.row - 1 + 5) % 5][pos1.col];
                result += matrix[(pos2.row - 1 + 5) % 5][pos2.col];
            } else {
                // Buat persegi panjang: tukar kolom
                result += matrix[pos1.row][pos2.col];
                result += matrix[pos2.row][pos1.col];
            }
        }
        
        return result;
    },

    // Deskripsi cipher
    getDescription: function() {
        return "Playfair Cipher menggunakan matriks 5x5 dari 26 huruf alfabet (J digabung dengan I). Teks dienkripsi berpasangan. Contoh kunci: PLAYFAIR, MONARCHY.";
    },

    // Info bantuan untuk kunci
    getKeyHelp: function() {
        return "Masukkan kata kunci (hanya huruf A-Z). Huruf J akan dianggap sama dengan I. Contoh: PLAYFAIR, SECRET";
    }
};
