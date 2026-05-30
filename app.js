/* ==========================================================================
   LV FILMS — LUXURY INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── STICKY HEADER ON SCROLL ──────────────────────────────────────────────
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ── MOBILE NAV TOGGLE ────────────────────────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const navMenu    = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      const open  = navMenu.classList.contains('active');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : 'none';
      spans[1].style.opacity   = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelectorAll('span').forEach(s => {
          s.style.transform = 'none';
          s.style.opacity   = '1';
        });
      });
    });
  }

  // ── FAQ ACCORDION ────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-header').addEventListener('click', () => {
      const isActive  = item.classList.contains('active');
      const content   = item.querySelector('.faq-content');
      document.querySelectorAll('.faq-item.active').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-content').style.maxHeight = '0px';
      });
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ── SCROLL REVEAL ────────────────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('active'); o.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }

  // ── ACTIVE NAV HIGHLIGHT ─────────────────────────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  });

  // ── WHATSAPP REDIRECT ────────────────────────────────────────────────────
  // Native HTML <a> anchor elements handle wa.me links directly.

  // ==========================================================================
  //  INTERACTIVE PORTFOLIO — NUMBERED LIST + HOVER THUMBS + CLICK EXPAND
  // ==========================================================================

  const INSTA_PROFILE = 'https://www.instagram.com/lv.films_/';
  const PREWED_REEL   = 'https://www.instagram.com/reel/DNJILUFoSIG/?igsh=MXRlMDR6OXJncnZqNg==';
  const MODEL_REEL    = 'https://www.instagram.com/reel/DYM08xnCya5/?igsh=OWo5bG5pZ3VmODRw';
  const EVENTS_REEL_1 = 'https://www.instagram.com/reel/DYjdZI1tQZ3/?igsh=bm9rMHBhdDNqZnlr';
  const EVENTS_REEL_2 = 'https://www.instagram.com/reel/DYz36yuKs5D/?igsh=MW9pM2MyenF4NXl6OQ==';
  const MAT_REEL      = 'https://www.instagram.com/reel/DYK06QvO6-k/?igsh=ajZpc2toZzN0c3c4';

  const reelData = {
    prewed:    [{ thumb: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=310&h=550&fit=crop&q=80', url: PREWED_REEL }],
    maternity: [{ thumb: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=310&h=550&fit=crop&q=80', url: MAT_REEL }],
    events:    [
      { thumb: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=310&h=550&fit=crop&q=80', url: EVENTS_REEL_1 },
      { thumb: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=310&h=550&fit=crop&q=80', url: EVENTS_REEL_2 },
    ],
    birthdays: [{ thumb: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=310&h=550&fit=crop&q=80', url: INSTA_PROFILE }],
    music:     [{ thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=310&h=550&fit=crop&q=80', url: INSTA_PROFILE }],
    model:     [{ thumb: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=310&h=550&fit=crop&q=80', url: MODEL_REEL }],
    short:     [{ thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=310&h=550&fit=crop&q=80', url: INSTA_PROFILE }],
  };

  const categoryMeta = [
    { key: 'prewed',    num: '01', name: 'Pre-Wedding',  tags: ['Cinematic', 'Pre-Wedding'] },
    { key: 'maternity', num: '02', name: 'Maternity',    tags: ['Cinematic', 'Maternity']   },
    { key: 'events',    num: '03', name: 'Events',       tags: ['Events',    'Video']       },
    { key: 'birthdays', num: '04', name: 'Birthdays',    tags: ['Birthday',  'Video']       },
    { key: 'music',     num: '05', name: 'Music Videos', tags: ['Music',     'Creative']    },
    { key: 'model',     num: '06', name: 'Model Shoots', tags: ['Fashion',   'Editorial']   },
    { key: 'short',     num: '07', name: 'Short Films',  tags: ['Film',      'Narrative']   },
  ];

  const pfGrid = document.getElementById('portfolioGrid');
  if (!pfGrid) return;

  // ── SVG icons ─────────────────────────────────────────────────────────────
  const igSVG = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>`;
  const arrowSVG   = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
  const chevronSVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>`;
  const playSVG    = `<svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

  // ── Build and inject rows ─────────────────────────────────────────────────
  categoryMeta.forEach(meta => {
    const reels = reelData[meta.key] || [];

    const miniHTML = reels.map(r => `
      <div class="pf-mini-thumb">
        <img src="${r.thumb}" alt="${meta.name}" loading="lazy">
      </div>`).join('');

    const expandHTML = reels.map(r => `
      <a class="pf-exp-card" href="${r.url}" target="_blank" rel="noopener noreferrer">
        <img src="${r.thumb}" alt="${meta.name}" loading="lazy">
        <div class="pf-exp-overlay">
          <div class="pf-exp-insta">${igSVG}</div>
          <span class="pf-exp-badge">${playSVG} View on Instagram</span>
        </div>
      </a>`).join('');

    const row = document.createElement('div');
    row.className = 'pf-list-row';
    row.dataset.category = meta.key;
    row.innerHTML = `
      <div class="pf-row-header">
        <span class="pf-row-num">${meta.num}</span>
        <h3 class="pf-row-name">${meta.name}</h3>
        <span class="pf-row-cta">View Reel ${arrowSVG}</span>
        <div class="pf-row-right">
          <div class="pf-row-tags">
            <span class="pf-tag pf-tag-a">${meta.tags[0]}</span>
            <span class="pf-tag pf-tag-b">${meta.tags[1]}</span>
          </div>
          <div class="pf-row-mini-thumbs">${miniHTML}</div>
          <button class="pf-row-toggle" aria-label="Expand">${chevronSVG}</button>
        </div>
      </div>
      <div class="pf-row-content">
        <div class="pf-row-content-inner">${expandHTML}</div>
      </div>`;
    pfGrid.appendChild(row);
  });

  // ── Click header: toggle expanded state ──────────────────────────────────
  pfGrid.querySelectorAll('.pf-list-row').forEach(row => {
    row.querySelector('.pf-row-header').addEventListener('click', () => {
      const isOpen = row.classList.contains('pf-row-open');
      pfGrid.querySelectorAll('.pf-list-row').forEach(r => r.classList.remove('pf-row-open'));
      if (!isOpen) row.classList.add('pf-row-open');
    });
  });

});
