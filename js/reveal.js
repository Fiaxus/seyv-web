/* Seyv — kaydırınca beliren öğeler.
   <head>'deki tek satır <html>'e "js" sınıfını ekler (CSS ancak o zaman gizler).
   Bu dosya [data-reveal] öğelerini izler, görünür alana girince "is-visible" ekler.
   Üst öğede data-stagger="80" varsa aynı anda girenler sırayla belirir. */
(function () {
  window.__seyvReveal = true; // <head>'deki 3 sn'lik yedek bunu bulamazsa "js" sınıfını kaldırır
  var root = document.documentElement;
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.remove('js');
    return;
  }
  root.classList.add('js');

  var io = new IntersectionObserver(function (entries) {
    var counts = new Map();
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var group = el.parentElement;
      var step = Number(group.getAttribute('data-stagger')) || 0;
      if (step) {
        var i = counts.get(group) || 0;
        el.style.transitionDelay = (i * step) + 'ms';
        counts.set(group, i + 1);
      }
      el.classList.add('is-visible');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
})();
