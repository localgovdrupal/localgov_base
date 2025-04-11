#!/bin/bash
# Script to easily create a localgov_base sub-theme.

echo '
+--------------------------------------------------------------------------------------+
| This scripts creates the basic foundations of a LocalGov Base sub-theme:             |
+--------------------------------------------------------------------------------------+
'

# Check we're in the right place.
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

# Get theme name.
echo 'Please enter the full name for your theme [e.g. Scarfolk Council Theme]'
read -p '> ' LGD_SUB_THEME_NAME
if [ -z "${LGD_SUB_THEME_NAME}" ]; then
  echo 'Error: Please enter a name [e.g. Scarfolk Council Theme]'
  exit
fi

# Get theme machine name.
echo 'Please enter the machine name for your theme [e.g. scarfolk_council], using lowercase letters and underscores only.'
read -p '> ' LGD_SUB_THEME
if [ -z "${LGD_SUB_THEME}" ]; then
  echo 'Error: Please enter a machine name [e.g. scarfolk_council]'
  exit
fi

# Create theme folder.
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

mkdir -p config/schema
echo "+ themes/custom/$LGD_SUB_THEME/config/install folder created"

cp ../../contrib/localgov_base/logo.svg .
echo "+ themes/custom/$LGD_SUB_THEME/logo.svg copied"

cp ../../contrib/localgov_base/scripts/subtheme-items/_subtheme.info.yml_ $LGD_SUB_THEME.info.yml
echo "+ themes/custom/$LGD_SUB_THEME/$LGD_SUB_THEME.info.yml created"

cp ../../contrib/localgov_base/scripts/subtheme-items/subtheme.libraries.yml $LGD_SUB_THEME.libraries.yml
echo "+ themes/custom/$LGD_SUB_THEME/$LGD_SUB_THEME.libraries.yml created"

cp ../../contrib/localgov_base/scripts/subtheme-items/subtheme.theme $LGD_SUB_THEME.theme
echo "+ themes/custom/$LGD_SUB_THEME/$LGD_SUB_THEME.theme created"

cp ../../contrib/localgov_base/scripts/subtheme-items/config/schema/_subtheme.schema.yml_ config/schema/$LGD_SUB_THEME.schema.yml
echo "+ themes/custom/$LGD_SUB_THEME/config/schema/$LGD_SUB_THEME.schema.yml created"

cp ../../contrib/localgov_base/scripts/subtheme-items/package.json package.json
echo "+ themes/custom/$LGD_SUB_THEME/package.json created"

cp ../../contrib/localgov_base/scripts/subtheme-items/.nvmrc .nvmrc
echo "+ themes/custom/$LGD_SUB_THEME/.nvmrc created"

cp ../../contrib/localgov_base/scripts/subtheme-items/.stylelintrc.json .stylelintrc.json
echo "+ themes/custom/$LGD_SUB_THEME/.stylelintrc.json created"

cp ../../contrib/localgov_base/scripts/subtheme-items/_.eslintrc.json_ .eslintrc.json
echo "+ themes/custom/$LGD_SUB_THEME/.eslintrc.json created"

find . -type f -exec perl -i -pe "s/LGD_SUB_THEME_NAME/$LGD_SUB_THEME_NAME/g" {} +
find . -type f -exec perl -i -pe "s/LGD_SUB_THEME/$LGD_SUB_THEME/g" {} +
echo "+ variables replaced"

cp -r ../../contrib/localgov_base/scripts/subtheme-items/.gitignore .
echo "+ .gitignore copied"

cp -r ../../contrib/localgov_base/scripts/subtheme-items/css .
echo "+ default css copied"

cp -r ../../contrib/localgov_base/scripts/subtheme-items/templates .
echo "+ templates directory copied"

mv templates/layout/_html.html.twig templates/layout/html.html.twig
echo "+ _html.html.twig file correctly renamed html.html.twig"

cp -r ../../contrib/localgov_base/scripts/subtheme-items/assets .
echo "+ added default favicons - you will probably want to create new ones for yourself."

echo ""
echo "# Your new localgov_base sub-theme has been created."
echo "# Check the themes/custom folder to access the theme files."
echo "# Install your sub-theme using drush - drush then $LGD_SUB_THEME - or from the Drupal Appearance menu"
