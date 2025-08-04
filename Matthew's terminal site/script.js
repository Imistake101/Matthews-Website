const output = document.getElementById('output');
const input = document.getElementById('cmdline');
const inputLine = document.getElementById('input-line');
const promptLabel = "visitor@bio:~$";

const links = {
  steam: "https://steamcommunity.com/id/MattFJ7/",
  discord: "https://discord.com/channels/@me",
  github: "https://github.com/Imistake101"
};

const asciiArt = 
` __  __       _   _   _____   _ _____ 
|  \\/  | __ _| |_| |_|  ___| | |___  |
| |\\/| |/ _\\ | __| __| |_ _  | |  / / 
| |  | | (_| | |_| |_|  _| |_| | / /  
|_|  |_|\\__,_|\\__|\\__|_|  \\___/ /_/   

Welcome to my website
Type 'help' to see available commands.
`;

let asciiElement;

// Command history variables
const commandHistory = [];
let historyIndex = -1;

function printLine(text, className = '') {
  const line = document.createElement('div');
  if (className) line.classList.add(className);
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function printHTMLLine(html) {
  const line = document.createElement('div');
  line.innerHTML = html;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function printCommand(cmd) {
  const line = document.createElement('div');
  line.classList.add('line');
  line.innerHTML = `<span class="prompt">${promptLabel}</span> ${cmd}`;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function clearOutputButKeepAscii() {
  for (let i = output.childNodes.length - 1; i >= 0; i--) {
    if (output.childNodes[i] !== asciiElement) {
      output.removeChild(output.childNodes[i]);
    }
  }
  output.scrollTop = output.scrollHeight;
}

function showLoadingAnimation(duration = 1600) {
  return new Promise((resolve) => {
    let dots = 0;
    const maxDots = 3;
    const loadingLine = document.createElement('div');
    output.appendChild(loadingLine);
    output.scrollTop = output.scrollHeight;

    const interval = setInterval(() => {
      loadingLine.textContent = 'loading' + '.'.repeat(dots);
      dots = (dots + 1) % (maxDots + 1);
      output.scrollTop = output.scrollHeight;
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      resolve();
    }, duration);
  });
}

function handleCommand(cmd) {
  cmd = cmd.trim().toLowerCase();

  clearOutputButKeepAscii();

  switch (cmd) {
    case '':
      break;
    case 'help':
      printHTMLLine(
`<span class="green">about</span>      - Learn about me<br>
<span class="green">contact</span>    - List of my socials<br>
<span class="green">bookmarks</span>  - A list of sites you may or may not find interesting<br>
<span class="green">clear</span>      - Clear terminal output<br>
<span class="green">help</span>       - Show this help message`
      );
      break;
    case 'about':
      printHTMLLine(`I'm Matthew, a 17-year-old from Canada with a strong interest in operating systems and gaming. I mostly play Rainbow Six Siege, GTA, and CS2. <span>😺</span>`);
      break;
    case 'contact':
      printHTMLLine(
`<span class="green">Steam:</span> <a href="${links.steam}" target="_blank" rel="noopener noreferrer">${links.steam}</a><br>
<span class="green">Discord:</span> <a href="${links.discord}" target="_blank" rel="noopener noreferrer">${links.discord}</a><br>
<span class="green">GitHub:</span> <a href="${links.github}" target="_blank" rel="noopener noreferrer">${links.github}</a>`
      );
      break;
    case 'bookmarks':
      printHTMLLine(
`1. <a href="https://cherax.menu" target="_blank" rel="noopener noreferrer">https://cherax.menu</a> - A mod menu for GTA5 with tons of features<br>
2. <a href="https://massgrave.dev" target="_blank" rel="noopener noreferrer">massgrave.dev</a> - Safe Windows piracy<br>
3. <a href="https://revi.cc" target="_blank" rel="noopener noreferrer">revi.cc</a> - Windows modification with improved performance, stability, and compatibility<br>
4. <a href="https://pstream.mov/" target="_blank" rel="noopener noreferrer">https://pstream.mov/</a> - Watch your favorite shows and movies for free with no ads ever! (っ'ヮ'c)`
      );
      break;
    case 'clear':
      output.innerHTML = '';
      output.appendChild(asciiElement);
      break;
    default:
      printLine(`Command not found: ${cmd}`, 'error');
      printLine(`Type 'help' for available commands.`);
  }
}

window.addEventListener('load', async () => {
  await showLoadingAnimation(1600);
  output.innerHTML = '';
  const asciiDiv = document.createElement('div');
  asciiDiv.classList.add('ascii');
  asciiDiv.textContent = asciiArt;
  output.appendChild(asciiDiv);
  asciiElement = asciiDiv;
  inputLine.style.display = 'flex';
  input.focus();
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = input.value;
    if (cmd.trim()) {
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
    }
    printCommand(cmd);
    handleCommand(cmd);
    input.value = '';
  } else if (e.key === 'ArrowUp') {
    if (commandHistory.length === 0) return;
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = commandHistory[historyIndex] || '';
    // Move cursor to end
    setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (commandHistory.length === 0) return;
    historyIndex = Math.min(commandHistory.length, historyIndex + 1);
    input.value = commandHistory[historyIndex] || '';
    setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
    e.preventDefault();
  }
});
