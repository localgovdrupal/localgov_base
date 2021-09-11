/**
 * @file JS file for the header component.
 */

 (function headerScript(Drupal) {
  Drupal.behaviors.header = {
    attach(context) {
      context = context || document;

      // Set variables for toggles
      const headerToggles = context.querySelectorAll('.lgd-header__toggle');
      const primaryMenuToggle = context.querySelector('.lgd-header__toggle--primary');
      const secondaryMenuToggle = context.querySelector('.lgd-header__toggle--secondary');

      // Get out of here as soon as possible
      if (!headerToggles.length) {
        return;
      }

      headerToggles.forEach(headerToggle => {
        if (headerToggle.classList.contains('js-processed')) {
          return;
        } else {
          headerToggle.classList.add('js-processed');
        }
      });
      
      // Set variables for the regions we need to show/hide
      const primaryMenuRegion = context.querySelector('.lgd-header__nav--primary');
      const secondaryMenuRegion = context.querySelector('.lgd-header__nav--secondary');
      const regions = new Array(primaryMenuRegion, secondaryMenuRegion);

      // Set variables to use later for keyboard navigation
      const secondaryMenuLinks = secondaryMenuRegion.querySelectorAll('.menu a');
      const secondaryMenuFirstLink = secondaryMenuRegion.querySelector('.menu a');

      function handleToggleClick(clickedToggle) {
        const currentState = clickedToggle.getAttribute('aria-expanded');
        currentState === 'false' ? 
          clickedToggle.setAttribute('aria-expanded', 'true') : 
          clickedToggle.setAttribute('aria-expanded', 'false');
          
        clickedToggle.classList.contains('lgd-header__toggle--active') ? 
          clickedToggle.classList.remove('lgd-header__toggle--active') :
          clickedToggle.classList.add('lgd-header__toggle--active');
      }

      function handleReset() {
        headerToggles.forEach(headerToggle => {
          headerToggle.setAttribute('aria-expanded', 'false');
          headerToggle.classList.remove('lgd-header__toggle--active');
        });
        regions.forEach(region => { 
          region.classList.remove('lgd-header__nav--active');
        });
      }

      function handlePrimaryMenuToggleClick() {
        handleToggleClick(primaryMenuToggle);
        regions.forEach(region => {
          region.classList.contains('lgd-header__nav--active') ? 
          region.classList.remove('lgd-header__nav--active') :
          region.classList.add('lgd-header__nav--active');
        });
      }

      function handleSecondaryMenuToggleClick() {
        handleToggleClick(secondaryMenuToggle);
        secondaryMenuRegion.classList.contains('lgd-header__nav--active') ? 
          secondaryMenuRegion.classList.remove('lgd-header__nav--active') :
          secondaryMenuRegion.classList.add('lgd-header__nav--active');
      }

      function handleWindowResized() {
        handleReset();
        if  (window.innerWidth < 768) {
          secondaryMenuToggle.removeEventListener('click', handleSecondaryMenuToggleClick, true);
          primaryMenuToggle.addEventListener('click', handlePrimaryMenuToggleClick);
        } else {
          primaryMenuToggle.removeEventListener('click', handlePrimaryMenuToggleClick, true);
          secondaryMenuToggle.addEventListener('click', handleSecondaryMenuToggleClick);
        }
      }
    
    // Processes for keyboard navigation to exit services section.
    if (!secondaryMenuToggle.classList.contains('js-processed-lgd-header__toggle--secondary')) {
        secondaryMenuToggle.addEventListener('click', function() {
          secondaryMenuFirstLink.focus();
        });
        secondaryMenuFirstLink.addEventListener('keydown', function(e) {
          // When on the first link in the secondary menu, if you shift+tab
          // set focus back to the services button
          if (e.shiftKey && e.key == 'Tab') { 
            e.preventDefault();
            secondaryMenuToggle.focus();
            secondaryMenuToggle.click();
          }
        });
        secondaryMenuLinks.forEach(secondaryMenuLink => {
          secondaryMenuLink.addEventListener('keydown', function(e) {
            // When on any link in the secondary menu, if you hit escape
            // set focus back to the services button
            if (e.key == 'Escape') { 
              e.preventDefault();
              secondaryMenuToggle.focus();
              secondaryMenuToggle.click();
            }
          });
        })
      }
      secondaryMenuToggle.classList.add('js-processed-lgd-header__toggle--secondary');
      
      // Call our functions, initially and also when the window is resized.
      handleWindowResized();
      window.addEventListener('resize', Drupal.debounce(handleWindowResized, 50, false));
    }
  };
}(Drupal));