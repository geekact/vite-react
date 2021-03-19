set -e

rm -rf ./build ./lib
npx tsc
mv ./build/src/ ./lib

cat >> ./lib/index.d.ts <<EOF
import './misc/module';
EOF
