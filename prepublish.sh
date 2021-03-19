set -e

rm -rf ./build ./lib
npx tsc
mv ./build/src/ ./lib
