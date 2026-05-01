window.vigenereEncrypt = function (text, key) {
  let result = "",
    keyIndex = 0;
  for (let c of text) {
    if (/[a-zA-Z]/.test(c)) {
      let base = c <= "Z" ? 65 : 97;
      let shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
      result += String.fromCharCode(
        ((c.charCodeAt(0) - base + shift) % 26) + base,
      );
      keyIndex++;
    } else result += c;
  }
  return result;
};

window.vigenereDecrypt = function (text, key) {
  let result = "",
    keyIndex = 0;
  for (let c of text) {
    if (/[a-zA-Z]/.test(c)) {
      let base = c <= "Z" ? 65 : 97;
      let shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
      result += String.fromCharCode(
        ((c.charCodeAt(0) - base - shift + 26) % 26) + base,
      );
      keyIndex++;
    } else result += c;
  }
  return result;
};
