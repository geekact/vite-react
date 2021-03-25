set -e

rm -rf ./build ./lib
npx tsc
mv ./build/src/ ./lib

mkdir -p ./lib/misc/
cp ./src/misc/*.d.ts ./lib/misc/

cat >> ./lib/index.d.ts <<EOF
import 'vite/client';
import './misc/module';
EOF
