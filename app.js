/* =====================================================
   1. ПЛАВНЫЙ СКРОЛЛ ПО NAV И КНОПКАМ (БЕЗ БАГОВ)
   ===================================================== */
   document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
  
      // защита: если ссылка просто "#"
      if (!id || id === "#") return;
  
      const target = document.querySelector(id);
      if (!target) return;
  
      e.preventDefault();
  
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
  
  /* =====================================================
     2. АКТИВНЫЙ ПУНКТ NAV ПРИ СКРОЛЛЕ
     ===================================================== */
  const navItems = document.querySelectorAll(".nav-item");
  
  window.addEventListener("scroll", () => {
    let currentSection = "";
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionBottom = sectionTop + section.offsetHeight;
  
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });
  
    navItems.forEach(item => {
      item.classList.remove("active");
  
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });
  });
  
  /* =====================================================
     3. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ NAV КОЛЕСОМ МЫШИ
     ===================================================== */
  const navScroll = document.querySelector(".nav-scroll");
  
  if (navScroll) {
    navScroll.addEventListener(
      "wheel",
      e => {
        // ТОЛЬКО здесь блокируем вертикальный скролл
        e.preventDefault();
        navScroll.scrollLeft += e.deltaY;
      },
      { passive: false }
    );
  }
  
  /* =====================================================
     4. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ АВТОБУСОВ КОЛЕСОМ
     ===================================================== */
     const busScroll = document.querySelector(".bus-scroll");

     if (busScroll) {
       busScroll.addEventListener("wheel", e => {
         if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
           e.preventDefault();
           busScroll.scrollLeft += e.deltaY * 0.8;
         }
       }, { passive: false });
     }
  
  /* =====================================================
     5. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ (FADE UP)
     ===================================================== */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );
  
  document
    .querySelectorAll(".service-card, .route-card, .bus-card, .price-card")
    .forEach(el => {
      el.classList.add("hidden");
      observer.observe(el);
    });
  
  /* =====================================================
     6. КНОПКА «ВВЕРХ» (АККУРАТНО, БЕЗ ЛОМА)
     ===================================================== */
  const scrollTopBtn = document.createElement("div");
  scrollTopBtn.textContent = "↑";
  
  Object.assign(scrollTopBtn.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#6ee7ff",
    color: "#071018",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(110,231,255,0.45)",
    opacity: "0",
    transition: "opacity .25s ease",
    zIndex: "9999"
  });
  
  document.body.appendChild(scrollTopBtn);
  
  window.addEventListener("scroll", () => {
    scrollTopBtn.style.opacity = window.scrollY > 500 ? "1" : "0";
  });
  
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const pills = document.querySelectorAll(".pill");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      current = section.id;
    }
  });

  pills.forEach(pill => {
    pill.classList.remove("active");
    if (pill.getAttribute("href") === "#" + current) {
      pill.classList.add("active");
    }
  });
});