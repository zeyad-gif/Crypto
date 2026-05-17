// ==========================================
// PLAYGROUND.JS - All Playground Logic
// ==========================================

// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader")?.classList.add("hidden");
  }, 1500);
});

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 100);
});

// Custom cursor
window.addEventListener("load", () => {
  const $big = document.querySelector(".cursor__ball--big"),
    $small = document.querySelector(".cursor__ball--small");
  if (!$big || !$small) return;
  const $hover = document.querySelectorAll(
    "a, button, .nav-link, .category-tab, .card-cta, .crypto-btn, .algorithm",
  );
  let scale = 1;
  $hover.forEach((el) => {
    el.addEventListener("mouseenter", () => (scale = 3));
    el.addEventListener("mouseleave", () => (scale = 1));
  });
  document.body.addEventListener("mousemove", (e) => {
    if (typeof TweenMax !== "undefined") {
      TweenMax.to($big, 0.3, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        scale: scale,
      });
      TweenMax.to($small, 0.1, { x: e.clientX - 5, y: e.clientY - 5 });
    }
  });
});

// ==========================================
// PLAYGROUND CORE LOGIC
// ==========================================
(function () {
  // DOM Elements
  const wheelContainer = document.getElementById("wheelCanvas");
  const wheelSection = document.querySelector(".cipher-wheel-section");
  const encryptBox = document.querySelector(".encryption-box");
  const inputText = document.getElementById("inputText");
  const outputDiv = document.getElementById("outputText");
  const shiftSlider = document.getElementById("shiftSlider");
  const shiftValueSpan = document.getElementById("shiftValue");
  const randomBtn = document.getElementById("randomBtn");
  const copyBtn = document.getElementById("copyBtn");
  const encryptModeBtn = document.getElementById("encryptModeBtn");
  const decryptModeBtn = document.getElementById("decryptModeBtn");
  const algoButtons = document.querySelectorAll(".algorithm");
  const algoDropdown = document.getElementById("algoDropdown");
  const caesarContainer = document.querySelector(".caesar-container");

  // Create Dynamic Key Container automatically inside the UI
  const outputGroup = outputDiv.closest(".input-group");
  let keyContainer = document.createElement("div");
  keyContainer.id = "dynamicKeyContainer";
  keyContainer.className = "input-group";
  outputGroup.parentNode.insertBefore(keyContainer, outputGroup);

  // Global State
  let currentShift = 13;
  let currentMode = "encrypt";
  let activeAlgoKey = "caesar-cipher";
  let svg, innerGroup;
  let rotationAngle = 0;
  let drag = false;
  let startMouseAngle = 0;
  let startRotation = 0;

  // ==================== WHEEL VISIBILITY CONTROL ====================
  function showWheel() {
    if (wheelSection) wheelSection.style.display = "block";
    if (caesarContainer) {
      caesarContainer.classList.add("wheel-visible");
      caesarContainer.classList.remove("single-column");
    }
  }

  function hideWheel() {
    if (wheelSection) wheelSection.style.display = "none";
    if (caesarContainer) {
      caesarContainer.classList.remove("wheel-visible");
      caesarContainer.classList.add("single-column");
    }
  }

  function updateWheelTitle(algoName) {
    const wheelTitle = document.querySelector(".cipher-wheel-section h2");
    if (wheelTitle) {
      const shortNames = {
        "caesar-cipher": "CAESAR CIPHER",
        "Vigenère-Cipher": "VIGENÈRE CIPHER",
        "Affine-Cipher": "AFFINE CIPHER",
        "Hill-Cipher": "HILL CIPHER",
        OTP: "OTP CIPHER",
        Hash: "SHA-256 HASH",
        Monoalphabetic: "MONOALPHABETIC",
        Polyalphabetic: "POLYALPHABETIC",
        "RAIL FENCE": "RAIL FENCE",
        "COLUMNER-TRANSPOSITION": "COLUMNAR",
        DES: "DES CIPHER",
        AES: "AES CIPHER",
        RSA: "RSA CIPHER",
        "DIFFIE-HELLMAN": "DIFFIE-HELLMAN",
      };
      wheelTitle.textContent = shortNames[algoName] || algoName;
    }
  }

  // The Master Registry (references window functions from algorithm files)
  const CipherRegistry = {
    "caesar-cipher": {
      showWheel: true,
      renderKeys: () => "",
      exec: (text, mode) => {
        const s = ((currentShift % 26) + 26) % 26;
        const effectiveShift = mode === "encrypt" ? s : (26 - s) % 26;
        return text.replace(/[a-zA-Z]/g, (ch) => {
          const base = ch <= "Z" ? 65 : 97;
          return String.fromCharCode(
            ((ch.charCodeAt(0) - base + effectiveShift) % 26) + base,
          );
        });
      },
    },
    "Vigenère-Cipher": {
      showWheel: false,
      renderKeys: () => `
                <label>Keyword</label>
                <input type="text" id="vigKey" value="CRYPTO" class="dynamic-input">
            `,
      exec: (text, mode) => {
        const key = document.getElementById("vigKey")?.value || "CRYPTO";
        return mode === "encrypt"
          ? window.vigenereEncrypt(text, key)
          : window.vigenereDecrypt(text, key);
      },
    },
    "Affine-Cipher": {
      showWheel: false,
      renderKeys: () => `
                <div style="display: flex; gap: 15px;">
                    <div style="flex: 1;">
                        <label>Multiplier (a)</label>
                        <input type="number" id="affA" value="5" class="dynamic-input">
                    </div>
                    <div style="flex: 1;">
                        <label>Shift (b)</label>
                        <input type="number" id="affB" value="8" class="dynamic-input">
                    </div>
                </div>
            `,
      exec: (text, mode) => {
        const a = parseInt(document.getElementById("affA")?.value) || 5;
        const b = parseInt(document.getElementById("affB")?.value) || 8;
        return mode === "encrypt"
          ? window.affineEncrypt(text, a, b)
          : window.affineDecrypt(text, a, b);
      },
    },
    "Hill-Cipher": {
      showWheel: false,
      renderKeys: () => `
                <label>Matrix 2x2 (Top Row / Bottom Row)</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <input type="number" id="hillA" value="3" class="dynamic-input">
                    <input type="number" id="hillB" value="2" class="dynamic-input">
                    <input type="number" id="hillC" value="5" class="dynamic-input">
                    <input type="number" id="hillD" value="7" class="dynamic-input">
                </div>
            `,
      exec: (text, mode) => {
        const a = parseInt(document.getElementById("hillA")?.value) || 3;
        const b = parseInt(document.getElementById("hillB")?.value) || 2;
        const c = parseInt(document.getElementById("hillC")?.value) || 5;
        const d = parseInt(document.getElementById("hillD")?.value) || 7;
        return mode === "encrypt"
          ? window.hillEncrypt(text, [
              [a, b],
              [c, d],
            ])
          : window.hillDecrypt(text, [
              [a, b],
              [c, d],
            ]);
      },
    },
    OTP: {
      showWheel: false,
      renderKeys: () => `
                <label>One-Time Pad Key</label>
                <input type="text" id="otpKey" value="SECRETKEY" class="dynamic-input">
            `,
      exec: (text, mode) => {
        const key = document.getElementById("otpKey")?.value || "X";
        if (!text) return "";

        if (mode === "encrypt") {
          let result = "";
          for (let i = 0; i < text.length; i++) {
            let xorVal = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += xorVal.toString(16).padStart(2, "0");
          }
          return result.toUpperCase();
        } else {
          let result = "";
          let hexText = text.replace(/[^0-9a-fA-F]/g, "");
          for (let i = 0; i < hexText.length; i += 2) {
            let charCode = parseInt(hexText.substr(i, 2), 16);
            result += String.fromCharCode(
              charCode ^ key.charCodeAt((i / 2) % key.length),
            );
          }
          return result;
        }
      },
    },
    Hash: {
      showWheel: false,
      renderKeys: () => `
                <label style="color: var(--accent-red)">⚠️ Note: Hashing is one-way</label>
            `,
      exec: (text, mode) => {
        if (mode === "decrypt") return "⚠️ SHA-256 Hashing is irreversible.";
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
          hash = (hash << 5) - hash + text.charCodeAt(i);
          hash |= 0;
        }
        return (
          Math.abs(hash).toString(16) +
          btoa(text).replace(/=/g, "").slice(0, 40).toLowerCase()
        );
      },
    },
    Monoalphabetic: {
      showWheel: false,
      renderKeys: () => `
                <label>Substitution Key (26 unique letters)</label>
                <input type="text" id="monoKey" value="${window.generateMonoalphabeticKey()}" class="dynamic-input" maxlength="26">
                <button type="button" id="randomMonoKey" style="margin-top:10px; padding:8px 15px; background:var(--carbon-medium); border:1px solid var(--metal-dark); border-radius:20px; color:var(--text-secondary); cursor:pointer;">🎲 Random Key</button>
            `,
      exec: (text, mode) => {
        const key =
          document.getElementById("monoKey")?.value ||
          "QWERTYUIOPASDFGHJKLZXCVBNM";
        if (key.length !== 26 || new Set(key.toUpperCase()).size !== 26) {
          return "⚠️ Key must be exactly 26 unique letters!";
        }
        return mode === "encrypt"
          ? window.monoalphabeticEncrypt(text, key)
          : window.monoalphabeticDecrypt(text, key);
      },
      postRender: () => {
        document
          .getElementById("randomMonoKey")
          ?.addEventListener("click", () => {
            const input = document.getElementById("monoKey");
            if (input) input.value = window.generateMonoalphabeticKey();
            updateOutput();
          });
      },
    },
    Polyalphabetic: {
      showWheel: false,
      renderKeys: () => `
                <label>Keyword</label>
                <input type="text" id="polyKeyword" value="KEY" class="dynamic-input">
                <label style="margin-top:10px;">Number of Alphabets</label>
                <input type="number" id="polyAlphaCount" value="3" min="1" max="10" class="dynamic-input">
                <button type="button" id="generatePolyAlphas" style="margin-top:10px; padding:8px 15px; background:var(--carbon-medium); border:1px solid var(--metal-dark); border-radius:20px; color:var(--text-secondary); cursor:pointer;">🎲 Generate Alphabets</button>
            `,
      exec: (text, mode) => {
        const keyword = document.getElementById("polyKeyword")?.value || "KEY";
        const count =
          parseInt(document.getElementById("polyAlphaCount")?.value) || 3;
        let alphabets = window._polyAlphabets;
        if (!alphabets || alphabets.length === 0) {
          alphabets = window.generatePolyalphabeticAlphabets(
            keyword.padEnd(count, "K"),
          );
          window._polyAlphabets = alphabets;
        }
        return mode === "encrypt"
          ? window.polyalphabeticEncrypt(text, keyword, alphabets)
          : window.polyalphabeticDecrypt(text, keyword, alphabets);
      },
      postRender: () => {
        document
          .getElementById("generatePolyAlphas")
          ?.addEventListener("click", () => {
            const keyword =
              document.getElementById("polyKeyword")?.value || "KEY";
            const count =
              parseInt(document.getElementById("polyAlphaCount")?.value) || 3;
            window._polyAlphabets = window.generatePolyalphabeticAlphabets(
              keyword.padEnd(count, "K"),
            );
            updateOutput();
          });
      },
    },
    "RAIL FENCE": {
      showWheel: false,
      renderKeys: () => `
                <label>Number of Rails</label>
                <input type="number" id="railCount" value="3" min="2" class="dynamic-input">
            `,
      exec: (text, mode) => {
        const rails =
          parseInt(document.getElementById("railCount")?.value) || 3;
        return mode === "encrypt"
          ? window.railFenceEncrypt(text, rails)
          : window.railFenceDecrypt(text, rails);
      },
    },
    "COLUMNER-TRANSPOSITION": {
      showWheel: false,
      renderKeys: () => `
                <label>Keyword</label>
                <input type="text" id="colKey" value="KEY" class="dynamic-input">
            `,
      exec: (text, mode) => {
        const key = document.getElementById("colKey")?.value || "KEY";
        if (!key || !text) return text;
        return mode === "encrypt"
          ? window.columnarEncrypt(text, key)
          : window.columnarDecrypt(text, key);
      },
    },
    DES: {
      showWheel: false,
      renderKeys: () => `
                <label>Encryption Key (8 characters)</label>
                <input type="text" id="desKey" value="SECRETKY" class="dynamic-input" maxlength="8">
            `,
      exec: (text, mode) => {
        const key = document.getElementById("desKey")?.value || "SECRETKY";
        if (mode === "encrypt") {
          return window.desEncrypt(text, key);
        } else {
          const decrypted = window.desDecrypt(text, key);
          return (
            decrypted ||
            "⚠️ Cannot decrypt. Use valid DES-encrypted hex string."
          );
        }
      },
    },
    AES: {
      showWheel: false,
      renderKeys: () => `
                <label>Encryption Key (up to 16 characters)</label>
                <input type="text" id="aesKey" value="MYAESKEY1234567" class="dynamic-input">
            `,
      exec: (text, mode) => {
        const key =
          document.getElementById("aesKey")?.value || "MYAESKEY1234567";
        if (mode === "encrypt") {
          return window.aesEncrypt(text, key);
        } else {
          const decrypted = window.aesDecrypt(text, key);
          return (
            decrypted ||
            "⚠️ Cannot decrypt. Use valid AES-encrypted hex string."
          );
        }
      },
    },
    RSA: {
      showWheel: false,
      renderKeys: () => `
                <div style="display: flex; gap: 15px;">
                    <div style="flex: 1;">
                        <label>Prime P</label>
                        <input type="number" id="rsaP" value="61" class="dynamic-input">
                    </div>
                    <div style="flex: 1;">
                        <label>Prime Q</label>
                        <input type="number" id="rsaQ" value="53" class="dynamic-input">
                    </div>
                    <div style="flex: 1;">
                        <label>Public Exp (e)</label>
                        <input type="number" id="rsaE" value="17" class="dynamic-input">
                    </div>
                </div>
            `,
      exec: (text, mode) => {
        const p = document.getElementById("rsaP")?.value || 61;
        const q = document.getElementById("rsaQ")?.value || 53;
        const e = document.getElementById("rsaE")?.value || 17;
        return mode === "encrypt"
          ? window.rsaEncrypt(text, p, q, e)
          : window.rsaDecrypt(text, p, q, e);
      },
    },
    "DIFFIE-HELLMAN": {
      showWheel: false,
      renderKeys: () => `
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 45%;">
                        <label>Prime Modulus (P)</label>
                        <input type="number" id="dhP" value="23" class="dynamic-input">
                    </div>
                    <div style="flex: 1; min-width: 45%;">
                        <label>Base / Generator (G)</label>
                        <input type="number" id="dhG" value="5" class="dynamic-input">
                    </div>
                    <div style="flex: 1; min-width: 45%;">
                        <label>Alice's Secret (a)</label>
                        <input type="number" id="dhA" value="4" class="dynamic-input">
                    </div>
                    <div style="flex: 1; min-width: 45%;">
                        <label>Bob's Secret (b)</label>
                        <input type="number" id="dhB" value="3" class="dynamic-input">
                    </div>
                </div>
            `,
      exec: () => {
        const p = document.getElementById("dhP")?.value || 23;
        const g = document.getElementById("dhG")?.value || 5;
        const a = document.getElementById("dhA")?.value || 4;
        const b = document.getElementById("dhB")?.value || 3;
        return window.diffieHellmanExchange(p, g, a, b);
      },
    },
  };

  // Main Update Logic
  function updateOutput() {
    const text = inputText.value;
    const config = CipherRegistry[activeAlgoKey];
    if (config) {
      const outputGroupLabel = outputGroup.querySelector("label");
      outputGroupLabel.textContent = `Output (${activeAlgoKey.replace("-", " ")})`;
      outputDiv.textContent = config.exec(text, currentMode);
    }
  }

  function setMode(mode) {
    currentMode = mode;
    if (mode === "encrypt") {
      encryptModeBtn.classList.add("active");
      decryptModeBtn.classList.remove("active");
    } else {
      decryptModeBtn.classList.add("active");
      encryptModeBtn.classList.remove("active");
    }
    updateOutput();
  }

  // ==================== ALGORITHM SWITCHING ====================
  function switchAlgorithm(algoKey) {
    activeAlgoKey = algoKey;
    const config = CipherRegistry[algoKey];
    if (!config) return;

    // Update active button
    algoButtons.forEach((btn) => btn.classList.remove("active"));
    const targetBtn = document.querySelector(
      `.algorithm[data-algo="${algoKey}"]`,
    );
    if (targetBtn) targetBtn.classList.add("active");

    // Sync dropdown
    if (algoDropdown) algoDropdown.value = algoKey;

    // Wheel visibility
    if (config.showWheel) {
      showWheel();
    } else {
      hideWheel();
    }

    updateWheelTitle(algoKey);

    // Update URL
    const algoNames = {
      "caesar-cipher": "Caesar Cipher",
      "Vigenère-Cipher": "Vigenère Cipher",
      "Affine-Cipher": "Affine Cipher",
      "Hill-Cipher": "Hill Cipher",
      OTP: "OTP Cipher",
      Hash: "SHA-256 Hash",
      Monoalphabetic: "Monoalphabetic",
      Polyalphabetic: "Polyalphabetic",
      "RAIL FENCE": "Rail Fence",
      "COLUMNER-TRANSPOSITION": "Columnar",
      DES: "DES Cipher",
      AES: "AES Cipher",
      RSA: "RSA Cipher",
      "DIFFIE-HELLMAN": "Diffie-Hellman",
    };
    const algoName = algoNames[algoKey] || algoKey;
    window.history.replaceState(
      {},
      "",
      `playground.html?algo=${encodeURIComponent(algoName)}`,
    );

    // Render dynamic keys
    keyContainer.innerHTML = config.renderKeys();
    const newInputs = keyContainer.querySelectorAll("input");
    newInputs.forEach((inp) => inp.addEventListener("input", updateOutput));

    if (config.postRender) {
      config.postRender();
    }

    updateOutput();
  }

  // Algorithm button clicks
  algoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      switchAlgorithm(this.getAttribute("data-algo"));
    });
  });

  // Dropdown change
  if (algoDropdown) {
    algoDropdown.addEventListener("change", function () {
      switchAlgorithm(this.value);
    });
  }

  // Base Event Listeners
  inputText.addEventListener("input", updateOutput);
  encryptModeBtn.addEventListener("click", () => setMode("encrypt"));
  decryptModeBtn.addEventListener("click", () => setMode("decrypt"));
  copyBtn.addEventListener("click", () => {
    const textToCopy = outputDiv.textContent;
    if (!textToCopy.trim()) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyBtn.textContent = "✓ COPIED!";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "COPY OUTPUT";
        copyBtn.classList.remove("copied");
      }, 2000);
    });
  });

  // ==================== WHEEL SVG & DRAG LOGIC ====================
  const SIZE = 400;
  const CENTER = SIZE / 2;
  const R_OUTER = 180;
  const R_MID = 145;
  const R_INNER = 110;
  const OUTER_LETTER_R = (R_OUTER + R_MID) / 2;
  const INNER_LETTER_R = (R_MID + R_INNER) / 2;
  const STEP_DEG = 360 / 26;
  const HALF_STEP = STEP_DEG / 2;

  function createSVGElement(type, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (let [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  function drawCircle(
    cx,
    cy,
    r,
    strokeColor,
    strokeWidth = 2,
    fillColor = "transparent",
  ) {
    return createSVGElement("circle", {
      cx,
      cy,
      r,
      fill: fillColor,
      stroke: strokeColor,
      "stroke-width": strokeWidth,
    });
  }

  function drawLettersOnRadius(radius, startAngleDeg, letters, color, group) {
    for (let i = 0; i < letters.length; i++) {
      const angleRad = ((startAngleDeg + i * STEP_DEG) * Math.PI) / 180;
      const text = createSVGElement("text", {
        x: CENTER + radius * Math.cos(angleRad),
        y: CENTER + radius * Math.sin(angleRad),
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": "18px",
        "font-family": "'Orbitron', monospace",
        fill: color,
        "font-weight": "bold",
      });
      text.textContent = letters[i];
      group.appendChild(text);
    }
  }

  function drawFlankingLines(r1, r2, startAngleDeg, count, color, group) {
    for (let i = 0; i < count; i++) {
      const centerAngle = startAngleDeg + i * STEP_DEG;
      const leftRad = ((centerAngle - HALF_STEP) * Math.PI) / 180;
      const rightRad = ((centerAngle + HALF_STEP) * Math.PI) / 180;

      group.appendChild(
        createSVGElement("line", {
          x1: CENTER + r1 * Math.cos(leftRad),
          y1: CENTER + r1 * Math.sin(leftRad),
          x2: CENTER + r2 * Math.cos(leftRad),
          y2: CENTER + r2 * Math.sin(leftRad),
          stroke: color,
          "stroke-width": 1.5,
          opacity: 0.7,
        }),
      );
      group.appendChild(
        createSVGElement("line", {
          x1: CENTER + r1 * Math.cos(rightRad),
          y1: CENTER + r1 * Math.sin(rightRad),
          x2: CENTER + r2 * Math.cos(rightRad),
          y2: CENTER + r2 * Math.sin(rightRad),
          stroke: color,
          "stroke-width": 1.5,
          opacity: 0.7,
        }),
      );
    }
  }

  function generateWheel() {
    if (!wheelContainer) return;
    wheelContainer.innerHTML = "";
    svg = createSVGElement("svg", {
      viewBox: `0 0 ${SIZE} ${SIZE}`,
      width: "100%",
      height: "auto",
    });
    svg.appendChild(
      drawCircle(CENTER, CENTER, R_OUTER, "var(--metal-dark)", 2),
    );
    svg.appendChild(drawCircle(CENTER, CENTER, R_MID, "var(--metal-light)", 2));
    svg.appendChild(
      drawCircle(CENTER, CENTER, R_INNER, "var(--metal-dark)", 2),
    );

    const outerGroup = createSVGElement("g", {});
    drawLettersOnRadius(
      OUTER_LETTER_R,
      -90,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      "var(--accent-cyan)",
      outerGroup,
    );
    drawFlankingLines(R_MID, R_OUTER, -90, 26, "var(--metal-dark)", outerGroup);
    svg.appendChild(outerGroup);

    innerGroup = createSVGElement("g", {});
    drawLettersOnRadius(
      INNER_LETTER_R,
      -90,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      "var(--text-primary)",
      innerGroup,
    );
    drawFlankingLines(R_INNER, R_MID, -90, 26, "var(--metal-dark)", innerGroup);
    innerGroup.appendChild(
      drawCircle(CENTER, CENTER, R_INNER, "var(--metal-dark)", 2),
    );
    svg.appendChild(innerGroup);
    svg.appendChild(
      drawCircle(
        CENTER,
        CENTER,
        8,
        "var(--accent-purple)",
        0,
        "var(--accent-purple)",
      ),
    );

    wheelContainer.appendChild(svg);
    applyRotation();
  }

  function applyRotation() {
    if (innerGroup)
      innerGroup.setAttribute(
        "transform",
        `rotate(${rotationAngle} ${CENTER} ${CENTER})`,
      );
    let shift = Math.round((-rotationAngle / 360) * 26);
    shift = ((shift % 26) + 26) % 26;
    if (shift !== currentShift) {
      currentShift = shift;
      shiftSlider.value = currentShift;
      shiftValueSpan.textContent = currentShift;
      if (activeAlgoKey === "caesar-cipher") updateOutput();
    }
  }

  function setShiftFromValue(shift) {
    currentShift = Math.min(26, Math.max(0, shift));
    rotationAngle = -(currentShift / 26) * 360;
    applyRotation();
    if (activeAlgoKey === "caesar-cipher") updateOutput();
  }

  function getAngleFromEvent(clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    let angle =
      (Math.atan2(
        clientY - (rect.top + rect.height / 2),
        clientX - (rect.left + rect.width / 2),
      ) *
        180) /
      Math.PI;
    return (angle + 360) % 360;
  }

  function onDragStart(e) {
    e.preventDefault();
    const clientX = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches ? e.touches[0].clientY : 0);
    startMouseAngle = getAngleFromEvent(clientX, clientY);
    startRotation = rotationAngle;
    drag = true;
    svg.style.cursor = "grabbing";
  }

  function onDragMove(e) {
    if (!drag) return;
    const clientX =
      e.clientX ?? (e.changedTouches ? e.changedTouches[0].clientX : 0);
    const clientY =
      e.clientY ?? (e.changedTouches ? e.changedTouches[0].clientY : 0);
    let delta = getAngleFromEvent(clientX, clientY) - startMouseAngle;
    rotationAngle = (((startRotation + delta) % 360) + 360) % 360;
    applyRotation();
  }

  function onDragEnd() {
    if (!drag) return;
    drag = false;
    svg.style.cursor = "grab";
    let snapShift = Math.round((-rotationAngle / 360) * 26);
    setShiftFromValue(((snapShift % 26) + 26) % 26);
  }

  // Initialize Wheel
  generateWheel();

  // Only attach wheel events if svg exists
  if (svg) {
    svg.addEventListener("mousedown", onDragStart);
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
    svg.addEventListener("touchstart", onDragStart, { passive: false });
    window.addEventListener("touchmove", onDragMove, { passive: false });
    window.addEventListener("touchend", onDragEnd);
  }

  shiftSlider.addEventListener("input", (e) =>
    setShiftFromValue(parseInt(e.target.value, 10)),
  );
  randomBtn.addEventListener("click", () =>
    setShiftFromValue(Math.floor(Math.random() * 26)),
  );

  // ==================== INITIALIZATION ====================
  // Start with Caesar (wheel visible)
  switchAlgorithm("caesar-cipher");
  setShiftFromValue(13);
  setMode("encrypt");

  // Check URL for algorithm parameter
  function getAlgorithmFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("algo");
  }

  function selectAlgorithmByName(name) {
    if (!name) return;
    const algoMap = {
      "Caesar Cipher": "caesar-cipher",
      "Vigenère Cipher": "Vigenère-Cipher",
      "Affine Cipher": "Affine-Cipher",
      "Hill Cipher": "Hill-Cipher",
      "OTP Cipher": "OTP",
      "SHA-256 Hash": "Hash",
      Monoalphabetic: "Monoalphabetic",
      Polyalphabetic: "Polyalphabetic",
      "Rail Fence": "RAIL FENCE",
      Columnar: "COLUMNER-TRANSPOSITION",
      "DES Cipher": "DES",
      "AES Cipher": "AES",
      "RSA Cipher": "RSA",
      "Diffie-Hellman": "DIFFIE-HELLMAN",
    };
    const algoKey = algoMap[name];
    if (algoKey) {
      switchAlgorithm(algoKey);
    }
  }

  const algoFromURL = getAlgorithmFromURL();
  if (algoFromURL) {
    selectAlgorithmByName(decodeURIComponent(algoFromURL));
  }
  // If no URL param, Caesar remains (already set above)

  // Encryption particles
  function initEncryptionParticles() {
    const container = document.getElementById("encryptionParticles");
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement("div");
      dot.className = "particle-dot";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.animationDelay = Math.random() * 15 + "s";
      dot.style.animationDuration = 10 + Math.random() * 10 + "s";
      dot.style.width = 2 + Math.random() * 4 + "px";
      dot.style.height = dot.style.width;
      container.appendChild(dot);
    }
  }
  initEncryptionParticles();
})();
