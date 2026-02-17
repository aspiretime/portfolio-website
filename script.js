// Dark mode toggle functionality
function initializeDarkMode() {
  const themeToggle = document.getElementById('themeToggle');
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
  }
  
  themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isCurrentlyDark);
    themeToggle.textContent = isCurrentlyDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Project view functionality
window.viewProject = function(projectId) {
  alert(`Viewing Project ${projectId}! More details coming soon.`);
  console.log(`Opened project ${projectId}`);
};

// Form submission with validation
function initializeFormHandling() {
  const form = document.getElementById('contactForm');
  const feedbackDiv = document.getElementById('formFeedback');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSubmit(e);
    });
  }
}

window.handleSubmit = function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedbackDiv = document.getElementById('formFeedback');
  
  // Validation
  if (!name || !email || !message) {
    feedbackDiv.textContent = 'Please fill in all fields!';
    feedbackDiv.classList.add('error');
    feedbackDiv.classList.remove('success');
    return;
  }
  
  if (!isValidEmail(email)) {
    feedbackDiv.textContent = 'Please enter a valid email address!';
    feedbackDiv.classList.add('error');
    feedbackDiv.classList.remove('success');
    return;
  }
  
  // Success feedback
  feedbackDiv.textContent = `Thank you, ${name}! Your message has been received. We will get back to you soon.`;
  feedbackDiv.classList.add('success');
  feedbackDiv.classList.remove('error');
  
  // Store in localStorage
  const messages = JSON.parse(localStorage.getItem('messages') || '[]');
  messages.push({
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('messages', JSON.stringify(messages));
  
  // Reset form
  document.getElementById('contactForm').reset();
  
  // Clear feedback after 5 seconds
  setTimeout(() => {
    feedbackDiv.textContent = '';
    feedbackDiv.classList.remove('success', 'error');
  }, 5000);
};

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Intersection Observer for fade-in animations
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Add active state to navigation links
function initializeNavigation() {
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded!');
  initializeDarkMode();
  initializeSmoothScroll();
  initializeFormHandling();
  initializeIntersectionObserver();
  initializeNavigation();
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
