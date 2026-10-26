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

      youtubeTitle: 'Canal no YouTube',
      youtubeDesc:
        'Meu canal pessoal: vídeo-ensaios, cinema, games e cultura pop.',
      youtubeFeatured: 'Vídeos em Destaque',
      youtubeCta: 'Inscrever-se',

      portfolioTitle: 'Portfólio',
      filmsTitle: 'Trabalhos Selecionados',
      verticalTitle: 'Short-form · Redes Sociais',
      showreelCaption: 'Showreel 2026 · 1:28',
      equipmentTitle: 'Equipamentos:',
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
      ctaCvPt: 'Baixar CV · PT',
      ctaCvEn: 'Baixar CV · EN',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Escuro',

      navAbout: 'Sobre',
      navYoutube: 'YouTube',
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

      youtubeTitle: 'YouTube Channel',
      youtubeDesc:
        'My personal channel: video essays, cinema, games and pop culture.',
      youtubeFeatured: 'Featured Videos',
      youtubeCta: 'Subscribe',

      portfolioTitle: 'Portfolio',
      filmsTitle: 'Selected Work',
      verticalTitle: 'Short-form · Social Media',
      showreelCaption: 'Showreel 2026 · 1:28',
      equipmentTitle: 'Equipment:',
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
      ctaCvPt: 'Download CV · PT',
      ctaCvEn: 'Download CV · EN',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',

      navAbout: 'About',
      navYoutube: 'YouTube',
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

    document.getElementById('youtube-title').textContent = lang.youtubeTitle;
    document.getElementById('youtube-desc').textContent = lang.youtubeDesc;
    document.getElementById('youtube-featured-title').textContent =
      lang.youtubeFeatured;
    document.getElementById('youtube-cta').textContent = lang.youtubeCta;

    document.getElementById('portfolio-title').textContent =
      lang.portfolioTitle;
    document.getElementById('films-title').textContent = lang.filmsTitle;
    document.getElementById('vertical-title').textContent = lang.verticalTitle;
    document.getElementById('showreel-caption').textContent = lang.showreelCaption;
    document.getElementById('equipment-title').textContent = lang.equipmentTitle;
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
    document.getElementById('cta-cv-pt').textContent = lang.ctaCvPt;
    document.getElementById('cta-cv-en').textContent = lang.ctaCvEn;

    const themeToggleBtn = document.getElementById('themeToggle');
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    themeToggleBtn.textContent = isLightTheme ? lang.themeDark : lang.themeLight;

    document.getElementById('nav-about').textContent = lang.navAbout;
    document.getElementById('nav-youtube').textContent = lang.navYoutube;
    document.getElementById('nav-portfolio').textContent = lang.navPortfolio;
    document.getElementById('nav-design').textContent = lang.navDesign;
    document.getElementById('nav-roteiros').textContent = lang.navRoteiros;
    document.getElementById('nav-skills').textContent = lang.navSkills;
    document.getElementById('nav-experience').textContent = lang.navExperience;
    document.getElementById('nav-contact').textContent = lang.navContact;
  }

  // CANAL DO YOUTUBE (@reisocriador) - vídeos em destaque
  // Para adicionar: use o ID do vídeo (watch?v=ID) em https://www.youtube.com/embed/ID
  const youtubeFeatured = [
    {
      title: '13 anos esperando o GTA 6… e eu nem vou jogar',
      url: 'https://www.youtube.com/embed/AF9RufiXu1A',
    },
    {
      title: 'Hollywood não consegue deixar essa história em paz. E talvez tenha um motivo…',
      url: 'https://www.youtube.com/embed/T07afyg31zU',
    },
  ];

  // PORTFÓLIO — 8 trabalhos selecionados.
  // role: função no projeto (aparece abaixo do título). Deixe '' se não quiser mostrar.
  const films = [
    {
      title: 'O mundo que ela trouxe · Documentário (2026)',
      role: 'Direção · Direção de Fotografia · Edição',
      url: 'https://www.youtube.com/embed/o2RNlff0gdg',
    },
    {
      title: 'Incertezas · Videoclipe (2024)',
      role: 'Direção · Câmera · Edição',
      url: 'https://www.youtube.com/embed/zlg6i-vp2tU',
    },
    {
      title: 'Vestido de Noiva · Curta-metragem (2024)',
      role: 'Som Direto · Montagem',
      url: 'https://player.vimeo.com/video/1121862329',
    },
    {
      title: 'HIGH · High Company (2024)',
      role: 'Videomaker',
      url: 'https://player.vimeo.com/video/1121867258',
    },
    {
      title: 'O que os videogames me ensinaram sobre contar histórias',
      role: 'Vídeo-ensaio · Canal Reis, o Criador',
      url: 'https://www.youtube.com/embed/-i2qpSbiT2Q',
    },
    {
      title: 'Yosemite (2026)',
      role: '',
      url: 'https://player.vimeo.com/video/1157398045',
    },
  ];

  const verticals = [
    {
      title: 'CoreboysHubClips (2025)',
      role: 'Edição short-form · TikTok / YouTube',
      url: 'https://www.tiktok.com/embed/7561680704942230815',
    },
    {
      title: 'Scarface',
      role: '',
      url: 'https://www.tiktok.com/embed/7494026388328959238',
    },
  ];

  function renderGallery(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach((v) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      const role = v.role ? `<p class="video-role">${v.role}</p>` : '';
      card.innerHTML = `<iframe src="${v.url}" loading="lazy" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><h3>${v.title}</h3>${role}`;
      container.appendChild(card);
    });
  }

  renderGallery('youtube-gallery', youtubeFeatured);
  renderGallery('video-gallery', films);
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
