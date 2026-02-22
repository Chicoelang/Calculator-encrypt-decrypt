

// Object untuk menyimpan semua cipher
const ciphers = {
    vigenere: VigenereCipher,
    affine: AffineCipher,
    playfair: PlayfairCipher,
    hill: HillCipher,
    enigma: EnigmaCipher
};

// Element DOM
let cipherSelect, inputText, keyInput, keyHelp, outputText;
let encryptBtn, decryptBtn, clearBtn, copyBtn, cipherDescription;
let darkModeToggle, keySection, affineKeySection, affineA, affineB, affineKeyHelp;
let hillKeySection, hillA, hillB, hillC, hillD, hillKeyHelp;
let enigmaKeySection, enigmaRotor1, enigmaRotor2, enigmaRotor3;
let enigmaPos1, enigmaPos2, enigmaPos3, enigmaKeyHelp;
let playfairMatrixSection, playfairMatrix, playfairEditableSection, playfairEditableMatrix;

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua elemen DOM
    cipherSelect = document.getElementById('cipher-select');
    inputText = document.getElementById('input-text');
    keyInput = document.getElementById('key-input');
    keyHelp = document.getElementById('key-help');
    keySection = document.getElementById('key-section');
    playfairMatrixSection = document.getElementById('playfair-matrix-section');
    playfairMatrix = document.getElementById('playfair-matrix');
    playfairEditableSection = document.getElementById('playfair-editable-section');
    playfairEditableMatrix = document.getElementById('playfair-editable-matrix');
    affineKeySection = document.getElementById('affine-key-section');
    affineA = document.getElementById('affine-a');
    affineB = document.getElementById('affine-b');
    affineKeyHelp = document.getElementById('affine-key-help');
    hillKeySection = document.getElementById('hill-key-section');
    hillA = document.getElementById('hill-a');
    hillB = document.getElementById('hill-b');
    hillC = document.getElementById('hill-c');
    hillD = document.getElementById('hill-d');
    hillKeyHelp = document.getElementById('hill-key-help');
    enigmaKeySection = document.getElementById('enigma-key-section');
    enigmaRotor1 = document.getElementById('enigma-rotor1');
    enigmaRotor2 = document.getElementById('enigma-rotor2');
    enigmaRotor3 = document.getElementById('enigma-rotor3');
    enigmaPos1 = document.getElementById('enigma-pos1');
    enigmaPos2 = document.getElementById('enigma-pos2');
    enigmaPos3 = document.getElementById('enigma-pos3');
    enigmaKeyHelp = document.getElementById('enigma-key-help');
    outputText = document.getElementById('output-text');
    encryptBtn = document.getElementById('encrypt-btn');
    decryptBtn = document.getElementById('decrypt-btn');
    clearBtn = document.getElementById('clear-btn');
    copyBtn = document.getElementById('copy-btn');
    cipherDescription = document.getElementById('cipher-description');
    darkModeToggle = document.getElementById('dark-mode-toggle');

    // Event listeners
    cipherSelect.addEventListener('change', updateCipherInfo);
    keyInput.addEventListener('input', updatePlayfairMatrix);
    encryptBtn.addEventListener('click', handleEncrypt);
    decryptBtn.addEventListener('click', handleDecrypt);
    clearBtn.addEventListener('click', handleClear);
    copyBtn.addEventListener('click', handleCopy);
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Set informasi awal
    updateCipherInfo();
    

    loadDarkModePreference();
});

// Initialize Playfair editable matrix
// CATATAN: Matriks ini bisa DIEDIT oleh user
function initPlayfairEditableMatrix() {
    if (cipherSelect.value !== 'playfair') return;
    
    const key = keyInput.value || 'PLAYFAIR';
    
    try {
        // Generate matrix default dari kunci
        const matrix = PlayfairCipher.createMatrix(key);
        
        playfairEditableMatrix.innerHTML = '';
        
        // Buat grid 5x5 yang EDITABLE
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.className = 'playfair-cell-editable';
                cell.maxLength = 1;
                cell.value = matrix[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                // Event: ketika user edit cell, update kunci
                cell.addEventListener('input', function(e) {
                    // Hanya terima huruf A-Z
                    this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '');
                    // Update kunci dari matriks editable
                    updateKeyFromEditableMatrix();
                });
                
                // Auto-focus ke cell berikutnya setelah ketik
                cell.addEventListener('keyup', function(e) {
                    if (this.value && e.key !== 'Backspace' && e.key !== 'Delete') {
                        const nextInput = this.nextElementSibling;
                        if (nextInput && nextInput.tagName === 'INPUT') {
                            nextInput.focus();
                            nextInput.select();
                        }
                    }
                });
                
                playfairEditableMatrix.appendChild(cell);
            }
        }
    } catch (error) {
        playfairEditableMatrix.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #f56565;">Error</div>';
    }
}

