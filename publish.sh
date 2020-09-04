#!/bin/bash

set -e;

npm run test
npm run lint
npm run build

set +e;
git stage .
git commit -m "Build changes before package bump."
git push origin
set -e;

VER=$(npm version patch)

git push origin $VER
