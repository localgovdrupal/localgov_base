/**
 * @file JS file for the header component.
 */

 (function headerScript(Drupal) {
  Drupal.behaviors.header = {
    attach(context) {
      context = context || document;
      const headerToggles = context.querySelectorAll('.lgd-header__toggle');
      if (!headerToggles.length) {
        return;
      }
      headerToggles.forEach(headerToggle => {
        if (!headerToggle.classList.contains('js-processed')) {
          headerToggle.addEventListener('click', function() {
            const currentState = this.getAttribute('aria-expanded');
            currentState === 'false' ? 
              this.setAttribute('aria-expanded', 'true') : 
              this.setAttribute('aria-expanded', 'false');
              this.classList.contains('lgd-header__toggle--active') ? 
              this.classList.remove('lgd-header__toggle--active') :
              this.classList.add('lgd-header__toggle--active');
            
            // The div that each toggle targets
            const target = context.querySelector('#' + this.dataset.target);
            target.classList.contains('lgd-header__nav--active') ? 
              target.classList.remove('lgd-header__nav--active') :
              target.classList.add('lgd-header__nav--active');
          })
          headerToggle.classList.add('js-processed');
        }
      });
    }
  };
}(Drupal));