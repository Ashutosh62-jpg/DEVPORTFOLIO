// Dark / Light mode toggle with default dark and saving preference
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check localStorage or set default dark
const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else {
  root.setAttribute('data-theme', 'dark'); // default dark mode
}

// Toggle button
themeToggle.addEventListener('click', () => {
  const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme); // save user choice
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


// Netlify AJAX Form Submission
const form = document.querySelector('.contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

// Ensure messages are hidden on page load
if (successMsg) successMsg.style.display = 'none';
if (errorMsg) errorMsg.style.display = 'none';

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();  // prevent page reload

    const formData = new FormData(form);
    const encodedData = new URLSearchParams(formData).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedData
    })
    .then(response => {
      if (response.ok) {
        successMsg.style.display = "block";  // show success
        errorMsg.style.display = "none";     // hide error
        form.reset();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch(() => {
      errorMsg.style.display = "block";     // show error
      successMsg.style.display = "none";    // hide success
    });
  });
}