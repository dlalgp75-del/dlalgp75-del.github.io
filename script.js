const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const topButton = document.querySelector('.top-button');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.textContent = isOpen ? '메뉴' : '닫기';
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (!event.target.matches('a')) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '메뉴';
  siteNav.classList.remove('is-open');
});

document.querySelectorAll('.accordion-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const panel = item.querySelector('.accordion-panel');
    const toggle = item.querySelector('.toggle');
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!isOpen));
    item.classList.toggle('is-open', !isOpen);
    panel.hidden = isOpen;
    toggle.textContent = isOpen ? '+' : '−';
  });
});

function updateTopButton() {
  topButton.classList.toggle('is-visible', window.scrollY > 500);
}

topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', updateTopButton, { passive: true });
document.querySelector('#year').textContent = new Date().getFullYear();
updateTopButton();
