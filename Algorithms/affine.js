window.modInverse = function (a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
  return 1;
};

window.affineEncrypt = function (text, a, b) {
  let result = "";
  for (let c of text) {
    if (/[a-zA-Z]/.test(c)) {
      let base = c <= "Z" ? 65 : 97;
      let x = c.charCodeAt(0) - base;
      let val = (a * x + b) % 26;
      result += String.fromCharCode(val + base);
    } else result += c;
  }
  return result;
};

window.affineDecrypt = function (text, a, b) {
  let aInv = window.modInverse(a, 26);
  let result = "";
  for (let c of text) {
    if (/[a-zA-Z]/.test(c)) {
      let base = c <= "Z" ? 65 : 97;
      let y = c.charCodeAt(0) - base;
      let val = (aInv * (y - b + 26)) % 26;
      result += String.fromCharCode(val + base);
    } else result += c;
  }
  return result;
};
