// Hill Cipher - Menggunakan matriks 2x2

const HillCipher = {
    parseKey: function(key) {
        let numbers = key.replace(/[^0-9,\s]/g, '').split(/[,\s]+/).filter(n => n);
        
        if (numbers.length !== 4) {
            throw new Error("Kunci harus 4 angka untuk matriks 2x2! Format: a,b,c,d (contoh: 3,3,2,5)");
        }
        
        let matrix = [
            [parseInt(numbers[0]), parseInt(numbers[1])],
            [parseInt(numbers[2]), parseInt(numbers[3])]
        ];
        
        let det = this.determinant(matrix);
        if (this.gcd(det, 26) !== 1) {
            throw new Error("Determinan matriks harus relatif prima dengan 26! Coba kunci lain.");
        }
        
        return matrix;
    },

    determinant: function(matrix) {
        return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
    },

    // GCD (Greatest Common Divisor)
    gcd: function(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    },

    modInverse: function(a, m) {
        a = ((a % m) + m) % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    },

    // Inverse matriks 2x2 mod 26
    inverseMatrix: function(matrix) {
        let det = this.determinant(matrix);
        det = ((det % 26) + 26) % 26;
        let detInv = this.modInverse(det, 26);
        
        return [
            [(matrix[1][1] * detInv) % 26, (-matrix[0][1] * detInv + 26) % 26],
            [(-matrix[1][0] * detInv + 26) % 26, (matrix[0][0] * detInv) % 26]
        ];
    },

    multiplyMatrixVector: function(matrix, vector) {
        return [
            (matrix[0][0] * vector[0] + matrix[0][1] * vector[1]) % 26,
            (matrix[1][0] * vector[0] + matrix[1][1] * vector[1]) % 26
        ];
    },

    encrypt: function(plaintext, key) {
        if (!plaintext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let matrix = this.parseKey(key);
        plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
        
        // Tambahkan X jika panjang ganjil
        if (plaintext.length % 2 !== 0) {
            plaintext += 'X';
        }
        
        let result = "";

        for (let i = 0; i < plaintext.length; i += 2) {
            let vector = [
                plaintext.charCodeAt(i) - 65,
                plaintext.charCodeAt(i + 1) - 65
            ];
            
            let encrypted = this.multiplyMatrixVector(matrix, vector);
            result += String.fromCharCode(encrypted[0] + 65);
            result += String.fromCharCode(encrypted[1] + 65);
        }
        
        return result;
    },

    // Dekripsi teks menggunakan Hill Cipher
    decrypt: function(ciphertext, key) {
        if (!ciphertext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let matrix = this.parseKey(key);
        let invMatrix = this.inverseMatrix(matrix);
        
        ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
        

        if (ciphertext.length % 2 !== 0) {
            ciphertext += 'X';
        }
        
        let result = "";

        for (let i = 0; i < ciphertext.length; i += 2) {
            let vector = [
                ciphertext.charCodeAt(i) - 65,
                ciphertext.charCodeAt(i + 1) - 65
            ];
            
            let decrypted = this.multiplyMatrixVector(invMatrix, vector);
            result += String.fromCharCode(((decrypted[0] % 26) + 26) % 26 + 65);
            result += String.fromCharCode(((decrypted[1] % 26) + 26) % 26 + 65);
        }
        
        return result;
    },

    getDescription: function() {
        return "Hill Cipher menggunakan matriks 2x2 untuk enkripsi. Determinan matriks harus relatif prima dengan 26. Contoh kunci: 3,3,2,5 atau 2,3,1,4 atau 5,8,17,3.";
    },

    getKeyHelp: function() {
        return "Masukkan 4 angka untuk matriks 2x2: a,b,c,d (contoh: 3,3,2,5). Determinan harus relatif prima dengan 26.";
    }
};
