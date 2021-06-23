#!/bin/bash
# Script to quickly create sub-theme.

echo '
+--------------------------------------------------------------------------------------+
| This scripts creates the basic foundations of a LocalGov Base sub-theme:             |
|                                                                                      |
|  - theme/custom/your_sub_theme/                                                      |
|  - theme/custom/your_sub_theme/logo.svg                                              |
|  - theme/custom/your_sub_theme/your_sub_theme.info.yml                               |
|  - theme/custom/your_sub_theme/your_sub_theme.libraries.yml                          |
|  - theme/custom/your_sub_theme/config/                                               |
|  - theme/custom/your_sub_theme/config/install/                                       |
|  - theme/custom/your_sub_theme/config/install/your_sub_theme.settings.yml            |
|  - theme/custom/your_sub_theme/css/                                                  |
|  - theme/custom/your_sub_theme/css/variables.css                                     |
|                                                                                      |
+--------------------------------------------------------------------------------------+
'

# Check we're in the right place
foldername="$(basename $PWD)"
parentfoldername="$(basename "$(dirname $PWD)")"

if [ "${foldername}" != "localgov_base" ]; then
  echo 'Error: This command should be run from the LocalGov Base Theme root folder (themes/contrib/localgov_base).'
  exit
fi

if [ "${parentfoldername}" != "contrib" ]; then
  echo 'Error: The localgov_base theme (this folder) should be in the "contrib" folder.'
  exit
fi

# Get theme name
echo 'Please enter the full name for your theme [e.g. Scarfolk Council Theme]'
read -p '> ' LGD_SUB_THEME_NAME
if [ -z "${LGD_SUB_THEME_NAME}" ]; then
  echo 'Error: Please enter a name [e.g. Scarfolk Council Theme]'
  exit
fi

# Get theme machine name
echo 'Please enter the machine name for your theme [e.g. scarfolk_council]'
read -p '> ' LGD_SUB_THEME
if [ -z "${LGD_SUB_THEME}" ]; then
  echo 'Error: Please enter a machine name [e.g. scarfolk_council]'
  exit
fi

# Create theme folder
if [[ ! -e ../../custom ]]; then
  mkdir ../../custom
  echo '+ themes/custom/ folder created'
fi

cd ../../custom

if [[ -e $LGD_SUB_THEME ]]; then
  echo "+ themes/custom/$LGD_SUB_THEME folder already exists, exiting"
  exit
fi

mkdir $LGD_SUB_THEME
echo "+ themes/custom/$LGD_SUB_THEME folder created"

cd $LGD_SUB_THEME

cp ../../contrib/localgov_base/logo.svg .
echo "+ themes/custom/$LGD_SUB_THEME/logo.svg copied"

# theme.info.yml
cat > $LGD_SUB_THEME.info.yml << EOF
name: "$LGD_SUB_THEME_NAME"
description: "A sub-theme of localgov_base."
type: theme
core_version_requirement: ^8.8 || ^9
base theme: "localgov_base"

libraries:
  - $LGD_SUB_THEME/variables

regions:
  tabs: "Tabs"
  header: "Header"
  search: "Search"
  mobile_search: "Mobile search"
  primary_menu: "Primary menu"
  secondary_menu: "Secondary menu"
  banner: "Banner"
  breadcrumb: "Breadcrumb"
  messages: "Messages"
  content_top: "Content top"
  content: "Content"
  content_bottom: "Content bottom"
  sidebar_first: "Sidebar first"
  sidebar_second: "Sidebar second"
  footer_first: "Footer first"
  footer_second: "Footer second"
  footer_third: "Footer third"
  footer: "Footer"
  lower_footer_first: "Lower footer first"
  lower_footer_second: "Lower footer second"
  lower_footer_third: "Lower footer third"
  disabled: "Disabled"

EOF

echo "+ themes/custom/$LGD_SUB_THEME/$LGD_SUB_THEME.info.yml created"

# theme.libraries.yml
cat > $LGD_SUB_THEME.libraries.yml << EOF
variables:
  css:
    theme:
      css/variables.css: {}
EOF

echo "+ themes/custom/$LGD_SUB_THEME/$LGD_SUB_THEME.libraries.yml created"

mkdir config
mkdir config/install
echo "+ themes/custom/$LGD_SUB_THEME/config/install/ created"

# theme.settings.yml
cat > config/install/$LGD_SUB_THEME.settings.yml << EOF
localgov_base_use_css: true
localgov_base_use_js: true
EOF

echo "+ themes/custom/$LGD_SUB_THEME/config/install/$LGD_SUB_THEME.settings.yml created"

if [[ ! -e css ]]; then
  mkdir css
  echo "+ themes/custom/$LGD_SUB_THEME/css/ created"
fi

# variables.css
cat > css/variables.css << EOF
/*
  Import fonts.

  In the base theme, we have no fonts importing so that the theme is as fast
  as possible, and so we are not loading fonts that are then going to be
  overridden in a sub-theme in any case.

  Want a font? Load it here, or in the html.html.twig file (you'll have to
  copy that file to the theme) which might give you an even faster loading time.

  For example:

  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
*/

/*
  Override variables for your sub-theme. The full list of variables can be
  found in the localgov_base theme variables.css file.

  In the base theme, most item values are set as variables. These variables
  usually reference other variables. For example, we have a certain number of
  colours, font sizes, spacing units, etc. We then create specific variables
  (for example a variable for the color of a link in the header) but these
  specific variables reference our base "root" variables.

  The overrides here give an example of what you might want to change. As you
  can see, you can change as much or as little as you wish.

  Examples:
  - The base font size in the base theme is 16px (1rem). If you want
    all your fonts to be based on a different scale, set --font-size variable
    to something else.
  - The base line-height is 1.5 in the base theme. If you want that to be 1.3,
    set --line-height to 1.3. A lot of spacing between items is based on this
    rhythm (1.5rem), so changing to 1.3 will update all across the board.
  - The accent colour in our base theme is purple. If you would like it to be
    hotpink, just set --color-accent: hotpink;
*/
:root {
  --color-accent: #993913;
  --font-primary: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  --font-secondary: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
}
EOF

echo "+ themes/custom/$LGD_SUB_THEME/css/variables.css created"

echo ""
echo "# Your new localgov_base sub-theme has been created."
echo "# Check the themes/custom folder to access the theme files."
echo "# Install your sub-theme using drush or from the Drupal Appearance menu"
