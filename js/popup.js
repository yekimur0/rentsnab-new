document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('reqPopup');
  if (!overlay) return;

  var closeBtn = overlay.querySelector('.req-popup__close');

  function open() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // All buttons that should open the popup
  var triggers = document.querySelectorAll(
    '.btn--orange, .header__callback, .footer__callback, .footer__btn, .megamenu__cta-btn, .cta__btn, .hero__btn'
  );

  triggers.forEach(function (btn) {
    // Skip buttons that are form submits or have real href
    var href = btn.getAttribute('href');
    if (btn.type === 'submit') return;
    if (href && href !== '#' && href !== '') return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });
  });

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', close);
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
});
