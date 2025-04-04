/**
 * PORTFOLIO WEBSITE - FINAL JAVASCRIPT
 */
document.addEventListener("DOMContentLoaded", function () {
  // Set copyright year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile navigation
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("fa-times");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Typing animation
  const dynamicText = document.getElementById("dynamic-text");
  if (dynamicText) {
    const phrases = [
      "design bold visuals.",
      "code dynamic websites.",
      "automate workflows.",
      "automate workflows.",
      "automate workflows.",
    ];
    let i = 0,
      j = 0,
      isDeleting = false;

    function type() {
      const currentPhrase = phrases[i];
      if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, j--);
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % phrases.length;
        }
        setTimeout(type, 50);
      } else {
        dynamicText.textContent = currentPhrase.substring(0, j++);
        if (j > currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, 1500);
        } else {
          setTimeout(type, 100);
        }
      }
    }
    type();
  }

  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress-bar");
  function animateBars() {
    progressBars.forEach((bar) => {
      const fill = bar.querySelector(".progress-fill");
      const percent = bar.getAttribute("data-percent");
      if (isInViewport(bar) && !bar.dataset.animated) {
        fill.style.width = percent;
        bar.dataset.animated = "true";
      }
    });
  }
  window.addEventListener("scroll", animateBars);
  animateBars();

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        submitBtn.textContent = response.ok ? "Message Sent!" : "Error!";
        if (response.ok) contactForm.reset();
      } catch (error) {
        submitBtn.textContent = "Network Error";
        console.error(error);
      } finally {
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
});

// Polyfill for older browsers
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
