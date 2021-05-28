---
title: CSS
---

This directory holds all the CSS for the theme.

It is organised following Drupal standards:
 - `base` (CSS for elements) - also includes the variables.css file
 - `layout` (grid system and macro layout items)
 - `components` (CSS specific to design components) - most of our CSS is here
 - `state` and `theme` directories are not included, to simplify things.

At the top of each file is a section called `IE11 Fallbacks`. This is simply a section to set CSS for items for which we are using custom variables (such as fonts, spacing, etc). Placing those items at the top has two benefits:
 
 - When support for IE11 is dropped, we can remove these sections very easily.
 - It also means if you wish to support IE11 in a sub-theme, you can simply copy these sections and add your own overrides.