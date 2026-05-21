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

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (hamburger.innerHTML.includes('bars')) {
      hamburger.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ==========================
// DARK MODE
// ==========================
const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');

    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
});

// ==========================
// BACK TO TOP BUTTON
// ==========================
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  const progressBar = document.querySelector('.progress-bar');

  if (progressBar) {
    const scrollTotal =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (window.scrollY / scrollTotal) * 100;

    progressBar.style.width = `${progress}%`;
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// ==========================
// ACTIVE NAVIGATION LINK
// ==========================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// ==========================
// REVEAL ANIMATION
// ==========================
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  reveals.forEach(item => {
    const windowHeight = window.innerHeight;
    const revealTop = item.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ==========================
// SKILL BAR ANIMATION
// ==========================
const skillBars = document.querySelectorAll('.progress');

function animateSkills() {
  skillBars.forEach(bar => {
    const value = bar.getAttribute('data-width');
    if (value) {
      bar.style.width = value;
    }
  });
}

window.addEventListener('load', animateSkills);

// ==========================
// TESTIMONIAL SLIDER
// ==========================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

setInterval(() => {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}, 5000);

// ==========================
// PORTFOLIO FILTER
// ==========================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
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
    img: 'https://placehold.co/400x300/44C8AA/FFF?text=E-commerce+Ads',
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
    const data = projectData[index];
    modalTitle.textContent = data.title;
    modalImg.src = data.img;
    modalDesc.textContent = data.desc;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });
}

if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
}

// ==========================
// CURRENT YEAR
// ==========================
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}
