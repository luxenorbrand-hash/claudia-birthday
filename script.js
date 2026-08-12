const gate = document.getElementById("gate");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const gateError = document.getElementById("gateError");
const loader = document.getElementById("loader");
const enterBtn = document.getElementById("enterBtn");
const giftBox = document.getElementById("giftBox");
const finalSection = document.getElementById("final");
const replayBtn = document.getElementById("replayBtn");
const modal = document.getElementById("messageModal");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

const PASSWORD = "library";

function checkPassword() {
  const val = passwordInput.value.trim().toLowerCase();
  if (val === PASSWORD) {
    gate.classList.add("hidden");
    setTimeout(() => {
      loader.classList.add("hide");
      createStars(90);
      observeReveals();
      updateDays();
    }, 600);
  } else {
    gateError.classList.add("show");
    setTimeout(() => gateError.classList.remove("show"), 2200);
  }
}

unlockBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});

function createStars(count) {
  const layer = document.getElementById("stars");
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.className = "star-dot";
    const size = Math.random() * 2.5 + 1;
    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "%";
    dot.style.animationDelay = Math.random() * 3 + "s";
    dot.style.animationDuration = 1.5 + Math.random() * 3 + "s";
    layer.appendChild(dot);
  }
}

function observeReveals() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function updateDays() {
  // Approximate nearly 1 year together
  const start = new Date();
  start.setMonth(start.getMonth() - 11);
  start.setDate(start.getDate() - 5);
  const days = Math.floor((Date.now() - start) / 86400000);
  document.getElementById("daysTogether").textContent = days;
}

enterBtn.addEventListener("click", () => {
  document.querySelector(".journey-section").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".reason-card, .star").forEach(item => {
  item.addEventListener("click", () => {
    modalText.textContent = item.dataset.message;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
modalClose.addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

function openGift() {
  if (giftBox.classList.contains("open")) return;
  giftBox.classList.add("open");
  setTimeout(() => {
    finalSection.scrollIntoView({ behavior: "smooth" });
    burstHearts();
  }, 650);
}
giftBox.addEventListener("click", openGift);
giftBox.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") openGift();
});

function burstHearts() {
  for (let i = 0; i < 32; i++) {
    const heart = document.createElement("span");
    heart.textContent = Math.random() > 0.3 ? "\u2665" : "\u2726";
    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "55%";
    heart.style.zIndex = "99";
    heart.style.pointerEvents = "none";
    heart.style.color = Math.random() > 0.5 ? "#ff557f" : "#f8d89b";
    heart.style.fontSize = 14 + Math.random() * 22 + "px";
    heart.style.transition = "transform 1.6s ease-out, opacity 1.6s ease-out";
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      const x = (Math.random() - 0.5) * 400;
      const y = -120 - Math.random() * 280;
      heart.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 60}deg)`;
      heart.style.opacity = "0";
    });
    setTimeout(() => heart.remove(), 1700);
  }
}

replayBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  giftBox.classList.remove("open");
});