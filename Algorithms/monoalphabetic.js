window.monoalphabeticEncrypt = function (text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const keyMap = {};

  for (let i = 0; i < 26; i++) {
    keyMap[alphabet[i]] = key[i].toUpperCase();
    keyMap[alphabet[i].toLowerCase()] = key[i].toLowerCase();
  }

  let result = "";
  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      result += keyMap[char] || char;
    } else {
      result += char;
    }
  }
  return result;
};

window.monoalphabeticDecrypt = function (text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const reverseMap = {};

  for (let i = 0; i < 26; i++) {
    reverseMap[key[i].toUpperCase()] = alphabet[i];
    reverseMap[key[i].toLowerCase()] = alphabet[i].toLowerCase();
  }

  let result = "";
  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      result += reverseMap[char] || char;
    } else {
      result += char;
    }
  }
  return result;
};

window.generateMonoalphabeticKey = function () {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  for (let i = alphabet.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
  }
  return alphabet.join("");
};
