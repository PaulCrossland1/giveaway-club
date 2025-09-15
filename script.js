const drawButton = document.getElementById('drawButton');
const winnerDisplay = document.getElementById('winnerDisplay');
const nameList = document.getElementById('nameList');

function formatName(fullName) {
  const parts = fullName.trim().split(' ');
  const firstName = parts[0];
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return `${firstName} ${lastInitial}`;
}

let entries = [];

// Custom emoji confetti
function emojiConfetti(emojis) {
  const canvas = document.getElementById('emojiConfettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  };
  resize();

  const particles = [];
  const count = 280; // increased volume for denser confetti
  const size = 24 * dpr; // ~24px
  const gravity = 0.15 * dpr;
  const drag = 0.992;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: (canvas.width / 2),
      y: canvas.height * 0.2,
      // wider spread velocities
      vx: (Math.random() - 0.5) * 14 * dpr,
      vy: (-Math.random() * 8 - 4) * dpr,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      emoji: emojis[Math.floor(Math.random() * emojis.length)] || '🎉',
      life: 0,
      maxLife: 180 + Math.random() * 60
    });
  }

  let running = true;
  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.font = `${size}px system-ui, Apple Color Emoji, Segoe UI Emoji`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
    });

    // Stop after max life
    if (particles.every(p => p.life > p.maxLife || p.y > canvas.height + 40 * dpr)) {
      running = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    requestAnimationFrame(draw);
  };

  draw();
}

// Create massive confetti cannon explosion
function createConfettiExplosion() {
  // Fire from bottom left
  confetti({
    particleCount: 100,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 1 },
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9']
  });
  
  // Fire from bottom right
  confetti({
    particleCount: 100,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 1 },
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9']
  });
  
  // Additional bursts with delays
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 90,
      spread: 100,
      origin: { x: 0.5, y: 1 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9']
    });
  }, 250);
  
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 45,
      spread: 70,
      origin: { x: 0.2, y: 0.8 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9']
    });
    
    confetti({
      particleCount: 60,
      angle: 135,
      spread: 70,
      origin: { x: 0.8, y: 0.8 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9']
    });
  }, 500);
  
  setTimeout(() => {
    confetti({
      particleCount: 120,
      angle: 90,
      spread: 120,
      origin: { x: 0.5, y: 0.9 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9']
    });
  }, 750);
}

// Mode switching function
function startModeSwitch() {
  const body = document.body;
  let switchCount = 0;
  const maxSwitches = 16; // Switch 16 times (8 seconds at 0.5s intervals)
  
  body.classList.add('mode-switching');
  
  const switchInterval = setInterval(() => {
    if (switchCount >= maxSwitches) {
      clearInterval(switchInterval);
      body.classList.remove('mode-switching');
      return;
    }
    
    body.classList.toggle('light-mode');
    switchCount++;
  }, 500); // Switch every 0.5 seconds
}

drawButton.addEventListener('click', () => {
  // Fixed field structure - no longer customizable
  // Expect exactly two fields: Order and Name
  const expectedFields = 2;

  entries = nameList.value.trim().split('\n')
    .map(entry => entry.split(' - '))
    .filter(parts => parts.length === expectedFields);

  if (entries.length === 0) {
    winnerDisplay.textContent = `⚠️ No valid entries (expected ${expectedFields} fields)`;
    return;
  }

  let i = 0;
  const shuffle = setInterval(() => {
    const random = entries[Math.floor(Math.random() * entries.length)];
    
    // Build display string based on fixed field structure
    let displayHTML = '';
    let finalDisplayHTML = '';
    
    // Show only Order and Name
    const order = random[0] ? random[0].trim() : '';
    const name = random[1] ? random[1].trim() : '';
    const processedName = formatName(name);
    displayHTML += `🏆 <b>ORDER:</b> ${order}<br>`;
    displayHTML += `👤 <b>NAME:</b> ${processedName}`;
    finalDisplayHTML = displayHTML;
    
    // Remove last <br> and add winner styling for final display
    displayHTML = displayHTML.slice(0, -4);
    finalDisplayHTML = '🎉 ' + finalDisplayHTML.slice(0, -4) + ' 🎉';
    
    winnerDisplay.innerHTML = displayHTML;
    i++;
    if (i > 20) {
      clearInterval(shuffle);
      winnerDisplay.innerHTML = finalDisplayHTML;
      
      // CELEBRATION TIME! 🎉 (custom emoji confetti)
      winnerDisplay.classList.add('winner-celebration');
      const emojis = (window.giveawaySettings?.settings?.confetti?.emojis) || ['🎉','✨','🎁','⭐️'];
      emojiConfetti(emojis.slice(0, 10));

      // Hide the draw button to prevent re-running without reload
      const btn = document.getElementById('drawButton');
      if (btn) btn.style.display = 'none';
      startModeSwitch();
      
      // Keep final state; do not reset automatically
    }
  }, 100);
});
