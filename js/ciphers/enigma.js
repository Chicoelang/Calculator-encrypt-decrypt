// Enigma Cipher - Simulasi sederhana dari Enigma Machine

const EnigmaCipher = {
    // Rotor konfigurasi (versi sederhana)
    rotors: [
        'EKMFLGDQVZNTOWYHXUSPAIBRCJ', // Rotor I
        'AJDKSIRUXBLHWTMCQGZNPYFVOE', // Rotor II
        'BDFHJLCPRTXVZNYEIWGAKMUSQO'  // Rotor III
    ],

    // Reflector (memantulkan sinyal)
    reflector: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',

    // Parse kunci (format: "rotor1,rotor2,rotor3,posisi1,posisi2,posisi3")
    parseKey: function(key) {
        let parts = key.replace(/\s+/g, ',').split(',').filter(p => p);
        
        if (parts.length === 0) {
            // Default: gunakan rotor 1,2,3 dengan posisi 0,0,0
            return {
                rotorOrder: [0, 1, 2],
                positions: [0, 0, 0]
            };
        }
        
        if (parts.length !== 6) {
            throw new Error("Format kunci: rotor1,rotor2,rotor3,pos1,pos2,pos3 (contoh: 1,2,3,0,0,0) atau kosongkan untuk default");
        }
        
        let rotorOrder = [
            parseInt(parts[0]) - 1,
            parseInt(parts[1]) - 1,
            parseInt(parts[2]) - 1
        ];
        
        let positions = [
            parseInt(parts[3]),
            parseInt(parts[4]),
            parseInt(parts[5])
        ];
        
        // Validasi
        for (let r of rotorOrder) {
            if (r < 0 || r > 2) {
                throw new Error("Nomor rotor harus 1, 2, atau 3");
            }
        }
        
        for (let p of positions) {
            if (isNaN(p) || p < 0 || p > 25) {
                throw new Error("Posisi rotor harus 0-25");
            }
        }
        
        return { rotorOrder, positions };
    },

    // Rotate rotor (geser satu posisi)
    rotateRotor: function(rotor, position) {
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        
        for (let char of rotor) {
            let index = alphabet.indexOf(char);
            result += alphabet[(index + position) % 26];
        }
        
        return result;
    },

    // Proses satu huruf melalui rotor
    throughRotor: function(char, rotor, position, reverse = false) {
        let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let rotatedRotor = this.rotateRotor(rotor, position);
        
        if (reverse) {
            let index = rotatedRotor.indexOf(char);
            return alphabet[index];
        } else {
            let index = alphabet.indexOf(char);
            return rotatedRotor[index];
        }
    },

    // Enkripsi/Dekripsi menggunakan Enigma (Enigma bersifat reciprocal)
    process: function(text, key) {
        if (!text) {
            throw new Error("Teks tidak boleh kosong!");
        }

        let config = this.parseKey(key);
        let positions = [...config.positions]; // Copy positions
        let result = "";
        
        text = text.toUpperCase();

        for (let char of text) {
            if (char < 'A' || char > 'Z') {
                result += char;
                continue;
            }
            
            // Rotate rotors sebelum enkripsi
            positions[0] = (positions[0] + 1) % 26;
            if (positions[0] === 0) {
                positions[1] = (positions[1] + 1) % 26;
                if (positions[1] === 0) {
                    positions[2] = (positions[2] + 1) % 26;
                }
            }
            
            // Melalui rotor 1, 2, 3
            let current = char;
            for (let i = 0; i < 3; i++) {
                let rotorIndex = config.rotorOrder[i];
                current = this.throughRotor(current, this.rotors[rotorIndex], positions[i]);
            }
            
            // Melalui reflector
            let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            current = this.reflector[alphabet.indexOf(current)];
            
            // Kembali melalui rotor 3, 2, 1 (reversed)
            for (let i = 2; i >= 0; i--) {
                let rotorIndex = config.rotorOrder[i];
                current = this.throughRotor(current, this.rotors[rotorIndex], positions[i], true);
            }
            
            result += current;
        }
        
        return result;
    },

    // Enkripsi (sama dengan process karena Enigma reciprocal)
    encrypt: function(plaintext, key) {
        return this.process(plaintext, key);
    },

    // Dekripsi (sama dengan enkripsi karena Enigma reciprocal)
    decrypt: function(ciphertext, key) {
        return this.process(ciphertext, key);
    },

    // Deskripsi cipher
    getDescription: function() {
        return "Enigma Cipher adalah simulasi mesin Enigma dengan 3 rotor. Enigma bersifat reciprocal (enkripsi = dekripsi dengan kunci sama). Format kunci: rotor1,rotor2,rotor3,pos1,pos2,pos3 (contoh: 1,2,3,0,0,0). Kosongkan untuk default.";
    },

    // Info bantuan untuk kunci
    getKeyHelp: function() {
        return "Format: rotor1,rotor2,rotor3,pos1,pos2,pos3 (contoh: 1,2,3,0,0,0). Rotor: 1-3, Posisi: 0-25. Kosongkan untuk default.";
    }
};
