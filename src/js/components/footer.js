export function createFooter() {
  const footerTopCol = document.querySelector("#footer-top");

  const brandLink = document.createElement("a");
  brandLink.className = "navbar-brand";
  brandLink.href = "/index.html";
  brandLink.textContent = "Artful Bids";

  const brandSlogan = document.createElement("h5");
  brandSlogan.textContent = `Bidding on Beauty since 2023`;

  const horizontalLine = document.createElement("hr");

  footerTopCol.appendChild(brandLink);
  footerTopCol.appendChild(brandSlogan);
  footerTopCol.appendChild(horizontalLine);

  const footerMiddle1 = document.querySelector("#footer-middle-1");
  const footerMiddle2 = document.querySelector("#footer-middle-2");
  footerMiddle2.classList.add("mt-3");

  const aboutLink = document.createElement("a");
  aboutLink.href = "/pages/about.html";
  aboutLink.textContent = "About";

  const contactLink = document.createElement("a");
  contactLink.href = "/pages/contact.html";
  contactLink.textContent = "Contact";

  footerMiddle1.appendChild(aboutLink);
  footerMiddle1.appendChild(contactLink);

  const instagramLink = document.createElement("a");
  instagramLink.href = `https://www.instagram.com/`;
  instagramLink.textContent = "Instagram";

  const facebookLink = document.createElement("a");
  facebookLink.href = `https://www.facebook.com`;
  facebookLink.textContent = "Facebook";

  footerMiddle2.appendChild(instagramLink);
  footerMiddle2.appendChild(facebookLink);

  const copyrightContainer = document.querySelector("#footer-bottom");
  const copyright = document.createElement("p");
  copyright.classList.add("text-center", "mb-0", "p-2", "copyright-text");
  copyright.textContent = `@2023 Artful Bids`;

  copyrightContainer.appendChild(copyright);
}
