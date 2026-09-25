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

