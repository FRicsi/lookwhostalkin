// =======================
// MANUÁLIS VEZÉRLÉS
// =======================

const MODE = "boy"; // "before" | "girl" | "boy"

// =======================
// DOM BETÖLTÉS UTÁN
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // alap elemek
  const girlImg = document.getElementById("girlImg");
  const boyImg = document.getElementById("boyImg");
  const headline = document.getElementById("headline");

  // biztos, ami biztos
  if (!girlImg || !boyImg || !headline) {
    console.error("Hiányzó DOM elem (girlImg / boyImg / headline)");
    return;
  }

  // classok törlése
  /*body.classList.remove("before", "girl", "boy");
  body.classList.add(MODE);*/

  function switchMode(mode) {
    body.classList.remove("before", "girl", "boy");
    body.classList.remove("fade-in", "fade-out");

    body.classList.add(mode);
    body.classList.add("fade-in");

    applyModeContent(mode);
  }

  // tükrözés reset
  girlImg.classList.remove("mirror");
  boyImg.classList.remove("mirror");

  // ===== MODE LOGIKA =====

  if (MODE === "before") {
    girlImg.src = girlImg.dataset.normal;
    boyImg.src = boyImg.dataset.normal;

    girlImg.classList.remove("mirror");
    boyImg.classList.remove("mirror");

    boyImg.classList.add("mirror");

    headline.innerHTML = `
      Hamarosan kiderül,<br>
      <span class="girl-word">kislány</span> leszek-e vagy
      <span class="boy-word">kisfiú</span>!
    `;
  }

  if (MODE === "girl") {
    girlImg.src = girlImg.dataset.happy;
    boyImg.src = girlImg.dataset.happy;
    girlImg.classList.remove("mirror");
    boyImg.classList.remove("mirror");

    boyImg.classList.add("mirror");

    headline.textContent = "Kislány leszek!";
  }

  if (MODE === "boy") {
    girlImg.src = boyImg.dataset.happy;
    boyImg.src = boyImg.dataset.happy;
    girlImg.classList.remove("mirror");
    boyImg.classList.remove("mirror");

    boyImg.classList.add("mirror");
    headline.textContent = "Kisfiú leszek!";
  }

  // =======================
  // KONFETTI EFFEKT
  // =======================

  // teszteléshez
  function testConfetti() {
    const layer = document.getElementById("confettiLayer");
    if (!layer) {
      console.error("confettiLayer nem található");
      return;
    }

    const c = document.createElement("div");
    c.style.position = "absolute";
    c.style.left = "50%";
    c.style.top = "50%";
    c.style.width = "12px";
    c.style.height = "12px";
    c.style.background = "red";
    c.style.borderRadius = "50%";

    layer.appendChild(c);
  }
  // teszteléshez vége

  /*function launchConfetti(side) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // színek
    const colorsGirl = ["#ff7eb9", "#ffc1dc", "#ff9acb"];
    const colorsBoy = ["#4da3ff", "#9fd3ff", "#6bbcff"];

    const colors = document.body.classList.contains("girl")
      ? colorsGirl
      : colorsBoy;

    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    // indulási pozíció
    confetti.style.bottom = "0px";
    confetti.style.left = side === "left" ? "20px" : "calc(100% - 20px)";

    // röppálya (CSS változók)
    const x =
      side === "left"
        ? Math.random() * 200 + 100
        : -(Math.random() * 200 + 100);

    const y = -(Math.random() * 300 + 300);

    confetti.style.setProperty("--x", `${x}px`);
    confetti.style.setProperty("--y", `${y}px`);

    const layer = document.getElementById("confettiLayer");
    layer.appendChild(confetti);

    setTimeout(() => confetti.remove(), 350000);
  }

  if (
    document.body.classList.contains("girl") ||
    document.body.classList.contains("boy")
  ) {
    setInterval(() => {
      for (let i = 0; i < 6; i++) {
        launchConfetti("left");
        launchConfetti("right");
      }
    }, 200);
  }*/

  // teszt-konfetti indítása
  document.addEventListener("DOMContentLoaded", testConfetti);
  if (
    document.body.classList.contains("girl") ||
    document.body.classList.contains("boy")
  ) {
    setInterval(() => {
      testConfetti("left");
      testConfetti("right");
    }, 200);
  }
  // teszt-konfetti vége
});

