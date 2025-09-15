// Settings management for the giveaway application
class GiveawaySettings {
  constructor() {
    this.defaultSettings = {
      title: {
        text: "YOUR GIVEAWAY"
      },
      theme: {
        darkMode: true
      },
      logo: {
        dataUrl: null
      },
      confetti: {
        emojis: ['🎉','✨','🎁','⭐️']
      },
      background: {
        dataUrl: null
      }
    };

    this.settings = this.loadSettings();
    this.currentTab = 'general';
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateUI();
    this.updateEntryPreview();
  }

  bindEvents() {
    // Settings modal controls
    document.getElementById('settingsIcon').addEventListener('click', () => this.openSettings());
    document.getElementById('settingsClose').addEventListener('click', () => this.closeSettings());
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });

    // Form controls
    document.getElementById('titleText').addEventListener('input', (e) => this.updateTitle());
    document.getElementById('darkModeToggle').addEventListener('change', (e) => this.toggleTheme());

    // CSV upload and entry management
    document.getElementById('csvFileInput').addEventListener('change', (e) => this.handleCSVUpload(e));
    document.getElementById('clearEntries').addEventListener('click', () => this.clearAllEntries());
    document.getElementById('downloadSample').addEventListener('click', () => this.downloadSampleCSV());
    document.getElementById('nameList').addEventListener('input', () => this.updateEntryPreview());

    // Logo upload/remove
    const logoInput = document.getElementById('logoFileInput');
    if (logoInput) logoInput.addEventListener('change', (e) => this.handleLogoUpload(e));
    const removeLogoBtn = document.getElementById('removeLogo');
    if (removeLogoBtn) removeLogoBtn.addEventListener('click', () => this.removeLogo());

    // Background upload/remove
    const bgInput = document.getElementById('bgFileInput');
    if (bgInput) bgInput.addEventListener('change', (e) => this.handleBackgroundUpload(e));
    const removeBgBtn = document.getElementById('removeBackground');
    if (removeBgBtn) removeBgBtn.addEventListener('click', () => this.removeBackground());

    // Settings actions
    document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
    document.getElementById('resetSettings').addEventListener('click', () => this.resetSettings());

    // Emoji input
    const emojiInputEl = document.getElementById('emojiInput');
    if (emojiInputEl) emojiInputEl.addEventListener('input', (e) => this.updateEmojis(e));

    // Close modal on backdrop click
    document.getElementById('settingsModal').addEventListener('click', (e) => {
      if (e.target.id === 'settingsModal') {
        this.closeSettings();
      }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('settingsModal').style.display === 'block') {
        this.closeSettings();
      }
    });
  }

  openSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
  }

  closeSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    this.currentTab = tabName;
  }

  updateTitle() {
    const titleText = document.getElementById('titleText').value;
    this.settings.title = { text: titleText };
    document.getElementById('mainTitle').textContent = `🎁 ${titleText} 🎁`;
  }

  toggleTheme() {
    const isDarkMode = document.getElementById('darkModeToggle').checked;
    this.settings.theme.darkMode = isDarkMode;
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;
    if (this.settings.theme.darkMode) {
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
    }
  }

  handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n').map(line => line.trim()).filter(line => line);
        
        if (lines.length === 0) {
          this.showNotification('CSV file is empty', 'error');
          return;
        }

        // Check if first line contains headers (Order,Name)
        const firstLine = lines[0].toLowerCase();
        const hasOrder = firstLine.includes('order');
        const hasName = firstLine.includes('name');
        const hasHeaders = hasOrder && hasName;
        
        let entries = [];
        let startIndex = hasHeaders ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const line = lines[i];
          // Handle both comma and semicolon separated values
          const parts = line.split(/[,;]/).map(part => part.trim().replace(/^["']|["']$/g, ''));
          
          if (parts.length >= 2) {
            // Format: Order - Name
            const order = parts[0];
            const name = parts[1];
            entries.push(`${order} - ${name}`);
          }
        }

        if (entries.length === 0) {
          this.showNotification('No valid entries found in CSV', 'error');
          return;
        }

        // Update textarea with parsed entries
        const nameList = document.getElementById('nameList');
        nameList.value = entries.join('\n');
        
        this.updateEntryPreview();
        this.showNotification(`Successfully imported ${entries.length} entries from CSV`, 'success');
        
      } catch (error) {
        console.error('Error parsing CSV:', error);
        this.showNotification('Error parsing CSV file', 'error');
      }
    };

    reader.readAsText(file);
  }

  clearAllEntries() {
    if (confirm('Are you sure you want to clear all entries?')) {
      document.getElementById('nameList').value = '';
      document.getElementById('csvFileInput').value = '';
      this.updateEntryPreview();
      this.showNotification('All entries cleared', 'success');
    }
  }

  downloadSampleCSV() {
    const sampleData = `Order,Name
#001,John Smith
#002,Maria Garcia
#003,Ahmed Hassan
#004,Sarah Johnson
#005,Hiroshi Tanaka
#006,Emma Wilson
#007,Pierre Dubois
#008,Anna Kowalski
#009,Carlos Rodriguez
#010,Priya Sharma`;

    const blob = new Blob([sampleData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'sample-giveaway-entries.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showNotification('Sample CSV downloaded successfully!', 'success');
    }
  }

  updateEntryPreview() {
    const nameList = document.getElementById('nameList');
    const entryPreview = document.getElementById('entryPreview');
    const entryCount = document.getElementById('entryCount');
    const entryListDisplay = document.getElementById('entryListDisplay');

    const entries = nameList.value.trim().split('\n')
      .map(entry => entry.trim())
      .filter(entry => entry);

    if (entries.length === 0) {
      entryPreview.style.display = 'none';
      return;
    }

    // Validate entries
    const validEntries = entries.filter(entry => {
      const parts = entry.split(' - ');
      return parts.length === 2;
    });

    const invalidCount = entries.length - validEntries.length;

    entryCount.innerHTML = `
      <strong>Total entries:</strong> ${entries.length}<br>
      <strong>Valid entries:</strong> ${validEntries.length}
      ${invalidCount > 0 ? `<br><span style="color: #dc3545;">Invalid entries: ${invalidCount}</span>` : ''}
    `;

    // Show preview of first 10 valid entries
    const previewEntries = validEntries.slice(0, 10);
    entryListDisplay.innerHTML = previewEntries.map(entry => {
      const parts = entry.split(' - ');
      return `<div>🏆 ${parts[0]} - 👤 ${parts[1]}</div>`;
    }).join('');

    if (validEntries.length > 10) {
      entryListDisplay.innerHTML += `<div style="font-style: italic; color: #888;">... and ${validEntries.length - 10} more entries</div>`;
    }

    entryPreview.style.display = 'block';
  }

  updateUI() {
    // Update form fields with current settings
    document.getElementById('titleText').value = this.settings.title.text;
    document.getElementById('darkModeToggle').checked = this.settings.theme.darkMode;
    
    // Update title display
    const { title } = this.settings;
    document.getElementById('mainTitle').textContent = `🎁 ${title.text} 🎁`;
    
    // Populate confetti emojis input
    const emojiInput = document.getElementById('emojiInput');
    if (emojiInput) emojiInput.value = (this.settings.confetti?.emojis || []).join('');

    // Apply theme
    this.applyTheme();

    // Render logo if exists
    this.renderLogo();

    // Apply background if exists
    this.applyBackground();
  }

  updateEmojis(e) {
    const raw = (e.target.value || '').trim();
    const arr = Array.from(raw);
    const unique = [];
    for (const ch of arr) {
      if (!unique.includes(ch)) unique.push(ch);
      if (unique.length >= 10) break;
    }
    if (!this.settings.confetti) this.settings.confetti = { emojis: [] };
    this.settings.confetti.emojis = unique;
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('giveawaySettings');
      return saved ? { ...this.defaultSettings, ...JSON.parse(saved) } : this.defaultSettings;
    } catch (e) {
      console.error('Error loading settings:', e);
      return this.defaultSettings;
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('giveawaySettings', JSON.stringify(this.settings));
      this.showNotification('Settings saved successfully!', 'success');
    } catch (e) {
      console.error('Error saving settings:', e);
      this.showNotification('Error saving settings', 'error');
    }
  }

  handleLogoUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.showNotification('Please upload a PNG or JPEG image', 'error');
      return;
    }
    if (file.size > 1024 * 1024) { // ~1MB limit
      this.showNotification('Image too large (max ~1MB)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.settings.logo.dataUrl = reader.result;
      this.renderLogo();
      this.showNotification('Logo uploaded', 'success');
    };
    reader.onerror = () => this.showNotification('Error reading logo file', 'error');
    reader.readAsDataURL(file);
  }

  removeLogo() {
    this.settings.logo.dataUrl = null;
    this.renderLogo();
    const input = document.getElementById('logoFileInput');
    if (input) input.value = '';
    this.showNotification('Logo removed', 'success');
  }

  renderLogo() {
    const container = document.getElementById('logoContainer');
    const img = document.getElementById('logoImage');
    const dataUrl = this.settings.logo && this.settings.logo.dataUrl;
    if (container && img) {
      if (dataUrl) {
        img.src = dataUrl;
        container.style.display = 'flex';
      } else {
        img.removeAttribute('src');
        container.style.display = 'none';
      }
    }
  }

  handleBackgroundUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.showNotification('Please upload a PNG or JPEG image', 'error');
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // ~2MB limit
      this.showNotification('Image too large (max ~2MB)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.settings.background.dataUrl = reader.result;
      this.applyBackground();
      this.showNotification('Background set', 'success');
    };
    reader.onerror = () => this.showNotification('Error reading background image', 'error');
    reader.readAsDataURL(file);
  }

  removeBackground() {
    this.settings.background.dataUrl = null;
    const input = document.getElementById('bgFileInput');
    if (input) input.value = '';
    this.applyBackground();
    this.showNotification('Background removed', 'success');
  }

  applyBackground() {
    const dataUrl = this.settings.background && this.settings.background.dataUrl;
    const body = document.body;
    if (dataUrl) {
      body.style.backgroundImage = `url('${dataUrl}')`;
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center center';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundAttachment = 'fixed';
    } else {
      body.style.backgroundImage = "url('background.png')"; // fallback to default if present
    }
  }

  resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
      this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
      this.updateUI();
      localStorage.removeItem('giveawaySettings');
      this.showNotification('Settings reset to default', 'success');
    }
  }

  showNotification(message, type = 'info') {
    // Create a simple toast notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      transition: opacity 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }
}

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.giveawaySettings = new GiveawaySettings();
});
