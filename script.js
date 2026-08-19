/* =========================================================
   Syed Hassan Dildar — Portfolio Clone · interactions
   ========================================================= */
gsap.registerPlugin(ScrollTrigger);

/* ---------- Loading screen ---------- */
const loadingScreen = document.getElementById("loadingScreen");
const loadingWrap = document.getElementById("loadingWrap");
const loadingButton = document.getElementById("loadingButton");
const loadingPercent = document.getElementById("loadingPercent");
const loadingMarquee = document.getElementById("loadingMarquee");
const loaderGame = document.getElementById("loaderGame");
const main = document.getElementById("main");
const header = document.getElementById("header");

/* mini loader "game" bars */
for (let i = 0; i < 20; i++) {
  const bar = document.createElement("i");
  loaderGame.appendChild(bar);
}

/* marquee content */
const marqueeWords = ["Regional Operations", "Community Growth", "Asia Market Expansion", "Digital Ecosystem Leader"];
const mqIn = document.createElement("div");
mqIn.className = "mq-in";
mqIn.innerHTML = (marqueeWords.map(w => `<span>${w}</span>`).join("")).repeat(4);
loadingMarquee.appendChild(mqIn);

/* fake progressive load counter */
let progress = 0;
const progressTimer = setInterval(() => {
  progress += Math.floor(Math.random() * 12) + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(progressTimer);
    loadingScreen.classList.add("loading-complete");
    loadingWrap.classList.add("loading-complete");
    loadingButton.classList.add("loading-complete");
  }
  loadingPercent.textContent = `Loading ${progress}%`;
}, 120);

/* hover glow follows mouse inside the pill */
loadingWrap.addEventListener("mousemove", (e) => {
  const r = loadingWrap.getBoundingClientRect();
  loadingWrap.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
  loadingWrap.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
});

/* click -> expand + enter site */
let entered = false;
function enterSite() {
  if (entered || progress < 100) return;
  entered = true;
  loadingWrap.classList.add("loading-clicked");
  loadingMarquee.classList.add("show");
  setTimeout(() => {
    loadingScreen.classList.add("loading-out");
    main.classList.add("main-active");
    header.classList.add("show");
    document.querySelector(".nav-fade").classList.add("show");
    document.querySelector(".icons-section").classList.add("show");
    landingIntroFX();
    setTimeout(() => loadingScreen.remove(), 1500);
  }, 900);
}
loadingButton.addEventListener("click", enterSite);

/* ---------- Custom cursor ---------- */
const cursor = document.getElementById("cursor");
let cx = -100, cy = -100, tx = -100, ty = -100;
window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
(function moveCursor() {
  cx += (tx - cx) * 0.16;
  cy += (ty - cy) * 0.16;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(moveCursor);
})();

/* ---------- Landing intro reveal ---------- */
function landingIntroFX() {
  gsap.to(".reveal-line > span", {
    y: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.35,
  });
}

/* ---------- Web Dev / App Dev swap ---------- */
const swapWord = document.getElementById("swapWord");
const swapMirror = document.getElementById("swapMirror");
const swaps = ["Operations", "Growth", "Expansion"];
let swapIdx = 0;
setInterval(() => {
  swapIdx = (swapIdx + 1) % swaps.length;
  const tl = gsap.timeline();
  tl.to([swapWord, swapMirror], { yPercent: -110, opacity: 0, duration: 0.45, ease: "power2.in" })
    .add(() => { swapWord.textContent = swaps[swapIdx]; swapMirror.textContent = swaps[swapIdx]; })
    .fromTo([swapWord, swapMirror], { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
}, 3000);

/* ---------- Character subtle tilt ---------- */
const characterImg = document.getElementById("characterImg");
window.addEventListener("mousemove", (e) => {
  const dx = (e.clientX / window.innerWidth - 0.5);
  const dy = (e.clientY / window.innerHeight - 0.5);
  gsap.to(characterImg, { rotationY: dx * 7, rotationX: -dy * 3, x: dx * 14, duration: 0.8, ease: "power2.out", transformPerspective: 900 });
});

/* ---------- About: word-by-word reveal ---------- */
document.querySelectorAll(".about-para").forEach(p => {
  p.innerHTML = p.textContent.trim().split(/\s+/)
    .map(w => `<span class="w">${w}</span>`).join(" ");
});
gsap.set(".about-para .w", { opacity: 0.12 });
gsap.to(".about-para .w", {
  opacity: 1, stagger: 0.02, ease: "none",
  scrollTrigger: { trigger: ".about-section", start: "top 70%", end: "bottom 55%", scrub: true },
});
gsap.from(".about-roles h4", {
  x: -30, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
  scrollTrigger: { trigger: ".about-me", start: "top 78%" },
});

/* ---------- What I Do: tap support for touch ---------- */
document.querySelectorAll("[data-what]").forEach(el => {
  el.addEventListener("click", () => {
    document.querySelectorAll("[data-what]").forEach(o => o.classList.remove("what-content-active"));
    el.classList.add("what-content-active");
  });
});

/* ---------- Education timeline growth ---------- */
gsap.to("#careerTimeline", {
  maxHeight: "100%", ease: "none",
  scrollTrigger: { trigger: ".career-info", start: "top 80%", end: "bottom 55%", scrub: 1 },
});
gsap.utils.toArray(".career-info-box").forEach((box) => {
  gsap.from(box, {
    y: 60, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: box, start: "top 85%" },
  });
});
gsap.from(".career-section h2", {
  y: 50, opacity: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".career-section", start: "top 75%" },
});

