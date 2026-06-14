/* =========================================================
   URBAN SHAPERS — interaction
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- LOADER ---------------- */
  const loader = document.getElementById("loader");
  const loaderCount = document.getElementById("loaderCount");
  document.body.classList.add("is-loading");

  function runLoader() {
    if (reduceMotion) { finishLoad(); return; }
    let p = 0;
    const tick = () => {
      p += Math.random() * 16 + 5;
      if (p >= 100) p = 100;
      if (loaderCount) loaderCount.textContent = Math.floor(p);
      if (p < 100) setTimeout(tick, Math.random() * 130 + 50);
      else setTimeout(finishLoad, 450);
    };
    tick();
  }

  function finishLoad() {
    if (!loader) return;
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
    setTimeout(() => loader && loader.remove(), 900);
  }

  /* ---------------- LANGUAGE TOGGLE ---------------- */
  const langToggle = document.getElementById("langToggle");
  const opts = langToggle ? langToggle.querySelectorAll(".lang-toggle__opt") : [];

  function setLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-en]").forEach((el) => {
      const val = el.getAttribute("data-" + lang);
      if (val != null) el.innerHTML = val;
    });
    opts.forEach((o) => o.classList.toggle("is-active", o.dataset.lang === lang));
    try { localStorage.setItem("us-lang", lang); } catch (e) {}
  }

  if (langToggle) {
    let stored = "en";
    try { stored = localStorage.getItem("us-lang") || (navigator.language || "en").slice(0, 2); } catch (e) {}
    if (stored !== "es") stored = "en";
    setLang(stored);
    langToggle.addEventListener("click", () => {
      setLang(document.documentElement.lang === "en" ? "es" : "en");
    });
  }

  /* ---------------- REVEAL ON SCROLL ---------------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + "ms";
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => {
      const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
      const i = sibs.indexOf(el);
      if (i > 0) el.dataset.delay = Math.min(i * 70, 420);
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- NAV hide on scroll down ---------------- */
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (nav) {
      if (y > lastY && y > 400) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
    }
    lastY = y;
  }, { passive: true });

  /* ---------------- YEAR ---------------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------- KICK OFF ---------------- */
  window.addEventListener("load", runLoader);
  if (document.readyState === "complete") runLoader();
  setTimeout(() => { if (document.body.classList.contains("is-loading")) finishLoad(); }, 6000);
})();
