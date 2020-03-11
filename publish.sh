#!/bin/bash

set -e;

git stage .
VER=$(npm version patch)
git commit -m $VER
git tag -a $VER
git push origin $VER;
