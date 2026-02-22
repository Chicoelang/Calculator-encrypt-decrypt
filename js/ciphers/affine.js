// Affine Cipher

const AffineCipher = {
    // Fungsi untuk mencari GCD (Greatest Common Divisor)
    gcd: function(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    },

    modInverse: function(a, m) {
        a = a % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    },

    parseKey: function(key) {
        let parts = key.replace(/\s+/g, ',').split(',');
        if (parts.length !== 2) {
            throw new Error("Format kunci salah! Gunakan format: a,b (contoh: 5,8)");
        }
        
        let a = parseInt(parts[0]);
        let b = parseInt(parts[1]);
        
        if (isNaN(a) || isNaN(b)) {
            throw new Error("Kunci harus berupa angka!");
        }
        
        if (this.gcd(a, 26) !== 1) {
            throw new Error("Nilai 'a' harus relatif prima dengan 26! Coba nilai: 1,3,5,7,9,11,15,17,19,21,23,25");
        }
        
        return { a, b };
    },

    // Enkripsi teks menggunakan Affine Cipher
    encrypt: function(plaintext, key) {
        if (!plaintext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let { a, b } = this.parseKey(key);
        let result = "";
        
        plaintext = plaintext.toUpperCase();

        for (let i = 0; i < plaintext.length; i++) {
            let char = plaintext[i];
            
            if (char >= 'A' && char <= 'Z') {
                // Rumus Affine: E(x) = (ax + b) mod 26
                let x = char.charCodeAt(0) - 65;
                let encryptedPos = (a * x + b) % 26;
                result += String.fromCharCode(encryptedPos + 65);
            } else {
                result += char;
            }
        }
        
        return result;
    },

    decrypt: function(ciphertext, key) {
        if (!ciphertext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let { a, b } = this.parseKey(key);
        let result = "";
        let aInv = this.modInverse(a, 26);
        
        ciphertext = ciphertext.toUpperCase();

        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i];
            
            if (char >= 'A' && char <= 'Z') {
                // Rumus Affine: D(y) = a^(-1) * (y - b) mod 26
                let y = char.charCodeAt(0) - 65;
                let decryptedPos = (aInv * (y - b + 26)) % 26;
                result += String.fromCharCode(decryptedPos + 65);
            } else {
                result += char;
            }
        }
        
        return result;
    },

    // Deskripsi cipher
    getDescription: function() {
        return "Affine Cipher menggunakan fungsi matematika E(x) = (ax + b) mod 26. Nilai 'a' harus relatif prima dengan 26. Contoh kunci: 5,8 atau 7,3.";
    },

    getKeyHelp: function() {
        return "Masukkan kunci dalam format: a,b (contoh: 5,8). Nilai 'a' yang valid: 1,3,5,7,9,11,15,17,19,21,23,25";
    }
};
