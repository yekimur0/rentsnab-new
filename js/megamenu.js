document.addEventListener('DOMContentLoaded', function () {
  var trigger = document.querySelector('.nav__catalog');
  var menu = document.querySelector('.megamenu');
  if (!trigger || !menu) return;

  var tabs = menu.querySelectorAll('.megamenu__tab');
  var panels = menu.querySelectorAll('.megamenu__panel');
  var isOpen = false;

  function open() {
    isOpen = true;
    menu.classList.add('is-open');
    trigger.classList.add('is-active');
  }

  function close() {
    isOpen = false;
    menu.classList.remove('is-open');
    trigger.classList.remove('is-active');
  }

  function toggle() {
    if (isOpen) close(); else open();
  }

  function setActiveTab(idx) {
    tabs.forEach(function (t, i) {
      t.classList.toggle('is-active', i === idx);
    });
    panels.forEach(function (p, i) {
      p.classList.toggle('is-active', i === idx);
    });
  }

  // Click catalog button to toggle
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  });

  // Tab switching
  tabs.forEach(function (tab, i) {
    tab.addEventListener('mouseenter', function () {
      setActiveTab(i);
    });
    tab.addEventListener('click', function () {
      setActiveTab(i);
    });
  });

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (isOpen && !menu.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
      close();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) close();
  });
});
