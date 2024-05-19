/**
 * @file JS file for the subsites-menu component.
 */

(function subsitesMenuScript(Drupal) {
  Drupal.behaviors.subsitesMenu = {
    attach: function (context) {
      // This variable will be used later to make sure that the window
      // was actually resized.
      let windowWidth = window.innerWidth;

      const subsitesMenuToggle = document.querySelector(
        ".subsite-extra__header-toggle-button"
      );
      const subsitesMenu = document.querySelector(".subsite-extra-menu");

      subsitesMenuToggle.addEventListener("click", function () {
        subsitesMenuToggle.setAttribute(
          "aria-expanded",
          subsitesMenuToggle.getAttribute("aria-expanded") === "true"
            ? "false"
            : "true"
        );
        subsitesMenu.classList.toggle("subsite-extra-menu--active");
      });

      function handleReset() {
        subsitesMenuToggle.setAttribute("aria-expanded", "false");
        subsitesMenu.classList.remove("subsite-extra-menu--active");
      }

      // If the window is resized to more than 768px, reset the menu.
      function handleWindowResized() {
        if (window.innerWidth === windowWidth) {
          return;
        } else {
          windowWidth = window.innerWidth;
        }
        if (windowWidth > 768) {
          handleReset();
        }
      }

      // Close the menu when the escape key is pressed.
      context.addEventListener("keydown", function (e) {
        if (e.key == "Escape") {
          e.preventDefault();
          handleReset();
          subsitesMenuToggle.focus();
        }
      });

      // Close the menu when a click is made outside of it.
      document.addEventListener("click", function (e) {
        if (!e.target.closest("#lgd-header__nav--subsites-menu")) {
          handleReset();
        }
      });

      window.addEventListener(
        "resize",
        Drupal.debounce(handleWindowResized, 50, false)
      );
    },
  };
})(Drupal);
