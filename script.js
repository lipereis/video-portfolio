document.addEventListener('DOMContentLoaded', () => {
  const videos = [
    {
      title: 'Cidade Maravilhosa (2023)',
      url: 'https://player.vimeo.com/video/844086701',
    },
    {
      title: 'HIGH (2024)',
      url: 'https://player.vimeo.com/video/1121867258',
    },
    {
      title: 'Vestido de Noiva (2024)',
      url: 'https://player.vimeo.com/video/1121862329',
    },
    {
      title: 'Clipe Incertezas (2024)',
      url: 'https://www.youtube.com/embed/zlg6i-vp2tU',
    },
  ];

  const videoGallery = document.getElementById('video-gallery');

  videos.forEach((video) => {
    const videoCard = document.createElement('div');
    videoCard.classList.add('video-card');
    videoCard.innerHTML = `
            <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
            <h3>${video.title}</h3>
        `;
    videoGallery.appendChild(videoCard);
  });

  document.querySelectorAll('nav a').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
  });
});
