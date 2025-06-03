/**
 * @file JS file for the Guides components.
 */

(function guidesScript(Drupal) {
  Drupal.behaviors.guides = {
    attach(context) {
      // When we click on a guide navigation link, we link to the top of the
      // Guide content. This is fine for visual users, but for screen reader
      // users, the focus stays at the top of the page.
      // This function checks if the URL contains a hash, and if so, focuses on
      // the element with the corresponding ID.
      if (window.location.hash && window.location.hash.length > 1) {
        const [element] = once('guidecontent', window.location.hash, context);
        if (element) {
          element.focus();
        }
      }
    },
  };
})(Drupal);
