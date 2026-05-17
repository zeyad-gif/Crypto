window.columnarEncrypt = function (text, key) {
  if (!key || !text) return text;

  const getOrder = (k) =>
    Array.from(k)
      .map((char, i) => ({ char, i }))
      .sort((a, b) => a.char.localeCompare(b.char) || a.i - b.i);

  const numCols = key.length;
  const order = getOrder(key);

  let result = "";
  for (let { i: colIndex } of order) {
    for (let r = 0; r < text.length; r += numCols) {
      if (r + colIndex < text.length) {
        result += text[r + colIndex];
      }
    }
  }
  return result;
};

window.columnarDecrypt = function (text, key) {
  if (!key || !text) return text;

  const getOrder = (k) =>
    Array.from(k)
      .map((char, i) => ({ char, i }))
      .sort((a, b) => a.char.localeCompare(b.char) || a.i - b.i);

  const numCols = key.length;
  const order = getOrder(key);
  const numRows = Math.ceil(text.length / numCols);
  const emptyCells = numCols * numRows - text.length;

  const colLengths = new Array(numCols).fill(numRows);
  for (let i = 0; i < emptyCells; i++) {
    colLengths[numCols - 1 - i]--;
  }

  const grid = Array.from({ length: numCols }, () => []);
  let currentIndex = 0;

  for (let { i: colIndex } of order) {
    let len = colLengths[colIndex];
    grid[colIndex] = text.slice(currentIndex, currentIndex + len).split("");
    currentIndex += len;
  }

  let result = "";
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (grid[c][r]) {
        result += grid[c][r];
      }
    }
  }
  return result;
};
