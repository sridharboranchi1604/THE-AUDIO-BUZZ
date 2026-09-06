const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .08});

document.querySelectorAll(".service-card,.project-strip>div,.contact-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .7s ease, transform .7s ease";
  observer.observe(el);
});

document.querySelectorAll(".play-demo").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".audio-card");
    const active = card.classList.toggle("active");
    button.querySelector("span").textContent = active ? "Ⅱ" : "▶";
    if (active) {
      document.querySelectorAll(".audio-card.active").forEach(other => {
        if (other !== card) {
          other.classList.remove("active");
          other.querySelector(".play-demo span").textContent = "▶";
        }
      });
    }
  });
});

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const type = document.getElementById("projectType").value;
    const details = document.getElementById("projectDetails").value.trim();

    const message =
      `Hi Virat, I would like to enquire about The Audio Buzz.%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Project: ${encodeURIComponent(type)}%0A` +
      `Details: ${encodeURIComponent(details || "Not provided")}`;

    window.open(`https://wa.me/919619809814?text=${message}`, "_blank", "noopener");
  });
}
