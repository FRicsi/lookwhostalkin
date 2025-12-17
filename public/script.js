// =======================
// MANUÁLIS VEZÉRLÉS
// =======================

const MODE = "boy"; // "before" | "girl" | "boy"

// =======================
// DOM BETÖLTÉS UTÁN
// =======================

document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM ELEMEK =====
  const body = document.body;
  const girlImg = document.getElementById("girlImg");
  const boyImg = document.getElementById("boyImg");
  const headline = document.getElementById("headline");

  // ===== BODY CLASS RESET =====
  body.className = "";
  body.classList.add(MODE, "fade-in");

  // =======================
  // MODE LOGIKA
  // =======================
  function confettishower() {
    const duration = 15 * 10000,
      animationEnd = Date.now() + duration;

    let skew = 1;

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    (function frame() {
      const timeLeft = animationEnd - Date.now(),
        ticks = Math.max(200, 500 * (timeLeft / duration));

      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 0.5,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#EE772D", "#AAB05E", "#7EAA8C", "#FCB925", "#fe9addff"],
        shapes: ["star"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.5, 4),
        drift: randomInRange(-1, 1),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  }


  if (MODE === "before") {
    girlImg.src = girlImg.dataset.normal;
    boyImg.src = boyImg.dataset.normal;

    headline.innerHTML = `
      Hamarosan kiderül,<br>
      <span class="girl-word">kislány</span> leszek-e vagy
      <span class="boy-word">kisfiú</span>!
    `;
    confettishower();
  }

  if (MODE === "girl") {
    girlImg.src = girlImg.dataset.happy;
    boyImg.src = girlImg.dataset.mirror;

    headline.textContent = "Kislány leszek!";
    confettishower();
  }

  if (MODE === "boy") {
    girlImg.src = boyImg.dataset.happy;
    boyImg.src = boyImg.dataset.mirror;

    headline.textContent = "Kisfiú leszek!";
    confettishower();
  }
});

// =======================
// LÁNY KONFETTI
// =======================

if (MODE === "girl") {
  const defaults = {
    spread: 360,
    ticks: 500,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 60,
    //confetti.shapeFromText(),
    shapes: ["star"],
    colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#c2185b"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 100,
      scalar: 6,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 250,
      scalar: 4,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 600,
      scalar: 1,
      shapes: ["star"],
    });
  }

  // kis késleltetés, hogy biztosan látható legyen
  setTimeout(shoot, 500);
  setTimeout(shoot, 2000);
  setTimeout(shoot, 3500);
}
// =======================
// FIÚ KONFETTI
// =======================

if (MODE === "boy") {
  const defaults = {
    spread: 360,
    ticks: 500,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 60,
    shapes: ["star"],
    colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#1565c0"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 100,
      scalar: 6,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 250,
      scalar: 4,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 600,
      scalar: 1,
      shapes: ["star"],
    });
  }

  // kis késleltetés, hogy biztosan látható legyen
  setTimeout(shoot, 500);
  setTimeout(shoot, 2000);
  setTimeout(shoot, 3500);
}

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
