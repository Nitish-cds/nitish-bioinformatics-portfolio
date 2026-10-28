const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Load the project list from the Express API, with a graceful static fallback.
async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) return;
    const projects = await response.json();
    // The curated cards above intentionally remain styled as portfolio case studies.
    // The API endpoint is available for future dynamic rendering and testing.
    document.documentElement.dataset.apiProjects = String(projects.length);
  } catch (_error) {
    document.documentElement.dataset.apiProjects = 'offline';
  }
}
loadProjects();

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.classList.remove('error');
  status.textContent = 'Sending…';
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to send message.');
    status.textContent = result.message;
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'Something went wrong. Please try again.';
    status.classList.add('error');
  }
});
