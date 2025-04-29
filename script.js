const profilePic = document.querySelector('.profile-pic-container');
const meowSound = document.getElementById('meow-sound');

const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    if (profilePic) {
      profilePic.style.backgroundImage = `url('${url}')`;
    }
  };
  img.onerror = () => {
    console.error('Background image load error. Please check the URL or connection.');
  };
};

preloadImage('https://imistake101.github.io/Matthews-Website/cat.webp');

const playMeowSound = () => {
  if (meowSound) {
    meowSound.volume = 0.3;
    meowSound.pause();
    meowSound.currentTime = 0;
    meowSound.play().catch((error) => {
      console.error('Failed to play meow sound:', error);
    });
  } else {
    console.error('Meow sound element not found.');
  }
};

if (profilePic) {
  profilePic.setAttribute('tabindex', '0');
  profilePic.setAttribute('aria-label', 'Profile Picture, click to play sound');

  profilePic.addEventListener('click', () => {
    playMeowSound();
  });

  profilePic.addEventListener('touchstart', (event) => {
    event.preventDefault();
    playMeowSound();
  });

  profilePic.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      playMeowSound();
    }
  });
}