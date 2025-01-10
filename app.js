
const menu = document.querySelector('#mobile-menu'); // < mobile menu button class 
const menuLinks = document.querySelector('.navbar__menu');
menu.addEventListener('click', function() { // < function menu classlist
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});
