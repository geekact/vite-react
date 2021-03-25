set -e

rm -rf ./build ./lib
npx tsc
mv ./build/src/ ./lib

mkdir -p ./lib/misc/

cat >> ./lib/index.d.ts <<EOF
import 'vite/client';
EOF