// Update keyInput dari editable matrix
function updateKeyFromEditableMatrix() {
    const cells = playfairEditableMatrix.querySelectorAll('.playfair-cell-editable');
    let matrixString = '';
    
    cells.forEach(cell => {
        if (cell.value) {
            matrixString += cell.value;
        }
    });
    
    // Update input kunci dengan huruf unik dari matriks
    // Remove duplicates untuk mendapatkan kunci
    let uniqueChars = [...new Set(matrixString)].join('');
    keyInput.value = uniqueChars;
    
    // Update preview matriks
    updatePlayfairMatrix();
}

// Update Playfair matrix visualization
// CATATAN: Matriks ini HANYA untuk VISUALISASI/TAMPILAN saja
function updatePlayfairMatrix() {
    if (cipherSelect.value !== 'playfair') return;
    
    const key = keyInput.value || 'PLAYFAIR';
    
    try {
        // Generate matrix menggunakan fungsi dari PlayfairCipher
        // Matrix ini dibuat otomatis dari kata kunci yang diketik user
        const matrix = PlayfairCipher.createMatrix(key);
        
        playfairMatrix.innerHTML = '';
        
        // Buat grid 5x5 untuk VISUALISASI
        // User hanya bisa LIHAT, tidak bisa edit cell ini
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'playfair-cell';
                cell.textContent = matrix[i][j];
                playfairMatrix.appendChild(cell);
            }
        }
    } catch (error) {
        playfairMatrix.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #f56565;">Masukkan kunci yang valid</div>';
    }
}

// Update informasi cipher saat pilihan berubah
function updateCipherInfo() {
    const selectedCipher = cipherSelect.value;
    const cipher = ciphers[selectedCipher];
    
    if (cipher) {
        cipherDescription.textContent = cipher.getDescription();
        
        // Sembunyikan semua input khusus terlebih dahulu
        keySection.style.display = 'none';
        playfairMatrixSection.style.display = 'none';
        playfairEditableSection.style.display = 'none';
        affineKeySection.style.display = 'none';
        hillKeySection.style.display = 'none';
        enigmaKeySection.style.display = 'none';
        
        // Tampilkan input yang sesuai untuk cipher
        if (selectedCipher === 'affine') {
            affineKeySection.style.display = 'block';
            affineKeyHelp.textContent = cipher.getKeyHelp();
        } else if (selectedCipher === 'hill') {
            hillKeySection.style.display = 'block';
            hillKeyHelp.textContent = cipher.getKeyHelp();
        } else if (selectedCipher === 'enigma') {
            enigmaKeySection.style.display = 'block';
            enigmaKeyHelp.textContent = cipher.getKeyHelp();
        } else if (selectedCipher === 'playfair') {
            keySection.style.display = 'block';
            playfairEditableSection.style.display = 'block';
            playfairMatrixSection.style.display = 'block';
            keyHelp.textContent = cipher.getKeyHelp();
            initPlayfairEditableMatrix();
            updatePlayfairMatrix();
        } else {
            keySection.style.display = 'block';
            keyHelp.textContent = cipher.getKeyHelp();
        }
    }
}

