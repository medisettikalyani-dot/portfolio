// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const headerOffset = 72;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset + 4;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav__toggle");
const navList = document.querySelector(".nav__list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("is-open");
    navList.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav when a link is clicked (on mobile)
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("is-open")) {
        navList.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// Simple reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document
  .querySelectorAll(
    ".section__header, .about__grid p, .skills__card, .project, .timeline__item, .contact__form"
  )
  .forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Contact form -> open email draft
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = /** @type {HTMLInputElement | null} */ (
      document.getElementById("name")
    )?.value.trim();
    const email = /** @type {HTMLInputElement | null} */ (
      document.getElementById("email")
    )?.value.trim();
    const message = /** @type {HTMLTextAreaElement | null} */ (
      document.getElementById("message")
    )?.value.trim();

    const toAddress = "kalyanimedisetti997@gmail.com";
    const subject = `Portfolio contact from ${name || "someone"}`;

    const bodyLines = [
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      "",
      "Message:",
      message || "(No message provided)",
    ].filter(Boolean);

    const mailto = `mailto:${encodeURIComponent(
      toAddress
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;

    window.location.href = mailto;
  });
}


