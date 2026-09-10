/* ========================================================
   Madhav Polymers — Header / Footer loader
   Include this on every page:
     <div id="header-placeholder"></div>
     ...page content...
     <div id="footer-placeholder"></div>
     <script src="js/include.js"></script>
   ======================================================== */

(function () {
  async function loadInto(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
    }
  }

  function setActiveNavItem() {
    // Current file name, e.g. "about.html" (defaults to index.html for "/" )
    let current = window.location.pathname.split('/').pop();
    if (!current) current = 'index.html';

    document.querySelectorAll('.main-nav li[data-page]').forEach((li) => {
      li.classList.toggle('active', li.getAttribute('data-page') === current);
    });
  }

  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => nav.classList.toggle('open'));

    // Tap a dropdown label on mobile to expand it instead of following the link
    document.querySelectorAll('.has-dropdown > a').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 680) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });
  }

  function initSearch() {
    const form = document.getElementById('navSearchForm');
    const input = document.getElementById('navSearchInput');
    if (!form || !input) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      // Sends the visitor to the products page with their search term.
      // Update the target page / param name if you build a dedicated search results page.
      window.location.href = `products.html?q=${encodeURIComponent(query)}`;
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
      loadInto('header-placeholder', 'header.html'),
      loadInto('footer-placeholder', 'footer.html'),
    ]);

    setActiveNavItem();
    initHeaderScroll();
    initMobileMenu();
    initSearch();

    document.dispatchEvent(new CustomEvent('partialsLoaded'));
  });
})();



  function handleFormSubmit(event) {
    event.preventDefault();

    // 1. Enter target WhatsApp number (with Country Code, without + sign)
    const whatsappNumber = "919876543210"; // REPLACE WITH YOUR PHONE NUMBER

    // 2. Fetch input field values
    const name = document.getElementById('mpName').value.trim();
    const email = document.getElementById('mpEmail').value.trim();
    const phone = document.getElementById('mpPhone').value.trim() || 'Not provided';
    const details = document.getElementById('mpDetails').value.trim();

    // 3. Format the message for WhatsApp
    const whatsappMessage = `*New Project Inquiry*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Project Details:* ${encodeURIComponent(details)}`;

    // 4. Reveal success message bar
    const successAlert = document.getElementById('mpSuccessAlert');
    successAlert.style.display = 'block';

    // 5. Open WhatsApp chat in a new browser tab
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 400);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById("mpAboutSection");

    // IntersectionObserver triggers animation when 20% of section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("mp-active");
            observer.unobserve(entry.target); // Triggers animation once
          }
        });
      },
      { threshold: 0.2 }
    );

    if (section) {
      observer.observe(section);
    }
  });

   document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slider .slide");
  const prevBtn = document.querySelector(".hero-slider .prev-btn");
  const nextBtn = document.querySelector(".hero-slider .next-btn");

  let currentIndex = 0;
  const slideInterval = 6000; // 6 seconds per slide
  let timer;

  function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startTimer() {
    timer = setInterval(nextSlide, slideInterval);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // Button Listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });

  // Start autoplay
  startTimer();
});