(function stickyHeaderScript(Drupal) {
  Drupal.behaviors.stickyHeader = {
    attach(context) {
      const headers = once('allStickyHeaders', '.lgd-header', context);

      if (!headers) {
        return;
      }

      headers.forEach((header) => {
        function calculatePositions() {
          let tabsHeight = 0;
          const tabs = header
            .closest('body')
            .querySelector('.lgd-region--tabs');
          if (tabs) {
            tabsHeight = tabs.offsetHeight;
          }

          let displaceOffsetTop = 0;
          const displaceOffsetTopValue = parseInt(
            getComputedStyle(document.documentElement)
              .getPropertyValue('--drupal-displace-offset-top')
              .replace('px', ''),
            10,
          );
          if (displaceOffsetTopValue) {
            displaceOffsetTop = displaceOffsetTopValue;
          }

          const headerHeight = header.offsetHeight;
          const headerPosition = displaceOffsetTop + tabsHeight;

          if (header.closest('body').classList.contains('sticky-header')) {
            document.documentElement.style.setProperty(
              '--lgd-sticky-header-position',
              `${headerPosition}px`,
            );
            document.documentElement.style.setProperty(
              '--lgd-sticky-header-height',
              `${headerHeight}px`,
            );
          }

          if (
            header.closest('body').classList.contains('sticky-header--sticky')
          ) {
            header.style.position = 'fixed';
          }
        }

        // Initialize oldScroll, so we can use it in the scroll event.
        let oldScroll = window.scrollY;

        function handleScroll() {
          if (oldScroll > window.scrollY) {
            header.closest('body').classList.add('sticky-header--sticky');
          } else {
            header.closest('body').classList.remove('sticky-header--sticky');
            header.style.position = 'relative';
          }
          // Update oldScroll to the new scroll position after the comparison
          oldScroll = window.scrollY;

          calculatePositions();
        }

        if (
          header.closest('body').classList.contains('sticky-header--scroll')
        ) {
          window.addEventListener('scroll', handleScroll);
        }

        setTimeout(() => {
          calculatePositions();
        }, 50);
      });
    },
  };
})(Drupal);
