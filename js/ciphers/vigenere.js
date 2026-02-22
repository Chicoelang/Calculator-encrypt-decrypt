// Vigenere Cipher - Menggunakan 26 huruf alfabet

const VigenereCipher = {
    // Enkripsi teks menggunakan Vigenere Cipher
    encrypt: function(plaintext, key) {
        if (!plaintext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let result = "";
        let keyIndex = 0;
        
        plaintext = plaintext.toUpperCase();
        key = key.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (key.length === 0) {
            throw new Error("Kunci harus berisi minimal satu huruf!");
        }

        for (let i = 0; i < plaintext.length; i++) {
            let char = plaintext[i];
            
            // Hanya proses huruf A-Z
            if (char >= 'A' && char <= 'Z') {
                // Ambil posisi huruf (0-25)
                let charPos = char.charCodeAt(0) - 65;
                let keyPos = key.charCodeAt(keyIndex % key.length) - 65;
                
                // Rumus Vigenere: (P + K) mod 26
                let encryptedPos = (charPos + keyPos) % 26;
                result += String.fromCharCode(encryptedPos + 65);
                
                keyIndex++;
            } else {
                result += char;
            }
        }
        
        return result;
    },

    // Dekripsi teks menggunakan Vigenere Cipher
    decrypt: function(ciphertext, key) {
        if (!ciphertext || !key) {
            throw new Error("Teks dan kunci tidak boleh kosong!");
        }

        let result = "";
        let keyIndex = 0;
        
        ciphertext = ciphertext.toUpperCase();
        key = key.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (key.length === 0) {
            throw new Error("Kunci harus berisi minimal satu huruf!");
        }

        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i];
            
            // Hanya proses huruf A-Z
            if (char >= 'A' && char <= 'Z') {
                // Ambil posisi huruf (0-25)
                let charPos = char.charCodeAt(0) - 65;
                let keyPos = key.charCodeAt(keyIndex % key.length) - 65;
                
                // Rumus Vigenere: (C - K) mod 26
                let decryptedPos = (charPos - keyPos + 26) % 26;
                result += String.fromCharCode(decryptedPos + 65);
                
                keyIndex++;
            } else {
                result += char;
            }
        }
        
        return result;
    },

  
    getDescription: function() {
        return "Vigenere Cipher menggunakan 26 huruf alfabet (A-Z). Setiap huruf plaintext digeser sesuai dengan huruf kunci yang berulang. Contoh: Plaintext 'HELLO' dengan kunci 'KEY' akan menghasilkan 'RIJVS'.";
    },

    
    getKeyHelp: function() {
        return "Masukkan kata kunci (hanya huruf A-Z). Contoh: KEY, SECRET, CRYPTO";
    }
};
