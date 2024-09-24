/**
 * @file JS file for the WYSIWYG styles components.
 */

(function wysiwygStylesScript(Drupal) {
  Drupal.behaviors.wysiwygStyles = {
    attach: function (context) {
      const wysiwygAlerts = once("allAlerts", ".alert", context);

      function alertMessage(alert, type) {
        const element = document.createElement("span");
        element.classList.add("visually-hidden");
        element.innerHTML = Drupal.t(
          `This is an "alert" component. Variant: "${type}"`
        );
        // Insert the message at the beginning of the alert.
        alert.insertBefore(element, alert.firstChild);
      }

      wysiwygAlerts.forEach((alert) => {
        if (alert.classList.contains("alert-info")) {
          alertMessage(alert, "information");
        } else if (alert.classList.contains("alert-danger")) {
          alertMessage(alert, "danger");
        } else if (alert.classList.contains("alert-success")) {
          alertMessage(alert, "success");
        } else {
          alertMessage(alert, "default");
        }
      });
    },
  };
})(Drupal);
