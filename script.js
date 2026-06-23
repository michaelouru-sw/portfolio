document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

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
});
