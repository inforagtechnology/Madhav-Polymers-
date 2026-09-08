document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // On mobile, tapping a dropdown parent opens its submenu instead of navigating.
  var dropdownParents = document.querySelectorAll('.has-dropdown > a');
  dropdownParents.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 680) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
});
