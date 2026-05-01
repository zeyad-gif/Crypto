const SBOX = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe,
  0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4,
  0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7,
  0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3,
  0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09,
  0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3,
  0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe,
  0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
  0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92,
  0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c,
  0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19,
  0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14,
  0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2,
  0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5,
  0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25,
  0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86,
  0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e,
  0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42,
  0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
];

const RCON = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

function stringToState(str) {
  const bytes = new TextEncoder().encode(str);
  const state = Array(4)
    .fill()
    .map(() => Array(4).fill(0));

  for (let i = 0; i < 16 && i < bytes.length; i++) {
    state[i % 4][Math.floor(i / 4)] = bytes[i];
  }
  return state;
}

function stateToHex(state) {
  let hex = "";
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      hex += state[r][c].toString(16).padStart(2, "0");
    }
  }
  return hex.toUpperCase();
}

function hexToState(hex) {
  const state = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  for (let i = 0; i < hex.length && i < 32; i += 2) {
    const byte = parseInt(hex.substring(i, i + 2), 16);
    const index = i / 2;
    state[index % 4][Math.floor(index / 4)] = byte;
  }
  return state;
}

function stateToString(state) {
  const bytes = [];
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      bytes.push(state[r][c]);
    }
  }
  return new TextDecoder().decode(new Uint8Array(bytes)).replace(/\0/g, "");
}

function subBytes(state) {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      state[r][c] = SBOX[state[r][c]];
    }
  }
  return state;
}

function invSubBytes(state) {
  const invSbox = {};
  for (let i = 0; i < 256; i++) {
    invSbox[SBOX[i]] = i;
  }
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      state[r][c] = invSbox[state[r][c]] || state[r][c];
    }
  }
  return state;
}

function shiftRows(state) {
  for (let r = 1; r < 4; r++) {
    state[r] = state[r].slice(r).concat(state[r].slice(0, r));
  }
  return state;
}

function invShiftRows(state) {
  for (let r = 1; r < 4; r++) {
    state[r] = state[r].slice(-r).concat(state[r].slice(0, -r));
  }
  return state;
}

function xtime(x) {
  return ((x << 1) ^ (((x >> 7) & 1) * 0x1b)) & 0xff;
}

function mixColumns(state) {
  for (let c = 0; c < 4; c++) {
    const a = new Array(4);
    for (let r = 0; r < 4; r++) {
      a[r] = state[r][c];
    }
    state[0][c] = (xtime(a[0]) ^ (xtime(a[1]) ^ a[1]) ^ a[2] ^ a[3]) & 0xff;
    state[1][c] = (a[0] ^ xtime(a[1]) ^ (xtime(a[2]) ^ a[2]) ^ a[3]) & 0xff;
    state[2][c] = (a[0] ^ a[1] ^ xtime(a[2]) ^ (xtime(a[3]) ^ a[3])) & 0xff;
    state[3][c] = (xtime(a[0]) ^ a[0] ^ a[1] ^ a[2] ^ xtime(a[3])) & 0xff;
  }
  return state;
}

function invMixColumns(state) {
  for (let c = 0; c < 4; c++) {
    const a = new Array(4);
    for (let r = 0; r < 4; r++) {
      a[r] = state[r][c];
    }
    state[0][c] =
      (Multiply(0x0e, a[0]) ^
        Multiply(0x0b, a[1]) ^
        Multiply(0x0d, a[2]) ^
        Multiply(0x09, a[3])) &
      0xff;
    state[1][c] =
      (Multiply(0x09, a[0]) ^
        Multiply(0x0e, a[1]) ^
        Multiply(0x0b, a[2]) ^
        Multiply(0x0d, a[3])) &
      0xff;
    state[2][c] =
      (Multiply(0x0d, a[0]) ^
        Multiply(0x09, a[1]) ^
        Multiply(0x0e, a[2]) ^
        Multiply(0x0b, a[3])) &
      0xff;
    state[3][c] =
      (Multiply(0x0b, a[0]) ^
        Multiply(0x0d, a[1]) ^
        Multiply(0x09, a[2]) ^
        Multiply(0x0e, a[3])) &
      0xff;
  }
  return state;
}

function Multiply(a, b) {
  let result = 0;
  for (let i = 0; i < 8; i++) {
    if (b & 1) result ^= a;
    const hiBit = a & 0x80;
    a <<= 1;
    if (hiBit) a ^= 0x1b;
    b >>= 1;
  }
  return result & 0xff;
}

function addRoundKey(state, roundKey) {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      state[r][c] ^= roundKey[r][c];
    }
  }
  return state;
}

function keyExpansion(key) {
  const keyBytes = new TextEncoder().encode(
    key.padEnd(16, "\0").substring(0, 16),
  );
  const roundKeys = [];

  let currentKey = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  for (let i = 0; i < 16; i++) {
    currentKey[i % 4][Math.floor(i / 4)] = keyBytes[i];
  }
  roundKeys.push(currentKey);

  for (let round = 1; round <= 10; round++) {
    const prevKey = roundKeys[round - 1];
    const newKey = Array(4)
      .fill()
      .map(() => Array(4).fill(0));

    let temp = [prevKey[1][3], prevKey[2][3], prevKey[3][3], prevKey[0][3]];
    temp = temp.map((b) => SBOX[b]);
    temp[0] ^= RCON[round - 1];

    for (let r = 0; r < 4; r++) {
      newKey[r][0] = prevKey[r][0] ^ temp[r];
    }

    for (let c = 1; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        newKey[r][c] = newKey[r][c - 1] ^ prevKey[r][c];
      }
    }

    roundKeys.push(newKey);
  }

  return roundKeys;
}

window.aesEncrypt = function (plaintext, key) {
  if (!plaintext || !key) return "";

  let state = stringToState(plaintext);
  const roundKeys = keyExpansion(key);

  state = addRoundKey(state, roundKeys[0]);

  for (let round = 1; round < 10; round++) {
    state = subBytes(state);
    state = shiftRows(state);
    state = mixColumns(state);
    state = addRoundKey(state, roundKeys[round]);
  }

  state = subBytes(state);
  state = shiftRows(state);
  state = addRoundKey(state, roundKeys[10]);

  return stateToHex(state);
};

window.aesDecrypt = function (ciphertext, key) {
  if (!ciphertext || !key) return "";

  let state = hexToState(ciphertext);
  const roundKeys = keyExpansion(key);

  state = addRoundKey(state, roundKeys[10]);
  state = invShiftRows(state);
  state = invSubBytes(state);

  for (let round = 9; round >= 1; round--) {
    state = addRoundKey(state, roundKeys[round]);
    state = invMixColumns(state);
    state = invShiftRows(state);
    state = invSubBytes(state);
  }

  state = addRoundKey(state, roundKeys[0]);

  return stateToString(state);
};
