#!/bin/bash

set -e;

VER=$(npm version patch)
git stage .
git commit -m $VER
git push origin
git tag -a $VER
git push origin $VER;
