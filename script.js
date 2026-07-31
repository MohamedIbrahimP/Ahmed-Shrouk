document.addEventListener('DOMContentLoaded', function () {
const music = document.getElementById('bg-music');
music.volume = 0.5;
const toggleBtn = document.getElementById('music-toggle');
let isPlaying = false;

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    toggleBtn.textContent = '🔇';
  } else {
    music.play();
    toggleBtn.textContent = '🔊';
  }
  isPlaying = !isPlaying;
});
function startMusicOnce() {
  music.play().then(() => {
    isPlaying = true;
    toggleBtn.textContent = '🔊';
  }).catch(() => {
    // Autoplay still blocked, user will need to click the button
  });
  document.removeEventListener('click', startMusicOnce);
}

document.addEventListener('click', startMusicOnce, { once: true });
//------------------------------
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const colors = ['#1c2cdf', '#ff9100', '#00ffc3', '#30da0a', '#d4af37']; // tweak to your palette

function createFirework(x, y) {
  const particleCount = 60;
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount;
    const speed = Math.random() * 4 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.03; // gravity
    p.alpha -= 0.015;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
animate();

// Launch fireworks randomly across the screen
function launchRandomFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5; // upper half of screen
  createFirework(x, y);
}

setInterval(launchRandomFirework, 800);
  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('navToggle');
  var navScrim = document.getElementById('navScrim');
  var body = document.body;

  function closeNav() {
    body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleNav() {
    var isOpen = body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', toggleNav);
  navScrim.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // ---- Navbar shrink on scroll ----
  var siteNav = document.getElementById('siteNav');
  function updateNavState() {
    if (window.scrollY > 40) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  // ---- Smooth scroll with nav-height offset ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navHeight = siteNav.offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ---- Countdown ----
  var weddingDate = new Date('Aug 7, 2026 19:00:00').getTime();
  var daysEl = document.getElementById('cd-days');
  var hoursEl = document.getElementById('cd-hours');
  var minsEl = document.getElementById('cd-mins');
  var secsEl = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  var timer = setInterval(function () {
    var distance = weddingDate - Date.now();
    if (distance < 0) {
      clearInterval(timer);
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      return;
    }
    daysEl.textContent = pad(Math.floor(distance / 86400000));
    hoursEl.textContent = pad(Math.floor((distance % 86400000) / 3600000));
    minsEl.textContent = pad(Math.floor((distance % 3600000) / 60000));
    secsEl.textContent = pad(Math.floor((distance % 60000) / 1000));
  }, 1000);

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ---- Wedding Party horizontal scroller ----
  var partyScroller = document.getElementById('partyScroller');
  var partyPrev = document.getElementById('partyPrev');
  var partyNext = document.getElementById('partyNext');

  if (partyScroller && partyPrev && partyNext) {
    function partyStep() {
      var card = partyScroller.querySelector('.party-card');
      if (!card) return 220;
      var style = window.getComputedStyle(partyScroller);
      var gap = parseFloat(style.columnGap || style.gap || 24);
      return card.offsetWidth + gap;
    }
    partyPrev.addEventListener('click', function () {
      partyScroller.scrollBy({ left: -partyStep(), behavior: 'smooth' });
    });
    partyNext.addEventListener('click', function () {
      partyScroller.scrollBy({ left: partyStep(), behavior: 'smooth' });
    });
  }

  // ---- RSVP form (static demo — no backend) ----
  var rsvpForm = document.getElementById('rsvpForm');
  var formNote = document.getElementById('formNote');
  rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formNote.hidden = false;
    rsvpForm.reset();
  });
});

window.addEventListener('load', function () {
  var loader = document.getElementById('loader');
  var body = document.body;
  setTimeout(function () {
    loader.classList.add('loader-hidden');
    body.classList.remove('loading');
  }, 1500);
});