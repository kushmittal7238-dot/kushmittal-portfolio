/**
 * KUSH MITTAL - Portfolio Application Logic
 * Typewriter (3 exact roles: Data Analyst, Student, Freelancer),
 * 3D Card Tilt, 1-Touch Resume Download, Direct Gmail Sending, Modals & Confetti.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 2. Typewriter Effect (Exactly: Data Analyst, Student, Freelancer)
  initTypewriter();

  // 3. 3D Card Tilt Effects
  init3DTilt();

  // 4. 1-Touch Resume Auto-Download Handler
  initResumeDownload();

  // 5. "Send a Message" Form Handler (Direct Gmail routing)
  initContactForm();

  // 6. Navigation & Mobile Drawer
  initNavigation();

  // 7. Modals
  initModals();

  // 8. 3D Holographic Quantum Chamber Magnetic Engine
  initQuantumChambers3D();

  // 9. 3D Perspective Screen Tilt Simulator (Data Pipeline)
  initPipeline3DTilt();
});

/* ==========================================================================
   Typewriter Effect (Only 3 Specified Roles)
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const phrases = [
    'BCA GRADUATED',
    'DATA ANALYST',
    'FREELANCER',
    'STUDENT'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1600;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3D Tilt Effect on Cards
   ========================================================================== */
function init3DTilt() {
  const tiltElements = document.querySelectorAll('.tilt-card');

  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   1-Touch Resume Download Handler
   ========================================================================== */
function initResumeDownload() {
  const downloadBtns = document.querySelectorAll('.trigger-resume-download');
  const googleDriveDirectUrl = 'https://drive.google.com/uc?export=download&id=1G1ClLI-ylaNao9tiNFKkXD-fwYZtaDqO';

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Confetti burst
      triggerConfetti();

      // Feedback animation
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 inline animate-bounce"></i> <span>DOWNLOADING RESUME...</span>`;
      if (window.lucide) window.lucide.createIcons();

      // Trigger download
      const link = document.createElement('a');
      link.href = googleDriveDirectUrl;
      link.target = '_blank';
      link.download = 'Kush_Mittal_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Toast notification
      showToast('🎉 Resume PDF is downloading! Direct Drive link launched.');

      setTimeout(() => {
        btn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
      }, 3000);
    });
  });
}

/* ==========================================================================
   "Send a Message" Form Handler (Direct to Gmail)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name')?.value.trim();
    const email = document.getElementById('sender-email')?.value.trim();
    const subject = document.getElementById('sender-subject')?.value.trim() || 'Portfolio Contact Inquiry';
    const message = document.getElementById('sender-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all required fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 inline animate-spin"></i> Preparing Email...`;
    if (window.lucide) window.lucide.createIcons();

    const mailtoBody = encodeURIComponent(
      `Hi Kush Mittal,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Portfolio Website.`
    );
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
    const mailtoUri = `mailto:kushmittal7238@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      window.location.href = mailtoUri;
      triggerConfetti();
      showToast(`✨ Thank you ${name}! Email draft to kushmittal7238@gmail.com is ready.`, 'success');

      if (statusDiv) {
        statusDiv.classList.remove('hidden');
        statusDiv.innerHTML = `
          <div class="p-4 rounded-xl bg-gold-950/80 border border-gold-500/50 text-gold-300 flex items-center gap-3">
            <i data-lucide="check-circle" class="w-6 h-6 shrink-0 text-[#D4AF37]"></i>
            <div>
              <p class="font-bold">Message Ready to Send!</p>
              <p class="text-xs text-gold-200/80">Opening your default mail client to deliver directly to <strong>kushmittal7238@gmail.com</strong>.</p>
            </div>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      if (window.lucide) window.lucide.createIcons();
      form.reset();
    }, 800);
  });
}

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link');
  let isManualScrolling = false;
  let scrollTimeout = null;

  // Mobile Drawer Toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileDrawer.classList.add('hidden');
      }
    });
  }

  // Helper to set active link class cleanly
  function setActiveLink(targetHref) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === targetHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth Scroll on Link Click with Header Offset & Scroll-Spy Lock
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          if (mobileDrawer) mobileDrawer.classList.add('hidden');
          
          isManualScrolling = true;
          setActiveLink(href);

          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          if (scrollTimeout) clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isManualScrolling = false;
          }, 850);
        }
      }
    });
  });

  // Accurate Scroll Spy Engine using Absolute Document Coordinates
  const navSections = Array.from(document.querySelectorAll('section[id]')).filter(sec => {
    const id = sec.getAttribute('id');
    return document.querySelector(`.nav-link[href="#${id}"]`) !== null;
  });

  function updateActiveNav() {
    if (isManualScrolling) return;

    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.documentElement.scrollHeight;

    // 1. Bottom of page check -> Activate #contact
    if (scrollY + windowHeight >= bodyHeight - 60) {
      setActiveLink('#contact');
      return;
    }

    // 2. Exact Header Center Offset Position
    const triggerPosition = scrollY + 110;
    let currentId = 'home';

    navSections.forEach(section => {
      const absoluteTop = section.getBoundingClientRect().top + window.pageYOffset;
      if (triggerPosition >= absoluteTop) {
        currentId = section.getAttribute('id');
      }
    });

    setActiveLink(`#${currentId}`);
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* ==========================================================================
   Modal Handlers
   ========================================================================== */
