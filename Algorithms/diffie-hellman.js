window.diffieHellmanExchange = function (p, g, a, b) {
  try {
    p = BigInt(p);
    g = BigInt(g);
    a = BigInt(a);
    b = BigInt(b);

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

    const A = modPow(g, a, p);
    const B = modPow(g, b, p);
    const aliceShared = modPow(B, a, p);
    const bobShared = modPow(A, b, p);

    return (
      `--- KEY EXCHANGE SIMULATION ---\n\n` +
      `1. Alice sends Public Key A: ${A}\n` +
      `2. Bob sends Public Key B: ${B}\n\n` +
      `Alice computes Shared Secret: ${aliceShared}\n` +
      `Bob computes Shared Secret: ${bobShared}\n\n` +
      `Status: ${aliceShared === bobShared ? "✅ Exchange Successful" : "❌ Mismatch"}\n\n` +
      `(Note: Diffie-Hellman establishes a shared key, it does not encrypt the text directly.)`
    );
  } catch (err) {
    return "Error in DH calculation. Check inputs.";
  }
};
