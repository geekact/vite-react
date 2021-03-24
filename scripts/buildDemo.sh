#!/usr/bin/env bash

for path in $(ls examples)
do
  cd examples/$path
  yarn
  yarn build
  cd -
done
