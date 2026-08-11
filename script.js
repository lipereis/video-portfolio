document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    pt: {
      aboutTitle: 'Sobre Mim',
      aboutObjective:
        '<strong>Resumo Profissional:</strong> Profissional com 5 anos de experiência no mercado audiovisual, atuando em edição, produção e som direto.',
      aboutEducation:
        '<strong>Formação Acadêmica:</strong> Comunicação Social – PUC-Rio, formado em Junho/2024.',
      aboutLanguages:
        '<strong>Idiomas:</strong><br>• Inglês: Avançado<br>• Espanhol: Avançado',

      portfolioTitle: 'Portfólio',
      filmsTitle: 'Filmes',
      gameplayTitle: 'Gameplays',
      verticalTitle: 'Vídeos Verticais',
      designTitle: 'Design Gráfico',

      roteirosTitle: 'Roteiros',
      semifinalistTitle: 'Roteiro Semifinalista',
      otherScreenplaysTitle: 'Outros Roteiros',

      skillsTitle: 'Habilidades Técnicas',
      experienceTitle: 'Experiência Profissional',

      projectTitle: 'Projeto Pessoal',
      projectDesc:
        "Perfil no TikTok sobre moda, cinema e música: <a href='https://www.tiktok.com/@ladobdacena' target='_blank'>Lado B da Cena</a>",

      certificatesTitle: 'Certificados',
      contactTitle: 'Contato',

      contactPhone: 'Telefone: (21) 9 7455-4444',
      contactEmail:
        "E-mail: <a href='mailto:lipereis99@hotmail.com'>lipereis99@hotmail.com</a>",
      contactLinkedIn:
        "LinkedIn: <a href='https://www.linkedin.com/in/felipe-gomes-0220b7247/' target='_blank'>Felipe Gomes</a>",

      ctaPortfolio: 'Ver Portfólio',
      ctaRoteiros: 'Ler Roteiros',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Escuro',

      navAbout: 'Sobre',
      navPortfolio: 'Portfólio',
      navDesign: 'Design Gráfico',
      navRoteiros: 'Roteiros',
      navSkills: 'Habilidades',
      navExperience: 'Experiência',
      navContact: 'Contato',
    },

    en: {
      aboutTitle: 'About Me',
      aboutObjective:
        '<strong>Professional Summary:</strong> Video editor and videomaker with 5 years of experience in editing, production, and direct sound.',
      aboutEducation:
        '<strong>Education:</strong> Social Communication – PUC-Rio, graduated in June 2024.',
      aboutLanguages:
        '<strong>Languages:</strong><br>• English: Advanced<br>• Spanish: Advanced',

      portfolioTitle: 'Portfolio',
      filmsTitle: 'Films',
      gameplayTitle: 'Gameplays',
      verticalTitle: 'Vertical Videos',
      designTitle: 'Graphic Design',

      roteirosTitle: 'Screenplays',
      semifinalistTitle: 'Semifinalist Screenplay',
      otherScreenplaysTitle: 'Other Screenplays',

      skillsTitle: 'Technical Skills',
      experienceTitle: 'Professional Experience',

      projectTitle: 'Personal Project',
      projectDesc:
        "TikTok profile about fashion, cinema, and music: <a href='https://www.tiktok.com/@ladobdacena' target='_blank'>Lado B da Cena</a>",

      certificatesTitle: 'Certificates',
      contactTitle: 'Contact',

      contactPhone: 'Phone: (21) 9 7455-4444',
      contactEmail:
        "Email: <a href='mailto:lipereis99@hotmail.com'>lipereis99@hotmail.com</a>",
      contactLinkedIn:
        "LinkedIn: <a href='https://www.linkedin.com/in/felipe-gomes-0220b7247/' target='_blank'>Felipe Gomes</a>",

      ctaPortfolio: 'View Portfolio',
      ctaRoteiros: 'Read Screenplays',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',

      navAbout: 'About',
      navPortfolio: 'Portfolio',
      navDesign: 'Graphic Design',
      navRoteiros: 'Screenplays',
      navSkills: 'Skills',
      navExperience: 'Experience',
      navContact: 'Contact',
    },
  };

  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  let currentLanguage =
    localStorage.getItem('language') ||
    (navigator.language.startsWith('en') ? 'en' : 'pt');

  const languageSelect = document.getElementById('language-select');
  languageSelect.value = currentLanguage;
  updateContent();

  window.changeLanguage = function () {
    currentLanguage = languageSelect.value;
    localStorage.setItem('language', currentLanguage);
    updateContent();
  };

  function updateContent() {
    const lang = translations[currentLanguage];
    if (!lang) return;

    document.getElementById('about-title').textContent = lang.aboutTitle;
    document.getElementById('about-objective').innerHTML = lang.aboutObjective;
    document.getElementById('about-education').innerHTML = lang.aboutEducation;
    document.getElementById('about-languages').innerHTML = lang.aboutLanguages;

    document.getElementById('portfolio-title').textContent =
      lang.portfolioTitle;
    document.getElementById('films-title').textContent = lang.filmsTitle;
    document.getElementById('gameplay-title').textContent = lang.gameplayTitle;
    document.getElementById('vertical-title').textContent = lang.verticalTitle;
    document.getElementById('design-title').textContent = lang.designTitle;

    document.getElementById('roteiros-title').textContent = lang.roteirosTitle;
    document.getElementById('semifinalist-title').textContent =
      lang.semifinalistTitle;
    document.getElementById('other-screenplays-title').textContent =
      lang.otherScreenplaysTitle;

    document.getElementById('skills-title').textContent = lang.skillsTitle;
    document.getElementById('experience-title').textContent =
      lang.experienceTitle;

    document.getElementById('project-title').textContent = lang.projectTitle;
    document.getElementById('project-desc').innerHTML = lang.projectDesc;

    document.getElementById('certificates-title').textContent =
      lang.certificatesTitle;

    document.getElementById('contact-title').textContent = lang.contactTitle;
    document.getElementById('contact-phone').innerHTML = lang.contactPhone;
    document.getElementById('contact-email').innerHTML = lang.contactEmail;
    document.getElementById('contact-linkedin').innerHTML =
      lang.contactLinkedIn;

    document.getElementById('cta-portfolio').textContent = lang.ctaPortfolio;
    document.getElementById('cta-roteiros').textContent = lang.ctaRoteiros;

    const themeToggleBtn = document.getElementById('themeToggle');
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    themeToggleBtn.textContent = isLightTheme ? lang.themeDark : lang.themeLight;

    document.getElementById('nav-about').textContent = lang.navAbout;
    document.getElementById('nav-portfolio').textContent = lang.navPortfolio;
    document.getElementById('nav-design').textContent = lang.navDesign;
    document.getElementById('nav-roteiros').textContent = lang.navRoteiros;
    document.getElementById('nav-skills').textContent = lang.navSkills;
    document.getElementById('nav-experience').textContent = lang.navExperience;
    document.getElementById('nav-contact').textContent = lang.navContact;
  }

  // FILMES (vídeos horizontais - YouTube/Vimeo)
  const films = [
    {
      title: 'Documentário: O mundo que ela trouxe (2026)',
      url: 'https://www.youtube.com/embed/o2RNlff0gdg',
    },

    {
      title: 'Como Conseguir o Seu Sonho (2026)',
      url: 'https://www.youtube.com/embed/n4waVv-_eJE',
    },

    {
      title: 'DEATHSTRANDING (2026)',
      url: 'https://www.youtube.com/embed/V5ZdKU5TEfk',
    },
    {
      title: ' Diablo 4: Lord of Hatred (2026)',
      url: 'https://www.youtube.com/embed/OX6cluUsyKY',
    },

    {
      title: 'Xalatath (2026)',
      url: 'https://www.youtube.com/embed/F8EdaCiN1lI',
    },
    {
      title: 'Love Takes Miles (2026)',
      url: 'https://www.youtube.com/embed/wtwXGe2Vqrg',
    },

    {
      title: 'MEDALION (2026)',
      url: 'https://www.youtube.com/embed/EFto1rWsTXU',
    },
    {
      title: 'Reis do Caos Motion Intro (2026)',
      url: 'https://www.youtube.com/embed/DjCcXgElq4s',
    },

    {
      title: 'Gol Motion Vasco da Gama (2025)',
      url: 'https://www.youtube.com/embed/TEaWDaNw3Sg',
    },
    {
      title: 'Zach Doelling Raw Files (2025)',
      url: 'https://player.vimeo.com/video/1161442658',
    },
    {
      title: 'Yosemite (2026)',
      url: 'https://player.vimeo.com/video/1157398045',
    },
    {
      title: 'SKATE OR DIE (2025)',
      url: 'https://www.youtube.com/embed/3QJTZKdjaXY',
    },
    {
      title: 'Cidade Maravilhosa (2023)',
      url: 'https://player.vimeo.com/video/844086701',
    },
    { title: 'HIGH (2024)', url: 'https://player.vimeo.com/video/1121867258' },
    {
      title: 'Vestido de Noiva (2024)',
      url: 'https://player.vimeo.com/video/1121862329',
    },
    {
      title: 'Clipe Incertezas (2024)',
      url: 'https://www.youtube.com/embed/zlg6i-vp2tU',
    },
  ];

  // GAMEPLAYS
  const gameplays = [
    {
      title: 'Modern Warfare 2019 in 2026',
      url: 'https://www.youtube.com/embed/mMCaYn34Fp0',
    },
    {
      title: 'Valorant Video',
      url: 'https://www.youtube.com/embed/Nx3w6twfwfs',
    },
    {
      title: 'League of Legends Video 1',
      url: 'https://www.youtube.com/embed/zqTpvIVZxN4',
    },
    {
      title: 'League of Legends Video 2',
      url: 'https://www.youtube.com/embed/ax5nZJrzUsc',
    },
  ];

  // VÍDEOS VERTICAIS (TikTok)
  const verticals = [
    {
      title: 'Core boys Hub Clips #1',
      url: 'https://www.tiktok.com/embed/7561680704942230815',
    },
    {
      title: 'Core boys Hub Clips #2',
      url: 'https://www.tiktok.com/embed/7596852253919612191',
    },

    {
      title: 'Você é uma pessoa boa?',
      url: 'https://www.youtube.com/embed/O1dKtDHYx3k',
    },

    {
      title: 'Core boys Hub Clips #3',
      url: 'https://www.tiktok.com/embed/7603356192781520159',
    },

    {
      title: 'LOL Clipe',
      url: 'https://www.youtube.com/embed/-Roy82tL6SQ',
    },

    {
      title: 'Scarface',
      url: 'https://www.tiktok.com/embed/7494026388328959238',
    },
  ];

  function renderGallery(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach((v) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.innerHTML = `<iframe src="${v.url}" frameborder="0" allowfullscreen></iframe><h3>${v.title}</h3>`;
      container.appendChild(card);
    });
  }

  renderGallery('video-gallery', films);
  renderGallery('gameplay-gallery', gameplays);
  renderGallery('vertical-gallery', verticals);

  // DESIGN
  const designWorks = [
    { title: 'Cilada Poster', img: './design/cilada_poster.png' },
    { title: 'Mbappé', img: './design/mbappe.jpg' },
    { title: 'Nights', img: './design/nights_poster.png' },
    { title: 'Estado de Emergencia', img: './design/poster_ruido.png ' },
    { title: 'Skate Logo', img: './design/reis_skate_logo.png ' },
    { title: 'WHATMORE Flyer', img: './design/whatmore_poster.png ' },
    { title: 'Marty Supreme Poster', img: './design/martysupremeposter.png ' },
    { title: 'ASAP ROCKY', img: './design/dontbedumbbrutalista.jpeg' },
  ];

  const designGallery = document.getElementById('design-gallery');
  designWorks.forEach((d) => {
    const card = document.createElement('div');
    card.className = 'design-card';
    card.innerHTML = `
      <img src="${d.img}" alt="${d.title}">
      <h3>${d.title}</h3>
    `;
    designGallery.appendChild(card);
  });

  // Scroll suave
  document.querySelectorAll('nav a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').substring(1);
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Tema claro/escuro
  const themeToggleBtn = document.getElementById('themeToggle');
  themeToggleBtn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    updateContent();
  });

  // Timecode (24fps, desde o carregamento da página)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tc = document.getElementById('tc');
  const tcStart = performance.now();
  const pad = (n) => String(n).padStart(2, '0');
  function tick(now) {
    const elapsed = now - tcStart;
    const totalFrames = Math.floor((elapsed / 1000) * 24);
    const ff = totalFrames % 24;
    const totalSeconds = Math.floor(totalFrames / 24);
    const ss = totalSeconds % 60;
    const mm = Math.floor(totalSeconds / 60) % 60;
    const hh = Math.floor(totalSeconds / 3600);
    tc.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    if (reducedMotion) { setTimeout(() => tick(performance.now()), 1000); }
    else { requestAnimationFrame(tick); }
  }
  requestAnimationFrame(tick);

  // Cursor customizado (viewfinder reticle)
  const cursor = document.getElementById('cursor');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && cursor) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .video-card, .design-card, .screenplay-card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  // Scroll reveal + réguas de perfuração
  const revealTargets = document.querySelectorAll('.reveal, .filmrule');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
  revealTargets.forEach((el) => io.observe(el));
});
