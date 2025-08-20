// =======================
// Loader Screen
// =======================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }
});

// =======================
// Mobile Menu
// =======================
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navLinks = document.querySelectorAll(".navbar__links");
const body = document.body;

if (menu && menuLinks) {
  menu.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");

    // Prevent body scroll when menu is open
    body.style.overflow = menuLinks.classList.contains("active") ? "hidden" : "auto";
  });

  // Close on nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-active");
      menuLinks.classList.remove("active");
      body.style.overflow = "auto";
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuLinks.contains(e.target) && menuLinks.classList.contains("active")) {
      menu.classList.remove("is-active");
      menuLinks.classList.remove("active");
      body.style.overflow = "auto";
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuLinks.classList.contains("active")) {
      menu.classList.remove("is-active");
      menuLinks.classList.remove("active");
      body.style.overflow = "auto";
    }
  });
}

// =======================
// Navbar Scroll Effect
// =======================
let lastScrollY = window.scrollY;
let isScrolling = false;

function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    navbar.style.background = "rgba(19, 19, 19, 0.98)";
    navbar.style.backdropFilter = "blur(20px)";

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
  } else {
    navbar.style.background = "rgba(19, 19, 19, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
    navbar.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
  isScrolling = false;
}

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    requestAnimationFrame(handleNavbarScroll);
    isScrolling = true;
  }
});

// Fade-in Animations
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("visible");
      }, index * 100);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    fadeObserver.observe(el);
  });

  createParticles();
  addButtonLoadingStates();
  enhanceFormHandling();
});

// Particles
function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "particles-container";
  particleContainer.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 1; overflow: hidden;
  `;
  document.body.appendChild(particleContainer);

  for (let i = 0; i < 50; i++) createParticle(particleContainer);
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 20;

  particle.style.cssText = `
    position: absolute; width: ${size}px; height: ${size}px;
    background: rgba(${Math.random() > 0.5 ? "255,129,119" : "33,212,253"}, ${Math.random() * 0.3 + 0.1});
    border-radius: 50%; left: ${Math.random() * 100}%; top: 100%;
    animation: floatUp ${duration}s ${delay}s linear infinite;
  `;

  container.appendChild(particle);

  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
      createParticle(container);
    }
  }, (duration + delay) * 1000);
}

const style = document.createElement("style");
style.textContent = `
  @keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  .particles-container { pointer-events: none; }
`;
document.head.appendChild(style);

// Button Loading States

function addButtonLoadingStates() {
  document.querySelectorAll(".main__btn, .button").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading");
        this.style.pointerEvents = "none";

        const spinner = document.createElement("div");
        spinner.className = "btn-spinner";
        spinner.style.cssText = `
          position: absolute; top: 50%; left: 50%;
          width: 20px; height: 20px; margin: -10px 0 0 -10px;
          border: 2px solid transparent; border-top: 2px solid #fff;
          border-radius: 50%; animation: spin 1s linear infinite;
        `;
        this.appendChild(spinner);

        const btnText = this.querySelector("a") || this;
        btnText.style.opacity = "0";

        setTimeout(() => {
          this.classList.remove("loading");
          this.style.pointerEvents = "auto";
          if (this.contains(spinner)) this.removeChild(spinner);
          btnText.style.opacity = "1";
        }, 1500);
      }
    });
  });
}

// =======================
// Form Handling + Notifications
// =======================
function enhanceFormHandling() {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      form.querySelectorAll("input[required], textarea[required]").forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#ff4444";
          input.classList.add("error");
        } else {
          input.style.borderColor = "";
          input.classList.remove("error");
        }
      });

      form.querySelectorAll('input[type="email"]').forEach((email) => {
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailPattern.test(email.value)) {
          isValid = false;
          email.style.borderColor = "#ff4444";
          email.classList.add("error");
        }
      });

      if (isValid) {
        showNotification("✅ Thank you! Your message has been sent successfully.", "success");
        form.reset();
      } else {
        showNotification("⚠️ Please fill in all required fields correctly.", "error");
      }
    });
  });
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    padding: 1rem 1.5rem; border-radius: 8px;
    color: white; font-weight: 600; z-index: 10000;
    transform: translateX(100%); transition: transform 0.3s ease;
    max-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  switch (type) {
    case "success":
      notification.style.background = "linear-gradient(45deg, #4CAF50, #45a049)";
      break;
    case "error":
      notification.style.background = "linear-gradient(45deg, #f44336, #d32f2f)";
      break;
    default:
      notification.style.background = "linear-gradient(45deg, #2196F3, #1976D2)";
  }

  document.body.appendChild(notification);
  requestAnimationFrame(() => (notification.style.transform = "translateX(0)"));

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// =======================
// Performance Monitoring
// =======================
function performanceMonitoring() {
  window.addEventListener("load", () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    if (loadTime > 3000) console.warn("⚠️ Page load is slow. Consider optimizing resources.");
  });
}
performanceMonitoring();

// =======================
// Preload Resources
// =======================
function preloadResources() {
  ["/tech.html", "/impact.html", "/product.html", "/feedback.html"].forEach((page) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = page;
    document.head.appendChild(link);
  });
}
setTimeout(preloadResources, 2000);
