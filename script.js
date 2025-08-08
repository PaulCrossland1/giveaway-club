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
  const fieldStructure = [
    { name: "Order", emoji: "🏆" },
    { name: "Name", emoji: "👤" },
    { name: "Country", emoji: "🌍" }
  ];
  
  const expectedFields = fieldStructure.length;
  
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
    
    fieldStructure.forEach((field, index) => {
      const value = random[index] ? random[index].trim() : '';
      const processedValue = field.name.toLowerCase() === 'name' ? formatName(value) : value;
      
      displayHTML += `${field.emoji} <b>${field.name.toUpperCase()}:</b> ${processedValue}<br>`;
      finalDisplayHTML += `${field.emoji} <b>${field.name.toUpperCase()}:</b> ${processedValue}<br>`;
    });
    
    // Remove last <br> and add winner styling for final display
    displayHTML = displayHTML.slice(0, -4);
    finalDisplayHTML = '🎉 ' + finalDisplayHTML.slice(0, -4) + ' 🎉';
    
    winnerDisplay.innerHTML = displayHTML;
    i++;
    if (i > 20) {
      clearInterval(shuffle);
      winnerDisplay.innerHTML = finalDisplayHTML;
      
      // CELEBRATION TIME! 🎉
      winnerDisplay.classList.add('winner-celebration');
      createConfettiExplosion();
      startModeSwitch();
      
      // Remove celebration class after animation
      setTimeout(() => {
        winnerDisplay.classList.remove('winner-celebration');
      }, 500);
    }
  }, 100);
});