// =======================
// FADE-ES VÁLTÁS
// =======================

function switchMode(mode) {
  // kifakulás
  body.classList.add(mode, "fade-out");

  setTimeout(() => {
    // class reset (fade kivételével)
    body.className = "";
    body.classList.add(mode, "fade-in");

    // tartalom frissítés
    applyContent(mode);
  }, 800); // egyezzen a CSS transition idővel
}

// =======================
// INDULÁS
// =======================
const body = document.body;

body.classList.add(MODE, "fade-in");
/*applyContent(MODE); /*hibára fut: not defined
switchMode(MODE);*/

// =======================
// TOY BANNER – FOLYAMATOS SPRITE GENERÁTOR
// =======================

if (MODE === "before") {
  const bannerTop = document.querySelector(".toy-banner.top");
  const bannerBottom = document.querySelector(".toy-banner.bottom");

  /*if (!bannerTop || !bannerBottom) {
    console.error("toy-banner nem található");
  return;
  }*/

  const TOY_COUNT = 10; // toy1.png ... toy10.png
  const SPAWN_OFFSET_VW = 10; // képernyőn kívül
  const SPEED_VW_PER_SEC = 8; // mozgási sebesség
  const INTENSITY = 1; // sprite / másodperc / banner

  function spawnToy(banner, direction) {
    const toy = document.createElement("img");
    const index = Math.floor(Math.random() * TOY_COUNT) + 1;

    toy.src = `images/toy${index}.png`;
    toy.className = "toy";

    // indulási pozíció
    toy.style.left =
      direction === 1
        ? `-${SPAWN_OFFSET_VW}vw`
        : `calc(100% + ${SPAWN_OFFSET_VW}vw)`;

    const speedJitter = 0.85 + Math.random() * 0.3; // ±15%
    const durationSec =
      ((110 + SPAWN_OFFSET_VW * 2) / SPEED_VW_PER_SEC) * speedJitter;

    toy.style.animation = `toy-move ${durationSec}s linear forwards`;
    // lebegési fázis
    /*const floatDuration = 3 + Math.random() * 3;
    const floatDelay = Math.random() * 2;

    toy.style.animation = `
      toy-move ${100 / SPEED_VW_PER_SEC}s linear infinite,
      toy-float ${floatDuration}s ease-in-out infinite
    `;
    toy.style.animationDelay = `0s, ${floatDelay}s`;*/

    banner.appendChild(toy);
    const travelPx =
      window.innerWidth * (1 + (SPAWN_OFFSET_VW * 2) / 100) + toy.offsetWidth;

    toy.style.setProperty(
      "--distance",
      direction === 1 ? `${travelPx}px` : `-${travelPx}px`
    );

    // ===== LIFESPAN SZÁMÍTÁS =====
    /*const totalDistanceVW = 200 + SPAWN_OFFSET_VW * 2;*/
    /*const lifetimeMs = (totalDistanceVW / SPEED_VW_PER_SEC) * 300000;*/

    setTimeout(() => toy.remove(), durationSec * 1000 + 1000);
  }

  // ===== FOLYAMATOS SPAWN =====
  setInterval(() => {
    for (let i = 0; i < INTENSITY; i++) {
      spawnToy(bannerTop, 1); // bal → jobb
      spawnToy(bannerBottom, -1); // jobb → bal
      // 🔑 kis véletlen elcsúszás
      const nextIn = 900 + Math.random() * 400; // 900–1300 ms
      setTimeout(scheduleSpawn, nextIn);
    }
  }, 1000);
}

console.log("BODY CLASSES:", document.body.className);
