// Dark / Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
themeToggle.addEventListener('click', () => {
  const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
});

// Typing Animation
const typingText = ["Frontend Developer", "Static Web Developer", "UI/UX Enthusiast"];
const typingTarget = document.getElementById("typing-target");
let i = 0, j = 0, currentText = '', isDeleting = false;
function type(){
  if(i >= typingText.length) i=0;
  currentText = typingText[i];
  if(!isDeleting){
    typingTarget.textContent = currentText.slice(0,j+1);
    j++;
    if(j === currentText.length){isDeleting = true; setTimeout(type,800);}
    else setTimeout(type,150);
  } else {
    typingTarget.textContent = currentText.slice(0,j-1);
    j--;
    if(j===0){isDeleting=false;i++;setTimeout(type,200);}
    else setTimeout(type,100);
  }
}
type();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Netlify AJAX form submit
const form = document.querySelector('.contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault(); // prevent default form submit
    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      body: data,
    }).then(response => {
      if(response.ok){
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    }).catch(() => {
      errorMsg.style.display = 'block';
      successMsg.style.display = 'none';
    });
  });
}
