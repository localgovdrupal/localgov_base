/**
 * @file Handles IOS bug when trying to use skip link with keyboard.
 */

(function localgovSkiplink(Drupal) {
  Drupal.behaviors.skiplink = {
    attach: function (context) {
      const [anchor] = once('maincontent', '[href="#main-content"]', context);
      if (!anchor) {
        return;
      }
      anchor.addEventListener('keydown', (e) => {
        focusContent(e);
      });

      function focusContent(e) {
        const { key } = e;
        if (key === 'Enter') {
          var mainContent = document.querySelector('#main-content');
          mainContent.focus();
          mainContent.setAttribute('tabindex', 0);
        }
      }
    }
  };
}(Drupal));
