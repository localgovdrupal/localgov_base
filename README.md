---
title: LocalGov Base Theme
---

# LocalGov Drupal Base Theme

Welcome to the LocalGov Drupal base theme.

We developed this theme with scalability, ease of use, and ease of customisation in mind. Making this base theme a great start point for any website using the LocalGov Drupal distribution.

## Inline Documentation
Instead of creating documentation for the theme and storing it in a wiki or something else that is likely to not be updated, we have written detailed comments inline with the code. This should make it easier to know exactly what code block any specific documentation item refers to.

The theme includes an automatically-generated list of all the CSS variables in [variables.md](./variables.md).

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
Hopefully most of the custom styles you will need are set via CSS custom properties in the `/css/base/variables.css` file in your sub-theme.

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

If you need to add any CSS overrides, you can create custom CSS files for these and then a library/libraries to attach them to your components.

## Automated CSS Coding Standards
To make sure we follow Drupal's CSS coding standards (without having to think about it), there is a handy `npm` script to automatically scan and fix any CSS coding standards violations.

Simply run `npm install` to get the necessary packages, then run one of the following commands to scan the files and fix any issues.

- "start": "npm run lint:css && npm run lint:js",
- "start:fix": "npm run lint:css:fix && npm run lint:js:fix",
- "lint:css": "stylelint \"**/*.css\"",
- "lint:css:fix": "stylelint \"**/*.css\" --fix",
- "lint:js": "eslint \"**/*.js\"",
- "lint:js:fix": "eslint \"**/*.js\" --fix",

### start
This command will run the linter on your CSS and JS files and give you are report in your terminal of any issues. found.

### start:fix
This command will do the same as `start` but will also attempt to fix any issues it finds, such as using correct quote marks, fixing indentation, etc.

It's advisable to run `start` after you run this command to see if there was anything the automated linter couldn't fix.

### lint:css
This is the same as `start` except it only checks the CSS files.

### lint:css:fix
This is the same as `start:fix` except it only affects the CSS files.

### lint:js
This is the same as `start` except it only checks the JS files.

### lint:js:fix
This is the same as `start:fix` except it only affects the JS files.

### Troubleshooting
If you get an error, such as node not being able to find prettier, you might need to install the packages from Drupal core's `package.json`. All of our linting extends Drupal core's linting to make sure we are always following Drupal's exact coding standards. To do so, simply `cd web/core` and then `npm install`.

If you still cannot run the linter, make sure you are using the correct version of Node. We have a `.nvmrc` file to help you. Run `nvm use` from your theme directory to install the correct version.

## Maintainers

This project is currently maintained by:

 - Mark Conroy https://github.com/markconroy
 - Maria Young https://github.com/msayoung
