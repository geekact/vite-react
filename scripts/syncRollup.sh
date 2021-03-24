#!/usr/bin/env bash

source=$(cat node_modules/vite/package.json | grep '"rollup"' | cut -d"," -f1)
dest=$(cat ./package.json | grep '"rollup"' | cut -d"," -f1)

# sed 's/ *"rollup": "^\(.*\)",/\1/'

if [ "$source" != "$dest" ]
then
  sed -i "" "s/ *\"rollup\": \"^.*\"/$source/" ./package.json
  yarn
fi
