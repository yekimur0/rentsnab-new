document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (!burger || !nav) return;

  // Create close header inside nav for mobile
  var closeDiv = document.createElement('div');
  closeDiv.className = 'nav__close';

  var logoClone = document.querySelector('.logo');
  if (logoClone) {
    var logoLink = document.createElement('a');
    logoLink.href = 'index.html';
    logoLink.className = 'logo';
    logoLink.innerHTML = logoClone.innerHTML;
    closeDiv.appendChild(logoLink);
  }

  var closeBtn = document.createElement('button');
  closeBtn.className = 'nav__close-btn';
  closeBtn.setAttribute('aria-label', 'Закрыть меню');
  closeBtn.innerHTML = '&times;';
  closeDiv.appendChild(closeBtn);

  nav.insertBefore(closeDiv, nav.firstChild);

  function openMenu() {
    nav.classList.add('is-open');
    burger.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    burger.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener('click', closeMenu);

  // Close on link click
  var navLinks = nav.querySelectorAll('.nav__list a, .nav__offer');
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
});
