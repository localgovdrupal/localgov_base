/**
 * @file
 * DEPRECATED
 *
 * This file is no longer used by any component in localgov_base.
 *
 * @see components/add-to-calendar/ for the in-use component and libraries.
 *
 * JS file for Add to Calendar.
 */

(function localgovAddToCalendarScript(Drupal) {
  Drupal.behaviors.localgovAddToCalendar = {
    attach(context) {
      const addToCalendarButtons = once('all-add-to-calendar-buttons', '.localgov-add-to-calendar__trigger', context);
      if (addToCalendarButtons.length) {
        addToCalendarButtons.forEach(button => {
          const calendarModal = button.nextElementSibling;
          const calendarModalClose = calendarModal.querySelector('.localgov-add-to-calendar__dialog-close-button');
          button.addEventListener('click', () => {
            calendarModal.showModal();
          });
          calendarModalClose.addEventListener('click', () => {
            calendarModal.close();
          });
        });
      }
    }
  };
}(Drupal));