// Handle enkripsi
function handleEncrypt() {
    try {
        const selectedCipher = cipherSelect.value;
        const cipher = ciphers[selectedCipher];
        const plaintext = inputText.value;
        let key;

        // Ambil kunci sesuai tipe cipher
        if (selectedCipher === 'affine') {
            const a = affineA.value;
            const b = affineB.value;
            if (!a || !b) {
                showError('Mohon masukkan nilai a dan b!');
                return;
            }
            key = a + ',' + b;
        } else if (selectedCipher === 'hill') {
            const a = hillA.value;
            const b = hillB.value;
            const c = hillC.value;
            const d = hillD.value;
            if (!a || !b || !c || !d) {
                showError('Mohon masukkan semua nilai matriks (a, b, c, d)!');
                return;
            }
            key = a + ',' + b + ',' + c + ',' + d;
        } else if (selectedCipher === 'enigma') {
            const r1 = enigmaRotor1.value;
            const r2 = enigmaRotor2.value;
            const r3 = enigmaRotor3.value;
            const p1 = enigmaPos1.value || '0';
            const p2 = enigmaPos2.value || '0';
            const p3 = enigmaPos3.value || '0';
            key = r1 + ',' + r2 + ',' + r3 + ',' + p1 + ',' + p2 + ',' + p3;
        } else {
            key = keyInput.value;
        }

        if (!plaintext) {
            showError('Mohon masukkan teks yang akan dienkripsi!');
            return;
        }

        if (!key && selectedCipher !== 'enigma') {
            showError('Mohon masukkan kunci enkripsi!');
            return;
        }

        // Proses enkripsi
        const result = cipher.encrypt(plaintext, key);
        outputText.value = result;
        showSuccess('Enkripsi berhasil!');

    } catch (error) {
        showError(error.message);
        outputText.value = '';
    }
}

// Handle dekripsi
function handleDecrypt() {
    try {
        const selectedCipher = cipherSelect.value;
        const cipher = ciphers[selectedCipher];
        const ciphertext = inputText.value;
        let key;

        // Ambil kunci sesuai tipe cipher
        if (selectedCipher === 'affine') {
            const a = affineA.value;
            const b = affineB.value;
            if (!a || !b) {
                showError('Mohon masukkan nilai a dan b!');
                return;
            }
            key = a + ',' + b;
        } else if (selectedCipher === 'hill') {
            const a = hillA.value;
            const b = hillB.value;
            const c = hillC.value;
            const d = hillD.value;
            if (!a || !b || !c || !d) {
                showError('Mohon masukkan semua nilai matriks (a, b, c, d)!');
                return;
            }
            key = a + ',' + b + ',' + c + ',' + d;
        } else if (selectedCipher === 'enigma') {
            const r1 = enigmaRotor1.value;
            const r2 = enigmaRotor2.value;
            const r3 = enigmaRotor3.value;
            const p1 = enigmaPos1.value || '0';
            const p2 = enigmaPos2.value || '0';
            const p3 = enigmaPos3.value || '0';
            key = r1 + ',' + r2 + ',' + r3 + ',' + p1 + ',' + p2 + ',' + p3;
        } else {
            key = keyInput.value;
        }

        if (!ciphertext) {
            showError('Mohon masukkan teks yang akan didekripsi!');
            return;
        }

        if (!key && selectedCipher !== 'enigma') {
            showError('Mohon masukkan kunci dekripsi!');
            return;
        }

        // Proses dekripsi
        const result = cipher.decrypt(ciphertext, key);
        outputText.value = result;
        showSuccess('Dekripsi berhasil!');

    } catch (error) {
        showError(error.message);
        outputText.value = '';
    }
}

// Handle clear
function handleClear() {
    inputText.value = '';
    keyInput.value = '';
    affineA.value = '';
    affineB.value = '';
    hillA.value = '';
    hillB.value = '';
    hillC.value = '';
    hillD.value = '';
    enigmaRotor1.value = '1';
    enigmaRotor2.value = '2';
    enigmaRotor3.value = '3';
    enigmaPos1.value = '0';
    enigmaPos2.value = '0';
    enigmaPos3.value = '0';
    outputText.value = '';
    showSuccess('Form berhasil dibersihkan!');
}

// Handle copy hasil
function handleCopy() {
    if (!outputText.value) {
        showError('Tidak ada hasil untuk disalin!');
        return;
    }

    outputText.select();
    document.execCommand('copy');
    showSuccess('Hasil berhasil disalin ke clipboard!');
}

// Tampilkan pesan error
function showError(message) {
    alert('❌ Error: ' + message);
}

// Tampilkan pesan sukses
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = '✅ ' + message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    
    if (isDarkMode) {
        showSuccess('Dark Mode diaktifkan! 🌙');
    } else {
        showSuccess('Light Mode diaktifkan! ☀️');
    }
}
function loadDarkModePreference() {
    const darkModePreference = localStorage.getItem('darkMode');
    
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}
