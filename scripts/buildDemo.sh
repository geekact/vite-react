#!/usr/bin/env bash

version=$(cat ./package.json | grep '"version"' | cut -d":" -f2 | sed 's/ "\(.*\)",/\1/')

for path in $(ls examples)
do
  cd examples/$path
  yarn add vite-react@^$version --dev
  yarn build
  cd -
done
