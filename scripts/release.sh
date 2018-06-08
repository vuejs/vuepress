#!/bin/bash

echo "Select a version to release (input number)："
echo

select VERSION in patch minor major "Specific Version"
  do
    echo
    if [[ $REPLY == 4 ]]; then
      read -p "Enter a specific version: " -r VERSION
      echo
      if [[ -z $REPLY ]]; then
        VERSION=$REPLY
      fi
    fi

    read -p "Releasing @$VERSION version - are you sure? (y/n) " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
      # pre release task
      npm run lint
      npm run test

      # bump version
      npm version $VERSION
      NEW_VERSION=$(node -p "require('./package.json').version")
      echo Releasing ${NEW_VERSION} ...

      # npm release
      npm publish
      echo "✅ released to npm"

      # github release
      git add CHANGELOG.md
      git commit -m "chore: changelog"
      git push
      git push origin refs/tags/v${NEW_VERSION}
      echo "✅ released to Github"
    else
      echo Cancelled
    fi
    break
  done

