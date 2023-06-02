/**
 * @file JS file for the Guides components.
 */

(function guidesScript(Drupal) {
  Drupal.behaviors.guides = {
    attach: function (context) {
      // When we click on a guide navigation link, we link to the top of the
      // Guide content. This is fine for visual users, but for screen reader
      // users, the focus stays at the top of the page.
      // This function checks if the URL contains a hash, and if so, focuses on
      // the element with the corresponding ID.
      const path = window.location.hash;
      // check if path links to id
      if (path.includes('#')) {
        const id = path.split('#')[1];
        const element = document.querySelector(`#${id}`);
        if (element) {
          element.focus();
        }
      }
    }
  };
}(Drupal));
