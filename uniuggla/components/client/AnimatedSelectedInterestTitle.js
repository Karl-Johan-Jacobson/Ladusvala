document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-title');
          // Optionally, you can stop observing after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // Trigger when at least 50% of the target is visible
    });
  
    const titleElement = document.querySelector('.selectedInterestTitle');
    if (titleElement) {
      observer.observe(titleElement);
    }
  });
  