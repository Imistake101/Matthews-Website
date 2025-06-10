document.addEventListener('DOMContentLoaded', () => {
  const enterOverlay = document.getElementById('enter-overlay');
  const enterButton = document.getElementById('enter-button');
  const container = document.querySelector('.container');
  const profilePic = document.querySelector('.profile-pic-container');
  const meowSound = document.getElementById('meow-sound');
  const mainDivider = document.getElementById('main-divider');

  let clickCount = 0;
  let themeActivated = false;

  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      if (profilePic) {
        profilePic.style.backgroundImage = `url('${url}')`;
      }
    };
  };

  preloadImage('https://imistake101.github.io/Matthews-Website/cat.webp');

  const playSound = (audio) => {
    if (audio) {
      audio.volume = 0.3;
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const wiseSound = new Audio('https://imistake101.github.io/Matthews-Website/wisemanoncesaid.mp3');
  const erikaMusic = new Audio('https://imistake101.github.io/Matthews-Website/erika.mp3');
  erikaMusic.loop = true;

  if (profilePic) {
    profilePic.setAttribute('tabindex', '0');
    profilePic.setAttribute('aria-label', 'Profile Picture, click to play sound');

    const handleClick = () => {
      if (!themeActivated) {
        clickCount++;
        if (clickCount === 5) {
          themeActivated = true;
          document.body.classList.add('theme-red-black');
          profilePic.style.backgroundImage = "url('https://imistake101.github.io/Matthews-Website/german.webp')";
          if(mainDivider) {
            mainDivider.style.borderColor = '#ff0000';
          }
          playSound(wiseSound);
          erikaMusic.volume = 0.3;
          erikaMusic.play().catch(() => {});
        } else {
          playSound(meowSound);
        }
      } else {
        playSound(wiseSound);
      }
    };

    profilePic.addEventListener('click', handleClick);
    profilePic.addEventListener('touchstart', (event) => {
      event.preventDefault();
      handleClick();
    });
    profilePic.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleClick();
      }
    });
  }

  enterButton.addEventListener('click', () => {
    enterOverlay.style.display = 'none';
    container.style.display = 'flex';
  });
});
