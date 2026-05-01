const IP = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];

const FP = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];

const E = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];

const S1 = [
  [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
  [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
  [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
  [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
];

const P = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];

function stringToBinary(str) {
  let binary = "";
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    let bin = charCode.toString(2).padStart(8, "0");
    binary += bin;
  }
  binary = binary.padEnd(64, "0").substring(0, 64);
  return binary;
}

function binaryToString(binary) {
  let str = "";
  for (let i = 0; i < binary.length; i += 8) {
    let byte = binary.substring(i, i + 8);
    if (byte.length === 8) {
      str += String.fromCharCode(parseInt(byte, 2));
    }
  }
  return str;
}

function permute(input, table) {
  let output = "";
  for (let i = 0; i < table.length; i++) {
    output += input[table[i] - 1];
  }
  return output;
}

function xor(a, b) {
  let result = "";
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    result += a[i] === b[i] ? "0" : "1";
  }
  return result;
}

function leftShift(str, n) {
  return str.substring(n) + str.substring(0, n);
}

function generateRoundKey(key, round) {
  let binaryKey = stringToBinary(key);
  binaryKey = binaryKey.padEnd(48, "0").substring(0, 48);
  return leftShift(binaryKey, round);
}

function feistel(right, roundKey) {
  let expanded = permute(right, E);

  let xored = xor(expanded, roundKey);

  let substituted = "";
  for (let i = 0; i < 8; i++) {
    let block = xored.substring(i * 6, (i + 1) * 6);
    if (block.length === 6) {
      let row = parseInt(block[0] + block[5], 2);
      let col = parseInt(block.substring(1, 5), 2);
      let val = S1[row % 4][col % 16];
      substituted += val.toString(2).padStart(4, "0");
    }
  }

  let permuted = permute(substituted, P);
  return permuted;
}

window.desEncrypt = function (plaintext, key) {
  if (!plaintext || !key) return "";

  let binary = stringToBinary(plaintext);

  let permuted = permute(binary, IP);

  let left = permuted.substring(0, 32);
  let right = permuted.substring(32, 64);

  for (let round = 1; round <= 4; round++) {
    let roundKey = generateRoundKey(key, round);
    let f = feistel(right, roundKey);
    let newRight = xor(left, f);
    left = right;
    right = newRight;
  }

  let combined = right + left;
  let encrypted = permute(combined, FP);

  let hex = "";
  for (let i = 0; i < encrypted.length; i += 4) {
    hex += parseInt(encrypted.substring(i, i + 4), 2).toString(16);
  }
  return hex.toUpperCase();
};

window.desDecrypt = function (ciphertext, key) {
  if (!ciphertext || !key) return "";

  let binary = "";
  for (let i = 0; i < ciphertext.length; i++) {
    binary += parseInt(ciphertext[i], 16).toString(2).padStart(4, "0");
  }
  binary = binary.padEnd(64, "0").substring(0, 64);

  let permuted = permute(binary, IP);

  let left = permuted.substring(0, 32);
  let right = permuted.substring(32, 64);

  for (let round = 4; round >= 1; round--) {
    let roundKey = generateRoundKey(key, round);
    let f = feistel(left, roundKey);
    let newLeft = xor(right, f);
    right = left;
    left = newLeft;
  }

  let combined = left + right;
  let decrypted = permute(combined, FP);

  return binaryToString(decrypted).replace(/\0/g, "");
};