/* ---------- Featured Gallery ---------- */
const projects = [
  { title: "India", cat: "Regional Operations & Market Development",
    tools: ["Community Dynamics", "Localization", "Agency Structures", "User Acquisition"], accent: "#fb923c",
    img: "assets/market-india.jpg", link: "https://wa.me/447598921178" },
  { title: "Pakistan", cat: "Multi-Country Community Operations",
    tools: ["Regional Teams", "Merchant Operations", "Coin Seller Networks", "Community Growth"], accent: "#34d399",
    img: "assets/market-pakistan.jpg", link: "https://wa.me/447598921178" },
  { title: "Bangladesh", cat: "Market Expansion & User Engagement",
    tools: ["Market Expansion", "Broadcaster Recruitment", "Campaigns", "Engagement Events"], accent: "#5eead4",
    img: "assets/market-bangladesh.jpg", link: "https://wa.me/447598921178" },
  { title: "Nepal", cat: "Community Ecosystems & Partner Networks",
    tools: ["Community Operations", "Partner Networks", "Moderation", "Retention"], accent: "#a78bfa",
    img: "assets/market-nepal.jpg", link: "https://wa.me/447598921178" },
];

const grid = document.getElementById("galleryGrid");
projects.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.style.setProperty("--card-accent", p.accent);
  card.style.setProperty("--delay", `${(i % 2) * 0.1}s`);
  card.innerHTML = `
    <div class="gallery-card-glow"></div>
    <div class="gallery-card-number">${String(i + 1).padStart(2, "0")}</div>
    <div class="gallery-card-image">
      <img src="${p.img}" alt="${p.title}" loading="lazy"
           onerror="this.parentElement.style.background='linear-gradient(145deg,#0d1220,${p.accent}22)';this.remove();" />
      <div class="gallery-card-image-overlay"></div>
    </div>
    <div class="gallery-card-content">
      <h3 class="gallery-card-title">${p.title}</h3>
      <p class="gallery-card-category">${p.cat}</p>
      <div class="gallery-card-tools">${p.tools.map(t => `<span class="gallery-tool-pill">${t}</span>`).join("")}</div>
      <a class="gallery-card-link" href="${p.link}" target="_blank" rel="noopener"><span>Connect ↗</span></a>
    </div>
    <div class="gallery-card-accent-line"></div>`;
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  });
  grid.appendChild(card);
});

/* reveal cards on scroll */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("gallery-card--visible"); cardObserver.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".gallery-card").forEach(c => cardObserver.observe(c));

/* animated project counter */
const counterEl = document.getElementById("workCounter");
ScrollTrigger.create({
  trigger: ".work-counter", start: "top 85%", once: true,
  onEnter: () => {
    const obj = { n: 0 };
    gsap.to(obj, { n: 4, duration: 1.4, ease: "power2.out", onUpdate: () => counterEl.textContent = Math.round(obj.n) });
  },
});

/* work header reveal */
gsap.from(".work-header > *", {
  y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".work-header", start: "top 80%" },
});

/* ---------- Techstack marquees ---------- */
const techRows = [
  [["Regional Operations", "#5eead4"], ["Community Growth", "#34d399"], ["Agency Ecosystems", "#a78bfa"], ["Market Expansion", "#fb923c"], ["Digital Platforms", "#38bdf8"], ["Business Development", "#fbbf24"], ["Monetization", "#f472b6"], ["Team Leadership", "#c084fc"]],
  [["User Acquisition & Retention", "#5eead4"], ["Platform Scaling", "#38bdf8"], ["Merchant & Coin Seller Operations", "#fbbf24"], ["Cross-Border Team Management", "#34d399"], ["Localization", "#fb923c"], ["Community Engagement", "#a78bfa"], ["Operational Optimization", "#f472b6"]],
  [["India", "#fb923c"], ["Pakistan", "#34d399"], ["Bangladesh", "#5eead4"], ["Nepal", "#a78bfa"], ["Urdu — Native", "#fbbf24"], ["Hindi — Fluent", "#38bdf8"], ["English — Professional", "#f472b6"]],
];
techRows.forEach((row, i) => {
  const track = document.getElementById(`techTrack${i + 1}`);
  const pills = row.map(([name, dot]) => `<span class="tech-pill" style="--dot:${dot}"><i></i>${name}</span>`).join("");
  track.innerHTML = pills + pills; // duplicate for seamless loop
});
gsap.from(".techstack h2", {
  y: 60, opacity: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".techstack", start: "top 70%" },
});

/* ---------- Contact reveal ---------- */
gsap.from(".contact-flex .contact-box", {
  y: 50, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".contact-section", start: "top 75%" },
});
gsap.from(".footer-big", {
  y: 40, opacity: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".footer-end", start: "top 90%" },
});

/* ---------- Smooth anchor scrolling ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
  });
});
