/* =========================================================
   URBAN SHAPERS — interaction
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- LOADER ---------------- */
  const loader = document.getElementById("loader");
  const loaderFill = document.getElementById("loaderFill");
  const loaderCount = document.getElementById("loaderCount");
  document.body.classList.add("is-loading");

  function runLoader() {
    if (reduceMotion) { finishLoad(); return; }
    let p = 0;
    const tick = () => {
      p += Math.random() * 14 + 4;
      if (p >= 100) p = 100;
      loaderFill.style.width = p + "%";
      loaderCount.textContent = Math.floor(p);
      if (p < 100) {
        setTimeout(tick, Math.random() * 160 + 60);
      } else {
        setTimeout(finishLoad, 420);
      }
    };
    tick();
  }

  function finishLoad() {
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
    setTimeout(() => loader && loader.remove(), 1000);
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
      const next = document.documentElement.lang === "en" ? "es" : "en";
      setLang(next);
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
    // stagger siblings within lists/groups
    reveals.forEach((el) => {
      const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
      const i = sibs.indexOf(el);
      if (i > 0) el.dataset.delay = Math.min(i * 70, 350);
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- NAV behavior ---------------- */
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    if (y > lastY && y > 300) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------- CUSTOM CURSOR ---------------- */
  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover)").matches) {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    const render = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    render();
    document.querySelectorAll("a, button, .find__list li, .pill").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ---------------- HERO PARALLAX ---------------- */
  const bike = document.querySelector(".hero__illustration");
  if (bike && !reduceMotion) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        bike.style.transform = `translateY(${y * 0.18}px) rotate(${y * 0.02}deg)`;
      }
    }, { passive: true });
  }

  /* ---------------- YEAR ---------------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------- KICK OFF ---------------- */
  window.addEventListener("load", runLoader);
  // Fallback if load takes too long / already loaded
  if (document.readyState === "complete") runLoader();
  setTimeout(() => { if (document.body.classList.contains("is-loading")) finishLoad(); }, 6000);
})();
