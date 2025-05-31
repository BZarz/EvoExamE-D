// Mapping untuk enkripsi dan dekripsi
const cipherMap = {
    A: {
        'a': 'b0e', 'b': 'c1b', 'c': 'p2k', 'd': 'm3k', 'e': '4lf',
        'f': 'hk5', 'g': 'r6v', 'h': 'o7z', 'i': 'y8p', 'j': 't9e',
        'k': 'v10l', 'l': 'jg', 'm': 'lk', 'n': 'er', 'o': 'vg',
        'p': 'ok', 'q': 'pl', 'r': 'qw', 's': 'fr', 't': 'sc',
        'u': 'sh', 'v': 'bt', 'w': 'ml', 'x': 'ox', 'y': 'bk', 'z': 'io', ':' : 'bdj', '/' : 'blk',
        
        'A': 'B0E', 'B': 'C1B', 'C': 'P2K', 'D': 'M3K', 'E': '4LF',
        'F': 'HK5', 'G': 'R6V', 'H': 'O7Z', 'I': 'Y8P', 'J': 'T9E',
        'K': 'V10L', 'L': 'JG', 'M': 'LK', 'N': 'ER', 'O': 'VG',
        'P': 'OK', 'Q': 'PL', 'R': 'QW', 'S': 'FR', 'T': 'SC',
        'U': 'SH', 'V': 'BT', 'W': 'ML', 'X': 'OX', 'Y': 'BK', 'Z': 'IO'
    },
    B: {
        'a': 'vfn', 'b': '0ai', 'c': 'vf8', 'd': 'vi9', 'e': 'f8e',
        'f': 'bk9', 'g': 'v4h', 'h': 'n5u', 'i': 'b3x', 'j': 'bg0',
        'k': 'bgu3', 'l': 'vk', 'm': 'xd', 'n': '97', 'o': 'qw',
        'p': 'bv', 'q': 'vfb', 'r': 'bij', 's': 'zxx', 't': 'vfi',
        'u': '0fr', 'v': 'cdg', 'w': 'vcn', 'x': '3er', 'y': 'aiw', 'z': 'io', ':' : 'bdj', '/' : 'blk',
        
        'A': 'VFN1', 'B': '0AI2', 'C': 'VF83', 'D': 'VI94', 'E': 'F8E5',
        'F': 'BK96', 'G': 'V4H7', 'H': 'N5U8', 'I': 'B3X9', 'J': 'BG00',
        'K': 'BGU31', 'L': 'VK2',  'M': 'XD3',  'N': '973',  'O': 'QW4',
        'P': 'BV5',  'Q': 'VFB6', 'R': 'BIJ7', 'S': 'ZXX8', 'T': 'VFI9',
        'U': '0FR0', 'V': 'CDG1', 'W': 'VCN2', 'X': '3ER3', 'Y': 'AIW4',
        'Z': 'IO5'
    }
};


// Fungsi enkripsi
function encryptText() {
    let inputText = document.getElementById("inputText").value;
    let selectedVersion = document.getElementById("versionSelector").value;
    let selectedMap = cipherMap[selectedVersion];
    let encryptedText = '';

    for (let char of inputText) {
        if (selectedMap[char]) {
            encryptedText += selectedMap[char];
        } else {
            encryptedText += char;
        }
    }

    document.getElementById("outputText").value = encryptedText;
    generateQRCode(encryptedText);
}

function decryptText() {
    let inputText = document.getElementById("inputText").value;
    let selectedVersion = document.getElementById("versionSelector").value;
    let selectedMap = cipherMap[selectedVersion];
    const reverseCipherMap = Object.fromEntries(
        Object.entries(selectedMap).map(([k, v]) => [v, k])
    );

    let decryptedText = '';
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
