document.addEventListener('DOMContentLoaded', () => {
  // ==========================
  // LOADING SCREEN
  // ==========================
  window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  });

  // ==========================
  // MOBILE NAVIGATION
  // ==========================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('active');
      hamburger.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', e => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  // ==========================
  // DARK MODE
  // ==========================
  const themeToggle = document.querySelector('.theme-toggle');

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  }

  // ==========================
  // BACK TO TOP + SCROLL PROGRESS
  // ==========================
  const backToTop = document.querySelector('.back-to-top');
  const progressBar = document.querySelector('.progress-bar');

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 300);
    }
    if (progressBar) {
      const scrollTotal =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      progressBar.style.width = `${(window.scrollY / scrollTotal) * 100}%`;
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================
  // ACTIVE NAV LINK ON SCROLL
  // ==========================
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(link => {
      link.classList.remove('active');
      if (
        link.getAttribute('href') &&
        link.getAttribute('href').includes(current)
      ) {
        link.classList.add('active');
      }
    });
  });

  // ==========================
  // REVEAL ON SCROLL
  // ==========================
  const reveals = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    reveals.forEach(item => {
      if (item.getBoundingClientRect().top < window.innerHeight - 100) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ==========================
  // SKILL BAR ANIMATION
  // ==========================
  document.querySelectorAll('.progress').forEach(bar => {
    const value = bar.getAttribute('data-width');
    if (value) bar.style.width = value;
  });

  // ==========================
  // TESTIMONIAL SLIDER
  // ==========================
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      showSlide(i);
    });
  });

  if (slides.length > 1) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // ==========================
  // PORTFOLIO FILTER
  // ==========================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        item.style.display =
          filter === 'all' || item.getAttribute('data-category') === filter
            ? 'block'
            : 'none';
      });
    });
  });

  // ==========================
  // PORTFOLIO MODAL
  // ==========================
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');

  const projectData = [
    {
      title: 'E-commerce Ads Scale',
      img: 'https://placehold.co/400x300/FA6781/FFF?text=E-commerce+Ads',
      desc: 'Launched a full-funnel Meta Ads campaign for a DTC e-commerce brand. Through aggressive A/B testing of creatives and audience segmentation, we achieved a 300% ROAS within the first 30 days.',
    },
    {
      title: 'SaaS Organic Growth',
      img: 'https://placehold.co/400x300/000000/FFF?text=SaaS+SEO',
      desc: 'Developed a comprehensive content and backlink strategy for a B2B SaaS company. Targeted long-tail keywords and improved on-page SEO resulted in a 150% increase in organic traffic over 6 months.',
    },
    {
      title: 'Startup Rebrand',
      img: 'https://placehold.co/400x300/808080/FFF?text=Startup+Brand',
      desc: 'Executed a full visual and messaging overhaul for an early-stage startup — including new logo, brand guidelines, tone of voice, and website copy — resulting in a 40% increase in landing page conversions.',
    },
  ];

  document.querySelectorAll('.open-modal').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (!modal) return;
      if (modalTitle) modalTitle.textContent = projectData[index].title;
      if (modalImg) modalImg.src = projectData[index].img;
      if (modalDesc) modalDesc.textContent = projectData[index].desc;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modal)
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ==========================
  // CURRENT YEAR
  // ==========================
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}); // end DOMContentLoaded
