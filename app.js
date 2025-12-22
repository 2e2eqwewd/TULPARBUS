/* =====================================================
   TULPAR — APP.JS (clean + pro)
   - Smooth scroll
   - Active pill on scroll
   - Wheel horizontal scroll (pill-nav + buses)
   - Reveal animations
   - Scroll to top button
   - Bus background parallax
   - Bus-scroll sync while scrolling (between #buses and #routes)
   ===================================================== */

   (() => {
    "use strict";
  
    // ---------- HELPERS ----------
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  
    // ---------- 1) SMOOTH SCROLL ----------
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
  
        const target = $(id);
        if (!target) return;
  
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  
    // ---------- 2) ACTIVE PILL ON SCROLL ----------
    const pills = $$(".pill");
    const sections = $$("section[id]");
  
    function setActivePill() {
      if (!pills.length || !sections.length) return;
  
      const y = window.scrollY + 140; // offset for sticky header
      let current = sections[0]?.id || "";
  
      for (const section of sections) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (y >= top && y < bottom) {
          current = section.id;
          break;
        }
      }
  
      pills.forEach(p => {
        p.classList.toggle("active", p.getAttribute("href") === `#${current}`);
      });
    }
  
    // ---------- 3) HORIZONTAL WHEEL SCROLL (PILL NAV) ----------
    const pillNav = $(".pill-nav");
    if (pillNav) {
      pillNav.addEventListener(
        "wheel",
        e => {
          // if vertical scroll stronger -> convert to horizontal
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            pillNav.scrollLeft += e.deltaY;
          }
        },
        { passive: false }
      );
    }
  
    // ---------- 4) HORIZONTAL WHEEL SCROLL (BUS SCROLL) ----------
    const busScroll = $(".bus-scroll");
    if (busScroll) {
      busScroll.addEventListener(
        "wheel",
        e => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            busScroll.scrollLeft += e.deltaY * 0.9;
          }
        },
        { passive: false }
      );
    }
  
    // ---------- 5) REVEAL ANIMATION (IntersectionObserver) ----------
    const revealEls = $$(".service-card, .route-card, .bus-card, .price-card");
  
    if (revealEls.length) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
          });
        },
        { threshold: 0.15 }
      );
  
      revealEls.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
      });
    }
  
    // ---------- 6) SCROLL TO TOP BUTTON ----------
    const topBtn = document.createElement("button");
    topBtn.type = "button";
    topBtn.className = "scroll-top-btn";
    topBtn.textContent = "↑";
    topBtn.setAttribute("aria-label", "Наверх");
    document.body.appendChild(topBtn);
  
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // ---------- 7) PARALLAX BUS BACKGROUND + BUS SCROLL SYNC ----------
    const busBg = $(".bus-bg");
    const busesSection = $("#buses");
    const routesSection = $("#routes");
  
    // Throttle scroll via rAF (no lag)
    let ticking = false;
  
    function onScrollFrame() {
      ticking = false;
  
      // update active pill
      setActivePill();
  
      // show/hide top button
      if (window.scrollY > 500) topBtn.classList.add("visible");
      else topBtn.classList.remove("visible");
  
      // parallax background
      if (busBg) {
        const y = window.scrollY;
        busBg.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      }
  
      // sync bus-scroll only on desktop (optional)
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;
  
      if (busScroll && busesSection && routesSection) {
        const y = window.scrollY;
        const start = busesSection.offsetTop - 120;
        const end = routesSection.offsetTop - 120;
  
        if (y >= start && y <= end) {
          const progress = (y - start) * 1.25; // speed
          // clamp so it doesn't go crazy
          const max = busScroll.scrollWidth - busScroll.clientWidth;
          busScroll.scrollLeft = Math.max(0, Math.min(progress, max));
        }
      }
    }
  
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScrollFrame);
      }
    });
  
    window.addEventListener("resize", () => {
      // refresh active pill on resize too
      setActivePill();
    });
  
    // first run
    setActivePill();
    onScrollFrame();
  })();
