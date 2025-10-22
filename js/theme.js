const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme
if(localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
}

// Toggle theme
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light');
  if(body.classList.contains('light')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});
