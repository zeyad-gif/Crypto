const portfolioData = [
  {
    id: 1,
    title: "Caesar Cipher",
    description:
      "Shifts each letter by a fixed number. One of the simplest and oldest encryption techniques.",
    image: "images/Caesar.png",
    tech: ["Shift", "Classic", "Beginner"],
  },
  {
    id: 2,
    title: "Vigenère Cipher",
    description:
      "Uses a keyword to apply multiple shifts. Stronger than simple substitution ciphers.",
    image: "images/Vigenere.png",
    tech: ["Key-based", "Medium", "Polyalphabetic"],
  },
  {
    id: 3,
    title: "Affine Cipher",
    description:
      "Combines multiplication and addition to encrypt. A mathematical substitution cipher.",
    image: "images/Affine.png",
    tech: ["Math", "Intermediate"],
  },
  {
    id: 4,
    title: "Hill Cipher",
    description:
      "Uses matrix multiplication to encrypt blocks of text. More complex than basic ciphers.",
    image: "images/Hill.png",
    tech: ["Matrix", "Advanced"],
  },
  {
    id: 5,
    title: "OTP Cipher",
    description:
      "Uses a random key as long as the message. Theoretically unbreakable when used correctly.",
    image: "images/OTP.png",
    tech: ["XOR", "Perfect", "Advanced"],
  },
  {
    id: 6,
    title: "SHA-256 Hash",
    description:
      "Converts data into a fixed 256-bit string. One-way function for integrity and passwords.",
    image: "images/Hash.png",
    tech: ["SHA-256", "Secure", "One-way"],
  },
  {
    id: 7,
    title: "Monoalphabetic",
    description:
      "Maps each letter to a unique substitute using a scrambled alphabet key.",
    image: "images/Monoalphabetic.png",
    tech: ["Substitution", "Classic", "Beginner"],
  },
  {
    id: 8,
    title: "Polyalphabetic",
    description:
      "Uses multiple alphabets to encrypt text. Harder to crack than monoalphabetic ciphers.",
    image: "images/Polyalphabetic.png",
    tech: ["Multi-Alphabet", "Intermediate"],
  },
  {
    id: 9,
    title: "Rail Fence",
    description:
      "Writes text in a zigzag pattern across rails, then reads rows to create ciphertext.",
    image: "images/RailFence.png",
    tech: ["Transposition", "Classic", "Beginner"],
  },
  {
    id: 10,
    title: "Columnar",
    description:
      "Rearranges columns by keyword order. A classic transposition cipher technique.",
    image: "images/Columnar.png",
    tech: ["Keyword", "Transposition", "Intermediate"],
  },
  {
    id: 11,
    title: "DES Cipher",
    description:
      "Symmetric block cipher with 56-bit keys and 16 rounds. Former encryption standard.",
    image: "images/DES.png",
    tech: ["Symmetric", "Block", "Feistel"],
  },
  {
    id: 12,
    title: "AES Cipher",
    description:
      "Modern standard using 128-bit blocks. The most widely used symmetric cipher today.",
    image: "images/AES.png",
    tech: ["Symmetric", "Block", "Standard"],
  },
  {
    id: 13,
    title: "RSA Cipher",
    description:
      "Public-key cryptosystem based on prime factorization. Used for secure transmission.",
    image: "images/RSA.png",
    tech: ["Asymmetric", "Public-Key", "Advanced"],
  },
  {
    id: 14,
    title: "Diffie-Hellman",
    description:
      "Key exchange protocol for establishing shared secrets over insecure channels.",
    image: "images/DiffieHellman.png",
    tech: ["Key Exchange", "Asymmetric", "Advanced"],
  },
];

const skillsData = [
  {
    name: "Caesar",
    icon: "🔤",
    category: "basic",
    security: 1,
    complexity: 2,
    practicality: 8,
  },
  {
    name: "Vigenère",
    icon: "🔐",
    category: "classical",
    security: 6,
    complexity: 5,
    practicality: 7,
  },
  {
    name: "Affine",
    icon: "📐",
    category: "classical",
    security: 5,
    complexity: 5,
    practicality: 6,
  },
  {
    name: "Hill",
    icon: "🧮",
    category: "advanced",
    security: 7,
    complexity: 8,
    practicality: 5,
  },
  {
    name: "OTP",
    icon: "🎲",
    category: "advanced",
    security: 10,
    complexity: 3,
    practicality: 3,
  },
  {
    name: "Hash",
    icon: "♻️",
    category: "hash",
    security: 9,
    complexity: 6,
    practicality: 8,
  },
  {
    name: "Monoalphabetic",
    icon: "🔠",
    category: "basic",
    security: 3,
    complexity: 3,
    practicality: 7,
  },
  {
    name: "Polyalphabetic",
    icon: "🔡",
    category: "classical",
    security: 7,
    complexity: 6,
    practicality: 6,
  },
  {
    name: "Rail Fence",
    icon: "🛤️",
    category: "basic",
    security: 2,
    complexity: 2,
    practicality: 5,
  },
  {
    name: "Columnar",
    icon: "🧱",
    category: "classical",
    security: 5,
    complexity: 5,
    practicality: 5,
  },
  {
    name: "DES",
    icon: "🔐",
    category: "advanced",
    security: 7,
    complexity: 8,
    practicality: 6,
  },
  {
    name: "AES",
    icon: "🔒",
    category: "advanced",
    security: 9,
    complexity: 9,
    practicality: 9,
  },
  {
    name: "RSA",
    icon: "🗝️",
    category: "advanced",
    security: 8,
    complexity: 8,
    practicality: 8,
  },
  {
    name: "Diffie-Hellman",
    icon: "🤝",
    category: "advanced",
    security: 8,
    complexity: 7,
    practicality: 8,
  },
];

