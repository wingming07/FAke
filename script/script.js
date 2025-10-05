/* ----- Simple interactive JS: countdown, testimonials, newsletter ----- */

document.addEventListener('DOMContentLoaded', function () {
  startCountdown();
  setupTestimonials();
  setupNewsletter();
  setupSmoothScroll();
});

/* 1) Countdown - set offer to 6 hours from page load (you can change). */
function startCountdown() {
  const countdownEl = document.getElementById('countdown');
  // Offer ends 6 hours from now
  const offerEnd = Date.now() + 6 * 60 * 60 * 1000;

  function pad(n) { return n < 10 ? '0' + n : n; }

  const timer = setInterval(() => {
    const now = Date.now();
    const diff = offerEnd - now;

    if (diff <= 0) {
      countdownEl.textContent = 'Offer expired';
      clearInterval(timer);
      return;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
  }, 1000);
}

/* 2) Testimonials auto-rotate with prev/next */
function setupTestimonials() {
  const slider = document.getElementById('testi-slider');
  if (!slider) return;

  const items = Array.from(slider.querySelectorAll('.testi-item'));
  let index = 0;
  function show(i) {
    items.forEach((it, idx) => it.classList.toggle('active', idx === i));
  }
  show(index);

  // next/prev buttons
  const prevBtn = document.querySelector('.testi-nav.prev');
  const nextBtn = document.querySelector('.testi-nav.next');
  prevBtn && prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length; show(index);
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length; show(index);
  });

  // auto rotate
  setInterval(() => {
    index = (index + 1) % items.length;
    show(index);
  }, 5000);
}

/* 3) Newsletter form: validate and give feedback (stores email to localStorage) */
function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const msg = document.getElementById('newsletter-msg');

  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (emailInput.value || '').trim();
    if (!validateEmail(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#cc3333';
      return;
    }
    // store (simulate subscribe)
    const subs = JSON.parse(localStorage.getItem('nameit_subs') || '[]');
    if (!subs.includes(email)) subs.push(email);
    localStorage.setItem('nameit_subs', JSON.stringify(subs));
    msg.textContent = 'Thanks for subscribing! Check your email for offers.';
    msg.style.color = '';
    emailInput.value = '';
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* 4) Smooth scroll for internal anchors */
function setupSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
}
