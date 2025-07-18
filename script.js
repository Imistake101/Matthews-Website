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

const playMeowSound = () => {
  if (!meowSound) {
    console.error('Meow sound element not found.');
    return;
  }
  meowSound.volume = 0.3;
  meowSound.pause();
  meowSound.currentTime = 0;
  meowSound.play().catch((err) => {
    console.error('Failed to play meow sound:', err);
  });
};

const initProfilePicEvents = () => {
  if (!profilePic) return;

  profilePic.setAttribute('tabindex', '0');
  profilePic.setAttribute('aria-label', 'Profile Picture, click to play sound');

  ['click', 'touchstart', 'keydown'].forEach((eventType) => {
    profilePic.addEventListener(eventType, (e) => {
      if (eventType === 'touchstart') e.preventDefault();
      if (eventType === 'keydown' && e.key !== 'Enter') return;
      playMeowSound();
    });
  });
};

preloadImage('assets/images/cat.webp');
initProfilePicEvents();
