/**
 * @file Drupal behavior for 'back to top' link.
 */

(function (Drupal) {
  Drupal.behaviors.localgovBackToTop = {
    attach(context) {
      /**
       * Callback for intersection observer.
       *
       * Sets back to top link's hidden attribute to "false" if the intersection
       * target is either:
       *
       * - intersecting the viewport, OR
       * - has been scrolled UP out of the viewport
       *
       * @param {IntersectionObserverEntry[]} entries
       *   The qualifying entries to be checked for intersection with, or
       *   past the top of the viewport. In practices, there's only one of
       *   these since we've only targeted on element.
       */
      function observerCallback(entries) {
        entries.forEach((entry) => {
          backToTop.hidden = !(
            entry.isIntersecting ||
            (!entry.isIntersecting && entry.boundingClientRect.top <= 0)
          );
        });
      }

      const [backToTop] = once("back-to-top", ".back-to-top", context);
      const [backToTopTarget] = once(
        "back-to-top-target",
        ".back-to-top-target",
        context,
      );
      const minContentViewportRatio = parseFloat(
        backToTop?.dataset?.minContentViewportRatio ?? 1.5,
        10,
      );
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      let intersectionObserver;

      if (
        !backToTop ||
        !backToTopTarget ||
        documentHeight / viewportHeight < minContentViewportRatio
      ) {
        return;
      }

      // Create an element absolutely positioned at our threshold.
      backToTopTarget.style.position = "absolute";
      backToTopTarget.style.top = `${viewportHeight * minContentViewportRatio}px`;

      // Create an IntersectionObserver.
      intersectionObserver = new IntersectionObserver(observerCallback, {
        rootMargin: "16px",
      });
      intersectionObserver.observe(backToTopTarget);
    },
  };
})(Drupal);
