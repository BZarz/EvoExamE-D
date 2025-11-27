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
        'k': 'bgu3', 'l': 'vk', 'm': 'xd', 'n': '97b', 'o': 'qw',
        'p': 'bv', 'q': 'vfb', 'r': 'bij', 's': 'zxx', 't': 'vfi',
        'u': '0fr', 'v': 'cdg', 'w': 'vcn', 'x': '3er', 'y': 'aiw', 'z': 'io', ':' : 'bdj', '/' : 'blk',
        
        'A': 'VFN', 'B': '0AI', 'C': 'VF8', 'D': 'VI9', 'E': 'F8E',
        'F': 'BK9', 'G': 'V4H', 'H': 'N5U', 'I': 'B3X', 'J': 'BG0',
        'K': 'BGU3', 'L': 'VK',  'M': 'XD',  'N': '97B',  'O': 'QW',
        'P': 'BV',  'Q': 'VFB', 'R': 'BIJ', 'S': 'ZXX', 'T': 'VFI',
        'U': '0FR', 'V': 'CDG', 'W': 'VCN', 'X': '3ER', 'Y': 'AIW',
        'Z': 'IO'

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
    const canvas = document.getElementById("qrcode-canvas");
    // desired display size in CSS pixels
    const displaySize = parseInt(canvas.getAttribute('width')) || 192;
    const ratio = window.devicePixelRatio || 1;
    // set actual canvas pixel size for sharp rendering on HiDPI screens
    canvas.width = displaySize * ratio;
    canvas.height = displaySize * ratio;
    canvas.style.width = displaySize + 'px';
    canvas.style.height = displaySize + 'px';

    // create QR with high error correction to allow a logo overlay
    const qr = new QRious({
        element: canvas,
        value: text,
        size: canvas.width,
        level: 'H'
    });

    // draw centered logo (try loading `logo.png`; fallback to generated badge)
    const ctx = canvas.getContext('2d');
    // logo occupies a smaller fraction to preserve scannability
    const logoSize = Math.floor(canvas.width * 0.18);

    function roundRectPath(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    const logo = new Image();
    logo.onload = function() {
        const x = (canvas.width - logoSize) / 2;
        const y = (canvas.height - logoSize) / 2;
        // draw white rounded background for contrast (padding scaled by ratio)
        const pad = Math.floor(8 * ratio);
        ctx.save();
        ctx.fillStyle = '#ffffff';
        roundRectPath(ctx, x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2, 12 * ratio);
        ctx.fill();
        ctx.restore();
        ctx.drawImage(logo, x, y, logoSize, logoSize);
    };
    logo.onerror = function(e) {
        // fallback: draw a circular badge with an initial
        console.warn('logo.png failed to load, falling back to generated badge', e);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, logoSize / 2 + 12 * ratio, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0b7285';
        ctx.beginPath();
        ctx.arc(cx, cy, logoSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.floor(logoSize * 0.6)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('E', cx, cy);
        ctx.restore();
    };

    // Try to load a local `logo.png` file. If you want a custom file,
    // place it next to `index.html` and name it `logo.png`.
    // Use an explicit relative path and avoid crossOrigin for local files.
    logo.src = './logo.png';
}


