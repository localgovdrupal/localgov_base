/**
 * @file JS file for the header component.
 */

// Small polyfill needed for IE11
// We can remove this when we stop supporting IE11.
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

(function headerScript(Drupal) {
  Drupal.behaviors.header = {
    attach: function (context) {
      // Hide the search form label. We use .once() to avoid re-running.
      //
      // @todo: make it possible to override this without having to maintain a
      //   *copy* of this file.
      const headerSearchFormLabel = once('header-search-label', '.lgd-region--search form label', context);

      if (headerSearchFormLabel.length) {
        headerSearchFormLabel[0].classList.add('visually-hidden');
      }

      // Set up initial variables.
      //
      // We need a bunch of classes and selectors.
      const headerToggleSelector = '.lgd-header__toggle';
      const primaryToggleClass = 'lgd-header__toggle--primary';
      const toggleActiveClass = 'lgd-header__toggle--active';
      const regionActiveClass = 'lgd-header__nav--active';
      // This contains all toggles and their corresponding regions.
      const navInfo = {};
      // This is used as a check on resize to see if the window size *actually*
      // changed.
      let windowWidth = window.innerWidth;
      // All the interactivity here revolves around the toggles, so query them
      // and we can build an object full of references to them and to their
      // regions. We use .once() to avoid re-running this.
      const headerToggles = once('header-toggle', headerToggleSelector, context);

      if (!headerToggles.length) {
        return;
      }

      // Looping over the discovered menu toggles, create an object containing
      // references to the various DOM elements we need to work with.
      headerToggles.forEach(function(toggle) {
        const region = context.getElementById(toggle.getAttribute('aria-controls'));
        const nav = toggle.classList.contains(primaryToggleClass)
          ? 'primary'
          : 'secondary';
        // The resulting region.primary.firstLink isn't used, but it's less
        // difficult to add it than to add only region.secondary.firstLink.
        const firstLink = region.querySelector('.menu a');

        navInfo[nav] = { toggle, region, firstLink };
      });

      // When a menu toggle button is clicked, show/hide the menu regions.
      // Which menu region to show is decided by the "toggleThatWasClicked" parameter.
      function handleToggleClick(toggleThatWasClicked) {
        // Get the current state as a boolean.
        const currentState = toggleThatWasClicked.getAttribute('aria-expanded') === 'true';

        toggleThatWasClicked.setAttribute('aria-expanded', !currentState);
        toggleThatWasClicked.classList.toggle(toggleActiveClass);
      }

      // General reset function to hide the menu regions and reset the toggle
      // button attributes.
      function handleReset() {
        headerToggles.forEach(function(headerToggle) {
          headerToggle.setAttribute('aria-expanded', 'false');
          headerToggle.classList.remove(toggleActiveClass);
        });

        Object.keys(navInfo).forEach(function(nav) {
          navInfo[nav].region.classList.remove(regionActiveClass);
        });
      }

      // When the primary menu toggle is clicked
      function handlePrimaryMenuToggleClick() {
        handleToggleClick(navInfo.primary.toggle);
        handleEscKeyClick(navInfo.primary.toggle);

        navInfo.primary.region.classList.toggle(regionActiveClass);
        navInfo.secondary.region.classList.toggle(regionActiveClass);
      }

      // When the secondary menu toggle is clicked
      function handleSecondaryMenuToggleClick() {
        handleToggleClick(navInfo.secondary.toggle);
        handleEscKeyClick(navInfo.secondary.toggle);

        navInfo.secondary.region.classList.toggle(regionActiveClass);
        navInfo.secondary.region.classList.contains(regionActiveClass)
          ? navInfo.secondary.firstLink.focus()
          : null;
      }

      // When on the first link in the secondary menu, if you shift+tab
      // set focus back to the services button
      function handleSecondaryMenuShiftTabClick() {
        navInfo.secondary.firstLink.addEventListener('keydown', function(e) {
          if (e.shiftKey && e.key == 'Tab') {
            e.preventDefault();
            handleReset();
            navInfo.secondary.toggle.focus();
          }
        });
      }

      // General function for when the ESC is clicked.
      function handleEscKeyClick(buttonToFocus) {
        context.addEventListener('keydown', function(e) {
          // When on any link in the secondary menu, if you hit escape
          // set focus back to:
          // 1. menu button on small screens, and
          // 2. services button on large screens
          if (e.key == 'Escape') {
            e.preventDefault();
            handleReset()
            buttonToFocus.focus();
          }
        });
      }

      // When the window is resized (or a device orientation changes),
      // set out what happens.
      // On a small screen, the primary button is shown which will show both
      // menu regions when clicked.
      // On a large screen, the secondary button is shown which will show only
      // the secondary menu region when clicked (the primary menu will always be visible).
      function handleWindowResized() {
        handleReset();

        if  (window.innerWidth < 768) {
          if (navInfo.secondary.toggle) {
            navInfo.secondary.toggle.removeEventListener('click', handleSecondaryMenuToggleClick, true);
            navInfo.secondary.toggle.removeEventListener('click', handleSecondaryMenuShiftTabClick, true);
          }
          if (navInfo.primary.toggle) {
            navInfo.primary.toggle.addEventListener('click', handlePrimaryMenuToggleClick);
          }
        } else {
          if (navInfo.primary.toggle) {
            navInfo.primary.toggle.removeEventListener('click', handlePrimaryMenuToggleClick, true);
          }
          if (navInfo.secondary.toggle) {
            navInfo.secondary.toggle.addEventListener('click', handleSecondaryMenuToggleClick);
            navInfo.secondary.toggle.addEventListener('click', handleSecondaryMenuShiftTabClick);
          }
        }
      }

      // We need this small function here to check if the window size has changed.
      // On phones, if the menu is expanded and then the user scrolls to see things
      // near the bottom of the menu, a scrollbar comes into play which technically
      // means the window size has changed.
      function handleCheckIfWindowActuallyResized() {
        if (window.innerWidth === windowWidth) {
          return
        } else {
          windowWidth = window.innerWidth;
          handleWindowResized();
        }
      }

      // Call our functions, initially and also when the window is resized.
      handleWindowResized();
      window.addEventListener('resize', Drupal.debounce(handleCheckIfWindowActuallyResized, 50, false));
    }
  };
}(Drupal));
