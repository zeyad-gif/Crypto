window.hillEncrypt = function (text, keyMatrix) {
  let result = "";
  let filtered = text.toUpperCase().replace(/[^A-Z]/g, "");
  while (filtered.length % 2 !== 0) filtered += "X";
  for (let i = 0; i < filtered.length; i += 2) {
    let p1 = filtered.charCodeAt(i) - 65,
      p2 = filtered.charCodeAt(i + 1) - 65;
    let c1 = (keyMatrix[0][0] * p1 + keyMatrix[0][1] * p2) % 26;
    let c2 = (keyMatrix[1][0] * p1 + keyMatrix[1][1] * p2) % 26;
    result += String.fromCharCode(c1 + 65) + String.fromCharCode(c2 + 65);
  }
  return result;
};

window.hillDecrypt = function (text, keyMatrix) {
  let det =
    (keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0]) %
    26;
  det = (det + 26) % 26;
  let detInv = window.modInverse(det, 26);
  let invMatrix = [
    [(keyMatrix[1][1] * detInv) % 26, (-keyMatrix[0][1] * detInv) % 26],
    [(-keyMatrix[1][0] * detInv) % 26, (keyMatrix[0][0] * detInv) % 26],
  ];
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) invMatrix[i][j] = (invMatrix[i][j] + 26) % 26;
  let result = "";
  let filtered = text.toUpperCase().replace(/[^A-Z]/g, "");
  for (let i = 0; i < filtered.length; i += 2) {
    let c1 = filtered.charCodeAt(i) - 65,
      c2 = filtered.charCodeAt(i + 1) - 65;
    let p1 = (invMatrix[0][0] * c1 + invMatrix[0][1] * c2) % 26;
    let p2 = (invMatrix[1][0] * c1 + invMatrix[1][1] * c2) % 26;
    result += String.fromCharCode(p1 + 65) + String.fromCharCode(p2 + 65);
  }
  return result;
};
