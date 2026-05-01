window.otpEncrypt = function (text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++)
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length),
    );
  return result;
};

window.otpDecrypt = function (text, key) {
  return window.otpEncrypt(text, key);
};
