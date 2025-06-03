/**
 * @file JS file for images.
 */

(function lgdImagesScript(Drupal) {
  Drupal.behaviors.lgdImages = {
    attach(context) {
      const images = once('allImages', 'img', context);
      if (images.length) {
        images.forEach((image) => {
          image.onerror = () => {
            image.setAttribute('data-img-loading-error', '');
          };
        });
      }
    },
  };
})(Drupal);
