(function () {
  var root = document.documentElement;

  // Dark / light toggle
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.dataset.theme ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Collapse long news list
  document.querySelectorAll('.more').forEach(function (btn) {
    var list = document.querySelector(btn.dataset.target);
    if (!list) return;
    list.classList.add('is-collapsed');
    btn.addEventListener('click', function () {
      var collapsed = list.classList.toggle('is-collapsed');
      btn.textContent = collapsed ? 'Show all news' : 'Show less';
    });
  });

  // Publication filter
  var buttons = document.querySelectorAll('.filter button');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      var leadOnly = btn.dataset.filter === 'lead';
      document.querySelectorAll('.year-group').forEach(function (group) {
        var visible = 0;
        group.querySelectorAll('.pub').forEach(function (pub) {
          var show = !leadOnly || pub.dataset.lead === 'true';
          pub.hidden = !show;
          if (show) visible++;
        });
        group.classList.toggle('is-empty', visible === 0);
      });
    });
  });

  // Highlight current section in the nav
  var links = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-current'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('is-current');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
})();
