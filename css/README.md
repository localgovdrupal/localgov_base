---
title: CSS
---

This directory holds all the CSS for the theme.

It is organised following Drupal standards:
 - `base` (CSS for elements) - also includes the variables.css file
 - `layout` (grid system and macro layout items)
 - `components` (CSS specific to design components) - most of our CSS is here
 - `state` and `theme` directories are not included, to simplify things.

Each CSS file has a corresponding `*.ie11.css` file. This is used to set CSS for IE11 for items which we are using custom variables (such as fonts, spacing, etc). Creating individual CSS files for those items has two benefits:
 
 - When support for IE11 is dropped, we can remove these very easily.
 - It also means if you wish to support IE11 in a sub-theme, you can simply copy these files and add your own overrides.