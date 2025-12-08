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
      designTitle: 'Design Gráfico',

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

      navAbout: 'Sobre',
      navPortfolio: 'Portfólio',
      navDesign: 'Design Gráfico',
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
      designTitle: 'Graphic Design',

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

      navAbout: 'About',
      navPortfolio: 'Portfolio',
      navDesign: 'Graphic Design',
      navSkills: 'Skills',
      navExperience: 'Experience',
      navContact: 'Contact',
    },
  };

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
    document.getElementById('design-title').textContent = lang.designTitle;

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

    document.getElementById('nav-about').textContent = lang.navAbout;
    document.getElementById('nav-portfolio').textContent = lang.navPortfolio;
    document.getElementById('nav-design').textContent = lang.navDesign;
    document.getElementById('nav-skills').textContent = lang.navSkills;
    document.getElementById('nav-experience').textContent = lang.navExperience;
    document.getElementById('nav-contact').textContent = lang.navContact;
  }

  // VÍDEOS
  const videos = [
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
    {
      title: 'Logo com Partículas (2025)',
      url: 'https://player.vimeo.com/video/1144507432',
    },

    {
      title: 'Mensagem 3D (2025)',
      url: 'https://player.vimeo.com/video/1144509630',
    },
  ];

  const gallery = document.getElementById('video-gallery');
  videos.forEach((v) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `<iframe src="${v.url}" frameborder="0" allowfullscreen></iframe><h3>${v.title}</h3>`;
    gallery.appendChild(card);
  });

  // DESIGN
  const designWorks = [
    { title: 'Cilada Poster', img: './design/cilada_poster.png' },
    { title: 'Mbappé', img: './design/mbappe.jpg' },
    { title: 'Nights', img: './design/nights_poster.png' },
    { title: 'Estado de Emergencia', img: './design/poster_ruido.png ' },
    { title: 'Skate Logo', img: './design/reis_skate_logo.png ' },
    { title: 'WHATMORE Flyer', img: './design/whatmore_poster.png ' },
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
});
