#!/usr/bin/env bash

set -ex

echo "import 'vite';" >> dist/index.d.ts
echo "import 'vite/client';" >> dist/index.d.ts
