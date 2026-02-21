// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("show"));
}

// Active nav highlighting based on current page
(function setActiveLink(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a[data-page]").forEach(a => {
    if (a.getAttribute("data-page") === path) a.classList.add("active");
  });
})();

// Reveal on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

// Tabs
document.querySelectorAll("[data-tabs]").forEach(tabsRoot => {
  const buttons = tabsRoot.querySelectorAll(".tab-btn");
  const panels = tabsRoot.querySelectorAll("[data-panel]");
  function setTab(id){
    buttons.forEach(b => b.classList.toggle("active", b.dataset.tab === id));
    panels.forEach(p => p.style.display = (p.dataset.panel === id ? "block" : "none"));
  }
  buttons.forEach(b => b.addEventListener("click", () => setTab(b.dataset.tab)));
  if (buttons[0]) setTab(buttons[0].dataset.tab);
});

// Accordion
document.querySelectorAll(".acc-item .acc-head").forEach(head => {
  head.addEventListener("click", () => {
    const item = head.closest(".acc-item");
    item.classList.toggle("open");
  });
});

// Gallery filter + lightbox
const search = document.getElementById("gallerySearch");
const photos = Array.from(document.querySelectorAll(".photo[data-title]"));

function filterGallery(){
  if (!search) return;
  const q = search.value.trim().toLowerCase();
  photos.forEach(p => {
    const t = p.dataset.title.toLowerCase();
    p.style.display = t.includes(q) ? "" : "none";
  });
}
if (search) search.addEventListener("input", filterGallery);

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");

function openModal(src, title){
  if (!modal || !modalImg || !modalTitle) return;
  modalImg.src = src;
  modalTitle.textContent = title;
  modal.classList.add("show");
}

function closeModal(){
  if (!modal) return;
  modal.classList.remove("show");
  if (modalImg) modalImg.src = "";
}

photos.forEach(p => {
  p.addEventListener("click", () => {
    const img = p.querySelector("img");
    openModal(img.getAttribute("src"), p.dataset.title);
  });
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
