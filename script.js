document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Loading Screen ---
  const loader = document.getElementById('loading-screen');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => (loader.style.display = 'none'), 500);
  }, 1000);

  // --- 2. Theme Toggle (Dark Mode) ---
  const themeBtn = document.getElementById('theme-btn');
  const body = document.body;
  const icon = themeBtn.querySelector('i');

  // Check local storage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // --- 3. Mobile Menu & Sticky Navbar ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  const progressBar = document.getElementById('progress-bar');
  const bttBtn = document.getElementById('btt-btn');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-times');
    hamburger.querySelector('i').classList.toggle('fa-bars');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
  });

  window.addEventListener('scroll', () => {
    // Sticky Header & Shadow
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Scroll Progress Bar
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';

    // Back to top button
    if (window.scrollY > 500) {
      bttBtn.classList.add('show');
    } else {
      bttBtn.classList.remove('show');
    }
  });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 4. Typing Effect ---
  const typedTextSpan = document.querySelector('.typing-text');
  const textArray = [
    'Smart Digital Marketing',
    'Data-Driven SEO',
    'High-Converting Ads',
    'Creative Branding',
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1,
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  // Start typing effect after slightly delaying
  setTimeout(type, 1500);

  // --- 5. Scroll Reveal & Counters & Progress Bars ---
  const reveals = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('.counter');
  const progressBars = document.querySelectorAll('.progress');

  const revealOnScroll = () => {
    let windowHeight = window.innerHeight;
    let elementVisible = 100;

    // Reveal Elements
    reveals.forEach(reveal => {
      let elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });

    // Trigger Counters
    counters.forEach(counter => {
      let elementTop = counter.getBoundingClientRect().top;
      if (
        elementTop < windowHeight - elementVisible &&
        counter.innerText == '0'
      ) {
        let target = +counter.getAttribute('data-target');
        let count = 0;
        let inc = target / 100; // Speed adjustment

        let updateCount = setInterval(() => {
          count += inc;
          if (count < target) {
            counter.innerText = Math.ceil(count);
          } else {
            counter.innerText = target;
            clearInterval(updateCount);
          }
        }, 15);
      }
    });

    // Trigger Skills Progress
    progressBars.forEach(bar => {
      let elementTop = bar.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        bar.style.width = bar.getAttribute('data-width');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // --- 6. Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (
          filterValue === 'all' ||
          item.getAttribute('data-category') === filterValue
        ) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 7. Testimonial Slider ---
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[n].classList.add('active');
    dots[n].classList.add('active');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Autoplay
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // --- 8. Modal System ---
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close-modal');
  const openBtns = document.querySelectorAll('.open-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let card = e.target.closest('.portfolio-item');
      let title = card.querySelector('h3').innerText;
      let imgSrc = card.querySelector('img').src;

      modalTitle.innerText = title;
      modalImg.src = imgSrc;
      modal.classList.add('show');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // --- 9. Form Validation ---
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    // Simple visual feedback
    let btn = contactForm.querySelector('button');
    let originalText = btn.innerText;

    btn.innerText = 'Sending...';
    btn.style.background = '#333';

    setTimeout(() => {
      alert('Message sent successfully! I will get back to you shortly.');
      contactForm.reset();
      btn.innerText = originalText;
      btn.style.background = 'var(--primary)';
    }, 1500);
  });

  // --- 10. Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  });
});
