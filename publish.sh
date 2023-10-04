#!/bin/bash
npm run build

if [[ `git status --porcelain` ]]
then
  echo "ERROR: Cannot publish with uncommitted changes:"
  git status --porcelain
  exit 1
fi

npm run lint
npm run test

npm run version

git push origin --follow-tags

npm publish