function initModals() {
  const modalCloseBtns = document.querySelectorAll('[data-close-modal]');
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) modal.classList.add('hidden');
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
}

function openProjectModal(projectId) {
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'error' ? 'bg-red-950/90 border-red-500/50 text-red-200' : 'bg-slate-900/90 border-gold-500/50 text-gold-200';
  
  toast.className = `p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto flex items-center gap-3 ${bgClass}`;
  toast.innerHTML = `
    <div class="text-sm font-medium leading-snug">${message}</div>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

/* ==========================================================================
   Confetti Burst Utility (Cyan & Violet)
   ========================================================================== */
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#0284C7', '#0ea5e9', '#38BDF8', '#ffffff']
    });
  }
}

window.openProjectModal = openProjectModal;
window.triggerConfetti = triggerConfetti;

/* ==========================================================================
   3D Holographic Quantum Chamber Magnetic Tilt Engine
   ========================================================================== */
function initQuantumChambers3D() {
  const chambers = document.querySelectorAll('.quantum-chamber');
  if (!chambers.length) return;

  const isMobile = () => window.innerWidth < 768;

  chambers.forEach((chamber) => {
    const frame = chamber.querySelector('.chamber-frame');
    if (!frame) return;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let isHovering = false;
    let animId = null;

    function renderChamberTilt() {
      currentTiltX += (targetTiltX - currentTiltX) * 0.1;
      currentTiltY += (targetTiltY - currentTiltY) * 0.1;

      frame.style.transform = `perspective(1600px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) translateZ(10px)`;

      if (isHovering || Math.abs(targetTiltX - currentTiltX) > 0.02 || Math.abs(targetTiltY - currentTiltY) > 0.02) {
        animId = requestAnimationFrame(renderChamberTilt);
      } else {
        frame.style.transform = 'none';
        animId = null;
      }
    }

    if (!isMobile()) {
      chamber.addEventListener('mousemove', (e) => {
        isHovering = true;
        const rect = chamber.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetTiltX = (y - centerY) / centerY * -2.8;
        targetTiltY = (x - centerX) / centerX * 2.8;

        if (!animId) animId = requestAnimationFrame(renderChamberTilt);
      });

      chamber.addEventListener('mouseleave', () => {
        isHovering = false;
        targetTiltX = 0;
        targetTiltY = 0;
        if (!animId) animId = requestAnimationFrame(renderChamberTilt);
      });
    }
  });
}

/* ==========================================================================
   3D Perspective Screen Tilt Simulator (Data Analytics Pipeline)
   ========================================================================== */
function initPipeline3DTilt() {
  const viewport = document.getElementById('pipeline-viewport');
  const board = document.getElementById('pipeline-board');
  if (!viewport || !board) return;

  let currentTiltX = 4;
  let currentTiltY = 0;
  let targetTiltX = 4;
  let targetTiltY = 0;
  let isHovered = false;
  let animFrameId = null;

  function updateTilt() {
    currentTiltX += (targetTiltX - currentTiltX) * 0.12;
    currentTiltY += (targetTiltY - currentTiltY) * 0.12;

    board.style.transform = `perspective(1600px) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;

    if (isHovered || Math.abs(targetTiltX - currentTiltX) > 0.02 || Math.abs(targetTiltY - currentTiltY) > 0.02) {
      animFrameId = requestAnimationFrame(updateTilt);
    } else {
      animFrameId = null;
    }
  }

  function startTiltAnimation() {
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(updateTilt);
    }
  }

  viewport.addEventListener('mousemove', (e) => {
    isHovered = true;
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Up to 8deg tilt in X and Y
    targetTiltX = (y - centerY) / centerY * -7;
    targetTiltY = (x - centerX) / centerX * 7;

    startTiltAnimation();
  });

  viewport.addEventListener('mouseleave', () => {
    isHovered = false;
    targetTiltX = 3;
    targetTiltY = 0;
    startTiltAnimation();
  });

  // Touch support for mobile devices
  viewport.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = viewport.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetTiltX = (y - centerY) / centerY * -5;
      targetTiltY = (x - centerX) / centerX * 5;
      startTiltAnimation();
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    targetTiltX = 3;
    targetTiltY = 0;
    startTiltAnimation();
  });
}

