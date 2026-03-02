
(() => {
  const bg = document.querySelector(".bg");
  if (!bg) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;

  const ease = 0.06;

  function animate() {
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    bg.style.setProperty("--mx", `${currentX}px`);
    bg.style.setProperty("--my", `${currentY}px`);

    requestAnimationFrame(animate);
  }

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  animate();
})();
(() => {
  const wrap = document.getElementById("tiltWrap");
  const card = document.getElementById("tiltCard");
  if (!wrap || !card) return;

  const MAX_ROTATE = 10;
  const SCALE = 1.02;

  let rafId = null;
  let targetRX = 0;
  let targetRY = 0;

  function apply() {
    rafId = null;
    card.style.transform = `rotateX(${targetRX}deg) rotateY(${targetRY}deg) scale(${SCALE})`;
  }

  function queueApply() {
    if (rafId) return;
    rafId = requestAnimationFrame(apply);
  }

  function onMove(e) {
    const r = wrap.getBoundingClientRect();

    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    const dx = x - 0.5;
    const dy = y - 0.5;

    targetRY = dx * MAX_ROTATE * 2;
    targetRX = -dy * MAX_ROTATE * 2;

    card.classList.add("is-active");
    queueApply();
  }

  function reset() {
    card.classList.remove("is-active");
    card.style.transition = "transform 260ms ease, box-shadow 260ms ease";
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }

  function onEnter() {
    card.style.transition = "transform 220ms ease, box-shadow 220ms ease";
  }

  wrap.addEventListener("pointerenter", onEnter);
  wrap.addEventListener("pointermove", onMove);
  wrap.addEventListener("pointerleave", reset);

  wrap.addEventListener("touchend", reset, { passive: true });
})();