window.rsaEncrypt = function (text, p, q, e) {
  if (!text) return "";
  try {
    p = BigInt(p);
    q = BigInt(q);
    e = BigInt(e);

    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    const modInverse = (a, m) => {
      let m0 = m,
        y = 0n,
        x = 1n;
      if (m === 1n) return 0n;
      while (a > 1n) {
        let q = a / m;
        let t = m;
        m = a % m;
        a = t;
        t = y;
        y = x - q * y;
        x = t;
      }
      if (x < 0n) x += m0;
      return x;
    };

    const d = modInverse(e, phi);

    const modPow = (base, exp, mod) => {
      let res = 1n;
      base = base % mod;
      while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        exp = exp / 2n;
        base = (base * base) % mod;
      }
      return res;
    };

    return Array.from(text)
      .map((char) => {
        let m = BigInt(char.charCodeAt(0));
        return modPow(m, e, n).toString();
      })
      .join(" ");
  } catch (err) {
    return "Error: Invalid RSA parameters.";
  }
};

window.rsaDecrypt = function (text, p, q, e) {
  if (!text) return "";
  try {
    p = BigInt(p);
    q = BigInt(q);
    e = BigInt(e);

    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    const modInverse = (a, m) => {
      let m0 = m,
        y = 0n,
        x = 1n;
      if (m === 1n) return 0n;
      while (a > 1n) {
        let q = a / m;
        let t = m;
        m = a % m;
        a = t;
        t = y;
        y = x - q * y;
        x = t;
      }
      if (x < 0n) x += m0;
      return x;
    };

    const d = modInverse(e, phi);

    const modPow = (base, exp, mod) => {
      let res = 1n;
      base = base % mod;
      while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        exp = exp / 2n;
        base = (base * base) % mod;
      }
      return res;
    };

    return text
      .split(" ")
      .map((numStr) => {
        if (!numStr.trim()) return "";
        let c = BigInt(numStr);
        let m = modPow(c, d, n);
        return String.fromCharCode(Number(m));
      })
      .join("");
  } catch (err) {
    return "Error: Invalid RSA parameters.";
  }
};
