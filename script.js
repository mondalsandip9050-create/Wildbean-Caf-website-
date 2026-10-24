// Navbar: solid background after scrolling
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById("burger");
burger.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-mobile a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

// Menu tabs
const tabs = document.querySelectorAll(".menu-tabs .tab");
const panels = document.querySelectorAll(".menu-panel");
tabs.forEach((t) =>
  t.addEventListener("click", () => {
    tabs.forEach((x) => x.classList.remove("active"));
    panels.forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    document.querySelector('[data-panel="' + t.dataset.cat + '"]').classList.add("active");
  })
);

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
document.querySelectorAll(".g-item").forEach((b) =>
  b.addEventListener("click", () => {
    lightboxImg.src = b.dataset.src;
    lightbox.classList.add("show");
  })
);
lightbox.addEventListener("click", () => lightbox.classList.remove("show"));

// Reviews carousel
const reviews = [
  { name: "Customer name", text: "Add a genuine customer review here." },
  { name: "Customer name", text: "Add a second genuine customer review here." },
];
let ri = 0;
const reviewText = document.getElementById("review-text");
const reviewName = document.getElementById("review-name");
function showReview() {
  reviewText.textContent = "\u201C" + reviews[ri].text + "\u201D";
  reviewName.textContent = "\u2014 " + reviews[ri].name;
}
document.getElementById("review-prev").addEventListener("click", () => {
  ri = (ri - 1 + reviews.length) % reviews.length; showReview();
});
document.getElementById("review-next").addEventListener("click", () => {
  ri = (ri + 1) % reviews.length; showReview();
});

// Reserve form → WhatsApp
document.getElementById("reserve-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const msg =
    "Table reservation request%0AName: " + encodeURIComponent(f.name.value) +
    "%0APhone: " + encodeURIComponent(f.phone.value) +
    "%0ADate: " + encodeURIComponent(f.date.value) +
    "%0ATime: " + encodeURIComponent(f.time.value) +
    "%0AGuests: " + encodeURIComponent(f.guests.value) +
    "%0ARequest: " + encodeURIComponent(f.note.value || "-");
  window.open("https://wa.me/916291434742?text=" + msg, "_blank");
  document.getElementById("form-note").style.display = "block";
});

// Reveal on scroll
const io = new IntersectionObserver(
  (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
