const mobileBreakpoint = 1024;

const navHeaders = document.querySelectorAll(".site-header");

navHeaders.forEach((header) => {
  const navToggle = header.querySelector(".nav-toggle");
  const navPanel = header.querySelector(".nav-panel");

  if (!navToggle || !navPanel) {
    return;
  }

  const syncToggleState = (isOpen) => {
    navPanel.classList.toggle("is-open", isOpen);
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  };

  const closeMenu = () => syncToggleState(false);

  navToggle.addEventListener("click", () => {
    const nextState = !navPanel.classList.contains("is-open");
    syncToggleState(nextState);
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= mobileBreakpoint) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const handleResize = () => {
    if (window.innerWidth > mobileBreakpoint) {
      closeMenu();
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();
});
