document.addEventListener("DOMContentLoaded", () => {

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  // Project filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const tags = card.dataset.tools || "";
        card.style.display = filter === "all" || tags.includes(filter) ? "" : "none";
      });
    });
  });

  // Scroll progress bar
  const progressBar = document.getElementById("scrollProgress");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
    }, { passive: true });
  }

  // Back to top button
  const backTop = document.getElementById("backTop");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Scroll fade-in (IntersectionObserver)
  const fadeEls = document.querySelectorAll(".fade-in-up");
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach((el) => observer.observe(el));
  }

  // Count-up animation on stat numbers
  const statNums = document.querySelectorAll(".stat-card .num[data-count]");
  if (statNums.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const isDecimal = target % 1 !== 0;
        const duration = 1400;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNums.forEach((el) => countObserver.observe(el));
  }

  // Active nav link highlighting on scroll
  const sections = document.querySelectorAll("section[id], .cta-section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => navObserver.observe(s));
  }

});
