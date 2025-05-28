// Mapping untuk enkripsi dan dekripsi
const cipherMap = {
    'a': 'b0e', 'b': 'c1b', 'c': 'p2k', 'd': 'm3k', 'e': '4lf',
    'f': 'hk5', 'g': 'r6v', 'h': 'o7z', 'i': 'y8p', 'j': 't9e',
    'k': 'v10l', 'l': 'jg', 'm': 'lk', 'n': 'er', 'o': 'vg',
    'p': 'ok', 'q': 'pl', 'r': 'qw', 's': 'fr', 't': 'sc',
    'u': 'sh', 'v': 'bt', 'w': 'ml', 'x': 'ox', 'y': 'bk', 'z': 'io', ':': 'bdj', '/': 'blk',
    
    'A': 'B0E', 'B': 'C1B', 'C': 'P2K', 'D': 'M3K', 'E': '4LF',
    'F': 'HK5', 'G': 'R6V', 'H': 'O7Z', 'I': 'Y8P', 'J': 'T9E',
    'K': 'V10L', 'L': 'JG', 'M': 'LK', 'N': 'ER', 'O': 'VG',
    'P': 'OK', 'Q': 'PL', 'R': 'QW', 'S': 'FR', 'T': 'SC',
    'U': 'SH', 'V': 'BT', 'W': 'ML', 'X': 'OX', 'Y': 'BK', 'Z': 'IO'
};

// Fungsi enkripsi
function encryptText() {
    let inputText = document.getElementById("inputText").value;
    let encryptedText = '';

    for (let char of inputText) {
        if (cipherMap[char]) {
            encryptedText += cipherMap[char];
        } else {
            encryptedText += char;
        }
    }

    document.getElementById("outputText").value = encryptedText;
    generateQRCode(encryptedText);
}

// Fungsi dekripsi
function decryptText() {
    let inputText = document.getElementById("inputText").value;
    let decryptedText = '';
    const reverseCipherMap = Object.fromEntries(
        Object.entries(cipherMap).map(([k, v]) => [v, k])
    );

    let i = 0;
    while (i < inputText.length) {
        let matched = false;
        for (let len = 4; len >= 2; len--) {
            if (i + len <= inputText.length) {
                let sub = inputText.substring(i, i + len);
                if (reverseCipherMap[sub]) {
                    decryptedText += reverseCipherMap[sub];
                    i += len;
                    matched = true;
                    break;
                }
            }
        }
        if (!matched) {
            decryptedText += inputText[i];
            i++;
        }
    }

    document.getElementById("outputText").value = decryptedText;
    generateQRCode(decryptedText);
}

// Fungsi untuk menghasilkan QR Code dari teks di output
function generateQRCode(text) {
    const qr = new QRious({
        element: document.getElementById("qrcode-canvas"),
        value: text,
        size: 200
    });
}
