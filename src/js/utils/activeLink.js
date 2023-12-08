export function getActiveLink() {
  const currentURL = window.location.href;

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.href === currentURL) {
      // Add the 'active' class if the href matches the current URL
      link.classList.add("active");
    }
  });
}
