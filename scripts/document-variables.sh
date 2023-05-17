#!/usr/bin/env bash

# Vars for input and output files, and discoverable css variables in the theme.
input_dir='css/'
output_file='variables.md'

# Gets list of variables and outputs them according to command flags.
function output() {
  variables=$(grep -hoPR "\s+\K\-\-[^:]+" "$input_dir" | sort -u)

  if [[ "$output" == 'markdown' ]]; then
    # Print the first line of the file, overwriting the existing file.
    printf "# Localgov Base theme variable names\n\n(Extracted from \`%s\`)\n\n" "$input_dir" > "$output_file"

    # Print each variable to the file as part of a markdown list.
    while IFS= read -r line; do
      printf "  - \`%s\`\n" "$line" >> "$output_file"
    done <<< "$variables"
  else
    echo
    echo

    # Print each line to stdout.
    while IFS= read -r line; do
      printf "%s\n" "$line"
    done <<< "$variables"

    echo
    echo
  fi
}

# Outputs usage info when unknown command flags are provided.
function usage() {
  cat <<USAGE

  Usage: $0 [--to-markdown]

  Options:
    -m, --to-markdown:  When provided, creates/replaces variables.md with alphabetised list of variables.
USAGE
  exit 1
}

# Parse input args.
for arg in "$@"; do
  case $arg in
    --to-markdown|-m)
      output='markdown'
      shift
      ;;
    *)
      usage
      ;;
  esac
done

output
