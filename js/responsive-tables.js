/**
 * @file JS file for the responsive tables component.
 */

(function responsiveTablesScript(Drupal, once) {
  Drupal.behaviors.responsiveTables = {
    attach(context) {
      const tables = [];
      const tablesInTextWithSummaryFields = once(
        'allResponsiveTables',
        '.field--type-text-with-summary table',
        context,
      );
      const tablesInTextLongFields = once(
        'responsiveTables',
        '.field--type-text-long table',
        context,
      );

      // Push all tables into the tables array.
      tables.push(...tablesInTextWithSummaryFields);
      tables.push(...tablesInTextLongFields);
      tables.forEach((table) => {
        // Clone the table to avoid modifying the original.
        const clonedTable = table.cloneNode(true);
        // Add a div around the cloned table.
        const wrapper = document.createElement('div');
        wrapper.classList.add('lgd-responsive-table');
        wrapper.appendChild(clonedTable);
        // Replace the original table with the wrapper.
        table.parentNode.replaceChild(wrapper, table);
      });
    },
  };
})(Drupal, once);
