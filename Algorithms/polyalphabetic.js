window.polyalphabeticEncrypt = function (text, keyword, alphabets) {
  if (!keyword || !text) return text;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let alphaIndex = 0;

  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const currentChar = char.toUpperCase();
      const currentAlpha = alphabets[alphaIndex % alphabets.length];
      const position = alphabet.indexOf(currentChar);

      let substituted = currentAlpha[position];
      if (!isUpper) substituted = substituted.toLowerCase();

      result += substituted;
      alphaIndex++;
    } else {
      result += char;
    }
  }
  return result;
};

window.polyalphabeticDecrypt = function (text, keyword, alphabets) {
  if (!keyword || !text) return text;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  let alphaIndex = 0;

  const reverseMaps = alphabets.map((alpha) => {
    const map = {};
    for (let i = 0; i < 26; i++) {
      map[alpha[i]] = alphabet[i];
    }
    return map;
  });

  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const currentChar = char.toUpperCase();
      const reverseMap = reverseMaps[alphaIndex % reverseMaps.length];

      let decrypted = reverseMap[currentChar] || currentChar;
      if (!isUpper) decrypted = decrypted.toLowerCase();

      result += decrypted;
      alphaIndex++;
    } else {
      result += char;
    }
  }
  return result;
};

window.generatePolyalphabeticAlphabets = function (keyword) {
  const alphabets = [];
  for (let i = 0; i < keyword.length; i++) {
    alphabets.push(window.generateMonoalphabeticKey());
  }
  return alphabets;
};
