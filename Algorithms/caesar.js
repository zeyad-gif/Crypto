window.caesarEncrypt = function (text, shift) {
  return text.replace(/[a-zA-Z]/g, (c) => {
    let base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(
      ((c.charCodeAt(0) - base + shift + 26) % 26) + base,
    );
  });
};

window.caesarDecrypt = function (text, shift) {
  return window.caesarEncrypt(text, -shift);
};
