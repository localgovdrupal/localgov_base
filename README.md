---
title: LocalGov Base Theme
---

# LocalGov Drupal Base Theme

Welcome to the LocalGov Drupal base theme.

This theme was developed with scalability and easy of use in mind. That means, the theme should be a very good starting point for any website using the LocalGov Drupal distribution, and it provide an easy way to be customised out of the box.

## Inline Documentation
Instead of creating documentation for the theme and storing it in a wiki or something else that is likely to not be updated, we have written details comments inline with the code. This should make it easier to know exactly what code block any specific documentation item refers to.

## Sub-theme
To create a sub-theme, you simply need to run the sub-theme creation script that is in the `/scripts` directory, like so:

```bash
  cd web/themes/contrib/localgov_base/
  bash scripts/create_subtheme.sh
```

You need to enter two items when creating a sub-theme:
1. The name of the theme, this can be anything and can include spaces, e.g. Super Council
2. The machine name for the theme, this must start with a letter and use only lowercase letters and underscores, e.g. super_council

## Custom Styles
Hopefully most of the custom styles you will need are set via CSS custom properties in the `/css/variables.css` file in your sub-theme.

This is where you set your colours, fonts, spacing, etc. Then you "apply" these variables where needed, like so:

```css
  :root {
    /* Set/Override Variables */
    --color-accent: red;
    --spacing-largest: 5rem;

    /* Apply Variables */
    --color-link: var(--color-accent);
    --breadcrumbs-background-color: var(--color-accent);
    --section-spacing-vertical-header: var(--spacing-largest);
  }
```

If you need to add any CSS overides, you can create custom CSS files for these and then a library/libraries to attach them to your components.

## Automated CSS Coding Standards
To make sure we follow Drupal's CSS coding standards (without having to think about it), there is a handy `npm` script to automatically scan and fix any CSS coding standards violations.

Simple run `npm install` to get the necessary packages, then run `npm start` to scan the files and fix any issues.