function calculateScore(security, complexity, practicality) {
  return (
    Math.round((security * 0.5 + complexity * 0.2 + practicality * 0.3) * 10) /
    10
  );
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const header = document.getElementById("header");
  if (section) {
    const headerHeight = header.offsetHeight;
    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: "smooth",
    });
  }
}

function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDelay = Math.random() * 20 + "s";
    p.style.animationDuration = 18 + Math.random() * 8 + "s";
    container.appendChild(p);
  }
}

let currentIndex = 0;
const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");

function createCarouselItem(data, index) {
  const item = document.createElement("div");
  item.className = "carousel-item";
  item.dataset.index = index;
  const techBadges = data.tech
    .map((t) => `<span class="tech-badge">${t}</span>`)
    .join("");

  const algoKey = encodeURIComponent(data.title);

  item.innerHTML = `
        <div class="card">
            <div class="card-number">${String(data.id).padStart(2, "0")}</div>
            <div class="card-image"><img src="${data.image}" alt="${data.title}"></div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
            <button class="card-cta" onclick="window.location.href='playground.html?algo=${algoKey}'">Try It</button>
        </div>
    `;
  return item;
}

function initCarousel() {
  portfolioData.forEach((data, idx) => {
    carousel.appendChild(createCarouselItem(data, idx));
    const ind = document.createElement("div");
    ind.className = "indicator";
    if (idx === 0) ind.classList.add("active");
    ind.dataset.index = idx;
    ind.addEventListener("click", () => goToSlide(idx));
    indicatorsContainer.appendChild(ind);
  });
  updateCarousel();
}

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");
  const total = items.length;
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;
  let spacing1 = isMobile ? 280 : isTablet ? 340 : 400;
  let spacing2 = isMobile ? 420 : isTablet ? 520 : 600;
  let spacing3 = isMobile ? 550 : isTablet ? 650 : 750;
  items.forEach((item, idx) => {
    let offset = idx - currentIndex;
    if (offset > total / 2) offset -= total;
    else if (offset < -total / 2) offset += total;
    const abs = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;
    if (abs === 0) {
      item.style.transform = "translate(-50%, -50%) translateZ(0) scale(1)";
      item.style.opacity = "1";
      item.style.zIndex = "10";
    } else if (abs === 1) {
      item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing1}px) translateZ(-200px) rotateY(${-sign * (isMobile ? 25 : 30)}deg) scale(${isMobile ? 0.88 : 0.85})`;
      item.style.opacity = "0.8";
      item.style.zIndex = "5";
    } else if (abs === 2) {
      item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing2}px) translateZ(-350px) rotateY(${-sign * (isMobile ? 35 : 40)}deg) scale(${isMobile ? 0.75 : 0.7})`;
      item.style.opacity = "0.5";
      item.style.zIndex = "3";
    } else if (abs === 3) {
      item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing3}px) translateZ(-450px) rotateY(${-sign * (isMobile ? 40 : 45)}deg) scale(${isMobile ? 0.65 : 0.6})`;
      item.style.opacity = "0.3";
      item.style.zIndex = "2";
    } else {
      item.style.transform =
        "translate(-50%, -50%) translateZ(-500px) scale(0.5)";
      item.style.opacity = "0";
      item.style.zIndex = "1";
    }
  });
  indicators.forEach((ind, idx) =>
    ind.classList.toggle("active", idx === currentIndex),
  );
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % portfolioData.length;
  updateCarousel();
}
function prevSlide() {
  currentIndex =
    (currentIndex - 1 + portfolioData.length) % portfolioData.length;
  updateCarousel();
}
function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function initSkillsGrid() {
  const grid = document.getElementById("skillsGrid");
  const tabs = document.querySelectorAll(".category-tab");
  function display(cat = "all") {
    grid.innerHTML = "";
    const filtered =
      cat === "all" ? skillsData : skillsData.filter((s) => s.category === cat);
    filtered.forEach((skill, i) => {
      const hex = document.createElement("div");
      hex.className = "skill-hexagon";
      hex.style.animationDelay = `${i * 0.1}s`;
      const score = calculateScore(
        skill.security,
        skill.complexity,
        skill.practicality,
      );
      const width = score * 10;
      hex.innerHTML = `
                <div class="hexagon-inner"><div class="hexagon-content">
                    <div class="skill-icon-hex">${skill.icon}</div>
                    <div class="skill-name-hex">${skill.name}</div>
                    <div class="score">⭐ ${score} / 10</div>
                    <div class="score-bar"><div class="score-fill" style="width: ${width}%"></div></div>
                </div></div>
            `;
      grid.appendChild(hex);
    });
  }
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      display(tab.dataset.category);
    });
  });
  display();
}

document.getElementById("nextBtn")?.addEventListener("click", nextSlide);
document.getElementById("prevBtn")?.addEventListener("click", prevSlide);
setInterval(nextSlide, 5000);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});
window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(updateCarousel, 250);
});

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
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - header.offsetHeight,
        behavior: "smooth",
      });
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});
function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop,
      height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${section.id}`)
          link.classList.add("active");
      });
    }
  });
}
window.addEventListener("scroll", updateActiveNav);

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let curr = 0;
  const timer = setInterval(() => {
    curr += step;
    if (curr >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else el.textContent = Math.floor(curr);
  }, 16);
}
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".stat-number").forEach((num) => {
          if (!num.classList.contains("animated")) {
            num.classList.add("animated");
            animateCounter(num);
          }
        });
      }
    });
  },
  { threshold: 0.5 },
);

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader")?.classList.add("hidden");
  }, 1500);
});
window.addEventListener("scroll", () => {
  const parallax = document.querySelector(".hero");
  if (parallax)
    parallax.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
});

