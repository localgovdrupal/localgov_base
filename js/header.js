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
      context = context || document;

      const headerSearchForm = context.querySelector('.lgd-region--search form');
      headerSearchForm.querySelector('label').classList.add('visually-hidden');

      let windowWidth = window.innerWidth;

      // Set variables for the regions we need to show/hide
      const regions = [];
      let primaryMenuRegion;
      let secondaryMenuRegion;
      if (context.querySelector('.lgd-header__nav--primary')) {
        primaryMenuRegion = context.querySelector('.lgd-header__nav--primary');
        regions.push(primaryMenuRegion);
      }
      if (context.querySelector('.lgd-header__nav--secondary')) {
        secondaryMenuRegion = context.querySelector('.lgd-header__nav--secondary');
        regions.push(secondaryMenuRegion);
      }

      // Set variables for menu toggles
      const headerToggles = context.querySelectorAll('.lgd-header__toggle');
      let primaryMenuToggle;
      let secondaryMenuToggle;
      if (context.querySelector('.lgd-header__toggle--primary')) {
        primaryMenuToggle = context.querySelector('.lgd-header__toggle--primary');
      }
      if (context.querySelector('.lgd-header__toggle--secondary')) {
        secondaryMenuToggle = context.querySelector('.lgd-header__toggle--secondary');
      }

      // If there are no menu toggle buttons present,
      // get out of here as soon as possible
      if (!headerToggles.length) {
        return;
      }

      headerToggles.forEach(function(headerToggle) {
        if (headerToggle.classList.contains('js-processed')) {
          return;
        } else {
          headerToggle.classList.add('js-processed');
        }
      });

      // Set variables to use later for keyboard navigation
      let secondaryMenuFirstLink;
      if (secondaryMenuRegion) {
        secondaryMenuFirstLink = secondaryMenuRegion.querySelector('.menu a');
      }

      // When a menu toggle button is clicked, show/hide the menu regions.
      // Which menu region to show is decided by the "toggleThatWasClicked" parameter.
      function handleToggleClick(toggleThatWasClicked) {
        const currentState = toggleThatWasClicked.getAttribute('aria-expanded');
        currentState === 'false' ? 
          toggleThatWasClicked.setAttribute('aria-expanded', 'true') : 
          toggleThatWasClicked.setAttribute('aria-expanded', 'false');
          
        toggleThatWasClicked.classList.contains('lgd-header__toggle--active') ? 
          toggleThatWasClicked.classList.remove('lgd-header__toggle--active') :
          toggleThatWasClicked.classList.add('lgd-header__toggle--active');
      }

      // General reset function to hide the menu regions and reset the toggle 
      // button attributes.
      function handleReset() {
        headerToggles.forEach(function(headerToggle) {
          headerToggle.setAttribute('aria-expanded', 'false');
          headerToggle.classList.remove('lgd-header__toggle--active');
        });
        regions.forEach(function(region) { 
          region.classList.remove('lgd-header__nav--active');
        });
      }

      // When the primary menu toggle is clicked
      function handlePrimaryMenuToggleClick() {
        handleToggleClick(primaryMenuToggle);
        handleEscKeyClick(primaryMenuToggle);
        regions.forEach(function(region) {
          region.classList.contains('lgd-header__nav--active') ? 
          region.classList.remove('lgd-header__nav--active') :
          region.classList.add('lgd-header__nav--active');
        });
      }

      // When the secondary menu toggle is clicked
      function handleSecondaryMenuToggleClick() {
        handleToggleClick(secondaryMenuToggle);
        handleEscKeyClick(secondaryMenuToggle);
        secondaryMenuRegion.classList.contains('lgd-header__nav--active') ? 
        secondaryMenuRegion.classList.remove('lgd-header__nav--active') :
        secondaryMenuRegion.classList.add('lgd-header__nav--active');
        secondaryMenuRegion.classList.contains('lgd-header__nav--active') ? secondaryMenuFirstLink.focus() : null;
      }

      // When on the first link in the secondary menu, if you shift+tab
      // set focus back to the services button
      function handleSecondaryMenuShiftTabClick() {
        secondaryMenuFirstLink.addEventListener('keydown', function(e) {
          if (e.shiftKey && e.key == 'Tab') { 
            e.preventDefault();
            handleReset();
            secondaryMenuToggle.focus();
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
          if (secondaryMenuToggle) {
            secondaryMenuToggle.removeEventListener('click', handleSecondaryMenuToggleClick, true);
            secondaryMenuToggle.removeEventListener('click', handleSecondaryMenuShiftTabClick, true);
          }
          if (primaryMenuToggle) {
            primaryMenuToggle.addEventListener('click', handlePrimaryMenuToggleClick);
          }
        } else {
          if (primaryMenuToggle) {
            primaryMenuToggle.removeEventListener('click', handlePrimaryMenuToggleClick, true);
          }
          if (secondaryMenuToggle) { 
            secondaryMenuToggle.addEventListener('click', handleSecondaryMenuToggleClick);
            secondaryMenuToggle.addEventListener('click', handleSecondaryMenuShiftTabClick);
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