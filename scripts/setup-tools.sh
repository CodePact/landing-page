#!/usr/bin/env bash

set -euo pipefail

if [[ ! -f .tool-versions ]]; then
  echo ".tool-versions não encontrado."
  exit 1
fi

while read -r plugin _; do
  [[ -z "$plugin" ]] && continue
  [[ "$plugin" == \#* ]] && continue

  if ! asdf plugin list | grep -qx "$plugin"; then
    echo "Adicionando plugin: $plugin"
    asdf plugin add "$plugin"
  fi
done < .tool-versions

echo "Instalando ferramentas..."
asdf install

echo "Ferramentas instaladas:"
asdf current
