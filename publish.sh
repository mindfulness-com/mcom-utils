#!/bin/bash

set -e;

npm run test

npm run build

set +e;
git stage .
git commit -m "Build changes before package bump."
set -e;

VER=$(npm version patch)

git push origin
git tag -a $VER
git push origin $VER;
