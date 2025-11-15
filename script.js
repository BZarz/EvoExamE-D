// Mapping untuk enkripsi dan dekripsi
const cipherMap = {
    A: {
        'a': 'vfn', 'b': '0ai', 'c': 'vf8', 'd': 'vi9', 'e': 'f8e',
        'f': 'bk9', 'g': 'v4h', 'h': 'n5u', 'i': 'b3x', 'j': 'bg0',
        'k': 'bgu3', 'l': 'vdk', 'm': 'xvd', 'n': '97b', 'o': 'qwc',
        'p': 'bxv', 'q': 'vfb', 'r': 'bij', 's': 'zxx', 't': 'vfi',
        'u': '0fr', 'v': 'cdg', 'w': 'vcn', 'x': '3er', 'y': 'aiw', 'z': 'ibo',
        ':' : 'bdj', '/' : 'blk',

        'A': 'VFN', 'B': '0AI', 'C': 'VF8', 'D': 'VI9', 'E': 'F8E',
        'F': 'BK9', 'G': 'V4H', 'H': 'N5U', 'I': 'B3X', 'J': 'BG0',
        'K': 'BGU3', 'L': 'VDK', 'M': 'XVD', 'N': '97B', 'O': 'QWC',
        'P': 'BXV', 'Q': 'VFB', 'R': 'BIJ', 'S': 'ZXX', 'T': 'VFI',
        'U': '0FR', 'V': 'CDG', 'W': 'VCN', 'X': '3ER', 'Y': 'AIW',
        'Z': 'IBO'
    },

    B: {
        'a': 'vfn', 'b': '0ai', 'c': 'vf8', 'd': 'vi9', 'e': 'f8e',
        'f': 'bk9', 'g': 'v4h', 'h': 'n5u', 'i': 'b3x', 'j': 'bg0',
        'k': 'bgu3', 'l': 'vdk', 'm': 'xvd', 'n': '97b', 'o': 'qwc',
        'p': 'bxv', 'q': 'vfb', 'r': 'bij', 's': 'zxx', 't': 'vfi',
        'u': '0fr', 'v': 'cdg', 'w': 'vcn', 'x': '3er', 'y': 'aiw', 'z': 'ibo',
        ':' : 'bdj', '/' : 'blk',

        'A': 'VFN', 'B': '0AI', 'C': 'VF8', 'D': 'VI9', 'E': 'F8E',
        'F': 'BK9', 'G': 'V4H', 'H': 'N5U', 'I': 'B3X', 'J': 'BG0',
        'K': 'BGU3', 'L': 'VDK', 'M': 'XVD', 'N': '97B', 'O': 'QWC',
        'P': 'BXV', 'Q': 'VFB', 'R': 'BIJ', 'S': 'ZXX', 'T': 'VFI',
        'U': '0FR', 'V': 'CDG', 'W': 'VCN', 'X': '3ER', 'Y': 'AIW',
        'Z': 'IBO'
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

