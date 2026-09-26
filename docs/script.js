// Set these values to make the portfolio links yours. The site works without a build step.
const portfolio = {
  name: "Badr Choudhary",
  role: "Software Engineer",
  github: "https://github.com/badrc15",
  linkedin: "https://www.linkedin.com/in/badr-choudhary/",
  repositories: {
    blinkr: "https://github.com/badrc15/BlinkrFrontEnd",
    "blinkr-api": "https://github.com/badrc15/Blinkr-API",
    "crypto-dashboard": "https://github.com/badrc15/Crypto-Dashboard",
    "bjj-matrank": "https://github.com/badrc15/mat-rank-app/tree/main/bjj-elo-app",
    pitwall: "https://github.com/badrc15/pitwall",
  },
};

document.querySelectorAll("[data-name]").forEach((element) => {
  element.textContent = portfolio.name;
});
document.querySelectorAll("[data-role]").forEach((element) => {
  element.textContent = portfolio.role;
});
document.querySelectorAll("[data-repo]").forEach((link) => {
  const repository = portfolio.repositories[link.dataset.repo];
  if (repository) link.href = repository;
});
document.querySelectorAll("[data-social]").forEach((link) => {
  const url = portfolio[link.dataset.social];
  if (url) link.href = url;
});
document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".desktop-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("open", !expanded);
});
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("open");
  });
});


const projectCards = [...document.querySelectorAll(".project-card")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (projectCards.length && "IntersectionObserver" in window) {
  if (!prefersReducedMotion) document.documentElement.classList.add("motion-ready");

  const inView = new Set();
  const updateHighlightedCard = () => {
    const center = window.innerHeight / 2;
    const candidates = [...inView];
    candidates.sort((left, right) => {
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      const leftDistance = Math.abs(leftRect.top + leftRect.height / 2 - center);
      const rightDistance = Math.abs(rightRect.top + rightRect.height / 2 - center);
      return leftDistance - rightDistance;
    });

    projectCards.forEach((card) => {
      card.classList.toggle("is-current", card === candidates[0]);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        inView.add(entry.target);
        entry.target.classList.add("is-visible");
      } else {
        inView.delete(entry.target);
      }
    });
    updateHighlightedCard();
  }, {
    rootMargin: "-12% 0px -28% 0px",
    threshold: [0, 0.15, 0.4, 0.7],
  });

  projectCards.forEach((card) => observer.observe(card));

  let scrollFrame = 0;
  const scheduleHighlightUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      updateHighlightedCard();
    });
  };
  window.addEventListener("scroll", scheduleHighlightUpdate, { passive: true });
  window.addEventListener("resize", scheduleHighlightUpdate);
}
