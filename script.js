document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('active');
  }

  menuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll Animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // --- Added for Service Pages ---
  // Mobile Dropdown Services Toggle
  const mobileServicesBtn = document.getElementById('mobile-services-btn');
  const mobileServicesDropdown = document.getElementById('mobile-services-dropdown');
  if (mobileServicesBtn && mobileServicesDropdown) {
    mobileServicesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileServicesDropdown.classList.toggle('active');
    });
  }

  // Lead Generation Modal HTML (Injected Globally)
  const modalHTML = `
    <div class="modal-overlay" id="lead-modal-overlay">
      <div class="modal-box">
        <button class="modal-close" id="modal-close-btn">&times;</button>
        <h2 style="margin-bottom: 20px; font-size: 1.8rem;">Request <span class="gradient-text">Package</span></h2>
        <form class="modal-form" action="https://formsubmit.co/lankaknot@gmail.com" method="POST">
          <input type="hidden" name="_subject" id="modal-hidden-subject" value="New Service Inquiry">
          <input type="hidden" name="_captcha" value="false">
          
          <div class="form-group">
            <label for="modal-name">Full Name</label>
            <input type="text" id="modal-name" name="name" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="modal-phone">Contact Number</label>
            <input type="tel" id="modal-phone" name="phone" class="form-control" placeholder="+94 77 123 4567" required>
          </div>
          <div class="form-group">
            <label for="modal-email">Email Address</label>
            <input type="email" id="modal-email" name="email" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="modal-budget">Estimated Budget</label>
            <select id="modal-budget" name="budget" class="form-control" style="appearance: none;">
              <option value="Not sure">Not sure yet</option>
              <option value="Under $500">Under $500</option>
              <option value="$500 - $1,500">$500 - $1,500</option>
              <option value="$1,500 - $5,000">$1,500 - $5,000</option>
              <option value="$5,000+">$5,000+</option>
            </select>
          </div>
          <div class="form-group">
            <label for="modal-reqs">Private Requirements / Details</label>
            <textarea id="modal-reqs" name="requirements" rows="4" class="form-control" placeholder="Tell us what you need..." required></textarea>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%;">Submit Inquiry</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Modal Logic
  const modalOverlay = document.getElementById('lead-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalHiddenSubject = document.getElementById('modal-hidden-subject');

  // Listen for package button clicks anywhere
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('package-select-btn')) {
      const packageName = e.target.getAttribute('data-package') || 'Custom Package';
      modalHiddenSubject.value = "Inquiry: " + packageName;
      modalOverlay.classList.add('active');
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Chatbot Initialization
  const chatbotHTML = `
    <div class="chatbot-container">
      <div class="chatbot-window" id="chatbot-window">
        <div class="chatbot-header">
          <span>🤖 Lankaknot Assistant</span>
          <button class="chatbot-close" id="chatbot-close">&times;</button>
        </div>
        <div class="chatbot-messages" id="chatbot-messages">
          <div class="chat-msg bot">Hi there! I am the Lankaknot AI. How can I help you today?</div>
        </div>
        <div class="chatbot-input-area">
          <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Type a message...">
          <button class="chatbot-send" id="chatbot-send">Send</button>
        </div>
      </div>
      <button class="chatbot-button" id="chatbot-btn">💬</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const chatBtn = document.getElementById('chatbot-btn');
  const chatWindow = document.getElementById('chatbot-window');
  const chatClose = document.getElementById('chatbot-close');
  const chatInput = document.getElementById('chatbot-input');
  const chatSend = document.getElementById('chatbot-send');
  const chatMessages = document.getElementById('chatbot-messages');

  chatBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message to UI
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = text;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Loading indicator
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'chat-msg bot';
    loadingMsg.textContent = 'Thinking...';
    chatMessages.appendChild(loadingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      // Reverting back to Google Gemini because your firewall blocked the free Pollinations server
      const apiKey = "AIzaSyDLw7_bQryOkn9TOcict-uHpMJQQO5m1w0";

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: "Context: You are the Lankaknot Assistant, a friendly and helpful AI for Lankaknot Technologies and its sub-brand Kool Productions. Lankaknot offers Web Development, Software Development, and Digital Marketing. Kool Productions offers Videography and Photography. Keep responses brief.\n\nUser: " + text }]
          }]
        })
      });

      const data = await response.json();
      loadingMsg.remove();

      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg bot';

      if (data.candidates && data.candidates.length > 0) {
        botMsg.innerHTML = data.candidates[0].content.parts[0].text.replace(/\n/g, "<br>");
      } else if (data.error) {
        botMsg.textContent = "Google API Error: " + (data.error.message || "Invalid Key");
      } else {
        botMsg.textContent = "Sorry, there was an issue connecting to the AI.";
      }
      chatMessages.appendChild(botMsg);

    } catch (err) {
      loadingMsg.remove();
      const errorMsg = document.createElement('div');
      errorMsg.className = 'chat-msg bot';
      errorMsg.textContent = "Connection error. Please check your network.";
      chatMessages.appendChild(errorMsg);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

});