window.addEventListener("load", () => {
  const $big = document.querySelector(".cursor__ball--big"),
    $small = document.querySelector(".cursor__ball--small");
  if (!$big || !$small) return;
  const $hover = document.querySelectorAll(
    "a, button, .nav-link, .category-tab, .card-cta, .crypto-btn",
  );
  let scale = 1;
  $hover.forEach((el) => {
    el.addEventListener("mouseenter", () => (scale = 3));
    el.addEventListener("mouseleave", () => (scale = 1));
  });
  document.body.addEventListener("mousemove", (e) => {
    TweenMax.to($big, 0.3, {
      x: e.clientX - 15,
      y: e.clientY - 15,
      scale: scale,
    });
    TweenMax.to($small, 0.1, { x: e.clientX - 5, y: e.clientY - 5 });
  });
});

initCarousel();
initSkillsGrid();
initParticles();

(function () {
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

  const outputGroup = outputDiv.closest(".input-group");
  let keyContainer = document.createElement("div");
  keyContainer.id = "dynamicKeyContainer";
  keyContainer.className = "input-group";
  outputGroup.parentNode.insertBefore(keyContainer, outputGroup);

  let currentShift = 13;
  let currentMode = "encrypt";
  let activeAlgoKey = "caesar-cipher";
  let svg, innerGroup;
  let rotationAngle = 0;
  let drag = false;
  let startMouseAngle = 0;
  let startRotation = 0;

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
  };

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

  algoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      algoButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      activeAlgoKey = this.getAttribute("data-algo");
      const config = CipherRegistry[activeAlgoKey];

      if (config) {
        if (config.showWheel) {
          wheelSection.style.display = "block";
          encryptBox.style.transform = "translateX(0)";
        } else {
          wheelSection.style.display = "none";
          encryptBox.style.transform = "translateX(50%)";
        }

        keyContainer.innerHTML = config.renderKeys();

        const newInputs = keyContainer.querySelectorAll("input");
        newInputs.forEach((inp) => inp.addEventListener("input", updateOutput));
        if (config.postRender) {
          config.postRender();
        }
        updateOutput();
      }
    });
  });

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

  generateWheel();
  svg.addEventListener("mousedown", onDragStart);
  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);
  svg.addEventListener("touchstart", onDragStart, { passive: false });
  window.addEventListener("touchmove", onDragMove, { passive: false });
  window.addEventListener("touchend", onDragEnd);
  shiftSlider.addEventListener("input", (e) =>
    setShiftFromValue(parseInt(e.target.value, 10)),
  );
  randomBtn.addEventListener("click", () =>
    setShiftFromValue(Math.floor(Math.random() * 26)),
  );

  setShiftFromValue(13);
  setMode("encrypt");
})();
