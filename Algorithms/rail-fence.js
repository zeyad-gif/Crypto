window.railFenceEncrypt = function (text, rails) {
  if (rails < 2 || !text) return text;
  let fence = Array.from({ length: rails }, () => []);
  let row = 0,
    dir = 1;
  for (let char of text) {
    fence[row].push(char);
    row += dir;
    if (row === 0 || row === rails - 1) dir *= -1;
  }
  return fence.flat().join("");
};

window.railFenceDecrypt = function (text, rails) {
  if (rails < 2 || !text) return text;
  let fence = Array.from({ length: rails }, () =>
    Array(text.length).fill(null),
  );
  let row = 0,
    dir = 1;
  for (let i = 0; i < text.length; i++) {
    fence[row][i] = "*";
    row += dir;
    if (row === 0 || row === rails - 1) dir *= -1;
  }
  let index = 0;
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < text.length; c++) {
      if (fence[r][c] === "*" && index < text.length) {
        fence[r][c] = text[index++];
      }
    }
  }
  let result = "",
    r = 0,
    d = 1;
  for (let i = 0; i < text.length; i++) {
    result += fence[r][i];
    r += d;
    if (r === 0 || r === rails - 1) d *= -1;
  }
  return result;
};
