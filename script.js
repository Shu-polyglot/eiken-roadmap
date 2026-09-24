// PRAVEQ: make each section arrive like the next page of an editorial.
const pages = document.querySelectorAll('main > section');

pages.forEach((page) => page.classList.add('page-turn'));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const pageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('page-open');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  pages.forEach((page) => pageObserver.observe(page));
} else {
  pages.forEach((page) => page.classList.add('page-open'));
}
