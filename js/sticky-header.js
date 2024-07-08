(function stickyHeaderScript(Drupal) {
  Drupal.behaviors.stickyHeader = {
    attach: function (context) {
      const headers = once('allSticyHeaders', '.lgd-header', context);

      if (!headers) {
        return;
      }

      headers.forEach(header => {


        function calculatePositions() {
          let tabsHeight = 0;
          const tabs = header.closest('body').querySelector('.lgd-region--tabs');
          if (tabs) {
            tabsHeight = tabs.offsetHeight;
          }

          let displaceOffsetTop = 0;
          const displaceOffsetTopValue = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--drupal-displace-offset-top').replace('px', ''));
          if (displaceOffsetTopValue) {
            displaceOffsetTop = displaceOffsetTopValue;
          }

          const headerHeight = header.offsetHeight;
          const headerPosition = displaceOffsetTop + tabsHeight;

          if (header.closest('body').classList.contains('sticky-header')) {
            document.documentElement.style.setProperty('--lgd-sticky-header-position', `${headerPosition}px`);
            document.documentElement.style.setProperty('--lgd-sticky-header-height', `${headerHeight}px`);
            header.style.position = 'fixed';
          }

        }

        setTimeout(() => {
          calculatePositions();
        }, 50);

      });

    }
  };
})(Drupal);