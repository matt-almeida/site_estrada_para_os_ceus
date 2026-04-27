/* ============================================================
   ESTRADA PARA OS CÉUS — Script
   ============================================================ */

'use strict';

// ── Navbar scroll & active link ─────────────────────────────
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile-overlay a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
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
  toggle.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
});

overlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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

// ── Menu item hover sparkle effect ──────────────────────────
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.paddingLeft = '8px';
  });
  item.addEventListener('mouseleave', () => {
    item.style.paddingLeft = '';
  });
});

// ── Owner card modal ─────────────────────────────────────────
const ownerModal      = document.getElementById('ownerModal');
const ownerModalClose = document.getElementById('ownerModalClose');
const ownerModalImg   = document.getElementById('ownerModalImg');
const ownerModalName  = document.getElementById('ownerModalName');
const ownerModalTitle = document.getElementById('ownerModalTitle');
const ownerModalDesc  = document.getElementById('ownerModalDesc');

function openOwnerModal(card) {
  ownerModalImg.src        = card.dataset.img   || '';
  ownerModalImg.alt        = card.dataset.alt   || '';
  ownerModalName.textContent  = card.dataset.name  || '';
  ownerModalTitle.textContent = card.dataset.title || '';
  ownerModalDesc.textContent  = card.dataset.desc  || '';
  ownerModal.classList.add('open');
  ownerModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  ownerModalClose.focus();
}

function closeOwnerModal() {
  ownerModal.classList.remove('open');
  ownerModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.owner-card').forEach(card => {
  card.addEventListener('click', () => openOwnerModal(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openOwnerModal(card);
    }
  });
});

ownerModalClose.addEventListener('click', closeOwnerModal);
ownerModal.querySelector('.owner-modal-backdrop').addEventListener('click', closeOwnerModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && ownerModal.classList.contains('open')) closeOwnerModal();
});

// ── Parallax hero ───────────────────────────────────────────
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.18}px)`;
      heroContent.style.opacity   = `${1 - y / window.innerHeight * 1.4}`;
    }
  }, { passive: true });
}

// ── Dynamic year in footer ───────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Lodge card highlight on hover ───────────────────────────
document.querySelectorAll('.lodge-card:not(.featured)').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.lodge-card.featured').forEach(f => {
      f.style.opacity = '0.7';
    });
  });
  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.lodge-card.featured').forEach(f => {
      f.style.opacity = '';
    });
  });
});

// ── Console Easter Egg ───────────────────────────────────────
console.log('%c⚔ Estrada para os Céus ⚔', 'color:#d4a017;font-size:1.4rem;font-family:serif;');
console.log('%cBem-vindo, aventureiro. Sua jornada começa aqui.', 'color:#c8a96e;font-family:serif;font-style:italic;');
