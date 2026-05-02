/* ============================================================
   ESTRADA PARA OS CÉUS — Script
   ============================================================ */

'use strict';

// ── Navbar scroll & active link ─────────────────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-overlay a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile nav toggle ────────────────────────────────────────
const toggle  = document.getElementById('navToggle');
const overlay = document.getElementById('navMobileOverlay');

toggle.addEventListener('click', () => {
  const isOpen = overlay.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

overlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Smooth anchor scroll ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Parallax hero ────────────────────────────────────────────
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.16}px)`;
      heroContent.style.opacity   = String(1 - (y / window.innerHeight) * 1.4);
    }
  }, { passive: true });
}

// ── Owner card modal ─────────────────────────────────────────
const modal     = document.getElementById('ownerModal');
const modalImg  = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalTitle= document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose= document.getElementById('modalClose');

function openModal(card) {
  modalImg.src          = card.dataset.img;
  modalImg.alt          = card.dataset.name;
  modalName.textContent = card.dataset.name;
  modalTitle.textContent= card.dataset.title;
  modalDesc.textContent = card.dataset.desc;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.owner-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
  });
});

modalClose.addEventListener('click', closeModal);

// Close on backdrop click
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

// ── Dynamic year in footer ───────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Lodge card — dim featured when hovering others ───────────
document.querySelectorAll('.lodge-card:not(.featured)').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.lodge-card.featured').forEach(f => f.style.opacity = '0.65');
  });
  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.lodge-card.featured').forEach(f => f.style.opacity = '');
  });
});

// ── Console Easter Egg ───────────────────────────────────────
console.log('%c⚔  Estrada para os Céus  ⚔', 'color:#d4a017;font-size:1.3rem;font-family:serif;');
console.log('%cBem-vindo, aventureiro. Sua jornada começa aqui.', 'color:#c8a96e;font-style:italic;font-family:serif;');
