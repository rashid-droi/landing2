// ── Scroll-triggered fade-up animations
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.10 }
);
document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
  observer.observe(el);
});

// ── Mobile nav hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── Navbar scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.style.background = window.scrollY > 40
    ? 'rgba(15,31,61,0.99)'
    : 'rgba(15,31,61,0.94)';
});

// ── Counter animation for stat numbers
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(interval);
    }, 24);
  });
}
const statsObs = new IntersectionObserver(
  (entries) => { entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); } }); },
  { threshold: 0.3 }
);
const statsEl = document.querySelector('[data-count]');
if (statsEl) statsObs.observe(statsEl);
